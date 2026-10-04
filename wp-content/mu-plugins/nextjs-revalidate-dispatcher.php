<?php
/**
 * Plugin Name: Next.js Revalidate Webhook Dispatcher
 * Plugin URI:  https://www.matricsmania.com
 * Description: Secure, zero-dependency Must-Use (MU) plugin that dispatches cache invalidation webhooks to the production Next.js frontend (https://www.matricsmania.com/api/revalidate) on WordPress content changes (Services, Industries, Locations, Case Studies, Posts, Pages, and ACF fields).
 * Version:     1.0.1
 * Author:      Matrics Mania Engineering
 * Author URI:  https://www.matricsmania.com
 * License:     GPL-2.0+
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Class NextJS_Revalidate_Dispatcher
 *
 * Handles detection of CMS content lifecycle events and sends signed webhook
 * notifications to the Next.js headless frontend revalidation endpoint.
 */
class NextJS_Revalidate_Dispatcher {

    /**
     * Singleton instance.
     * @var NextJS_Revalidate_Dispatcher|null
     */
    private static $instance = null;

    /**
     * Allowed post types for Next.js ISR revalidation.
     * Excludes system and internal WordPress post types.
     * @var string[]
     */
    const ALLOWED_POST_TYPES = array(
        'services',
        'industries',
        'locations',
        'case_studies',
        'post',
        'page',
    );

    /**
     * Revalidation endpoint URL.
     */
    const DEFAULT_ENDPOINT = 'https://www.matricsmania.com/api/revalidate';

    /**
     * In-memory queue of pending revalidations for the current PHP lifecycle.
     * Prevents duplicate dispatches and batches execution at shutdown after ACF saves.
     * @var array<string, array>
     */
    private $queue = array();

    /**
     * Set of already dispatched payload keys in this request.
     * @var array<string, bool>
     */
    private $dispatched = array();

    /**
     * Get singleton instance.
     */
    public static function get_instance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * Constructor - registers WordPress lifecycle hooks.
     */
    private function __construct() {
        // 1. Post Status Transitions (create, update, publish, unpublish, trash, restore)
        add_action('transition_post_status', array($this, 'on_transition_post_status'), 10, 3);

        // 2. Pre-Deletion Hook (before permanent database delete to capture slug and post_type)
        add_action('before_delete_post', array($this, 'on_before_delete_post'), 10, 1);

        // 3. ACF Save Lifecycle (priority 20 runs after ACF meta fields have finished saving)
        add_action('acf/save_post', array($this, 'on_acf_save_post'), 20, 1);

        // 4. Shutdown hook: Drains the queue and dispatches webhooks after all database transactions
        add_action('shutdown', array($this, 'dispatch_queued_revalidations'), 100);
    }

    /**
     * Securely retrieves the shared revalidation secret.
     *
     * Order of precedence:
     * 1. Server Environment Variable: WORDPRESS_REVALIDATE_SECRET
     * 2. WordPress Constant: WORDPRESS_REVALIDATE_SECRET (defined in wp-config.php)
     *
     * Fails closed: Never falls back to a default value.
     * Never exposes or logs the secret.
     *
     * @return string|null Secret string or null if unconfigured.
     */
    public static function get_secret() {
        // 1. Check Server Environment Variables
        $env_secret = getenv('WORDPRESS_REVALIDATE_SECRET');
        if (is_string($env_secret) && trim($env_secret) !== '') {
            return trim($env_secret);
        }

        if (isset($_ENV['WORDPRESS_REVALIDATE_SECRET']) && is_string($_ENV['WORDPRESS_REVALIDATE_SECRET']) && trim($_ENV['WORDPRESS_REVALIDATE_SECRET']) !== '') {
            return trim($_ENV['WORDPRESS_REVALIDATE_SECRET']);
        }

        if (isset($_SERVER['WORDPRESS_REVALIDATE_SECRET']) && is_string($_SERVER['WORDPRESS_REVALIDATE_SECRET']) && trim($_SERVER['WORDPRESS_REVALIDATE_SECRET']) !== '') {
            return trim($_SERVER['WORDPRESS_REVALIDATE_SECRET']);
        }

        // 2. Check WordPress Constant
        if (defined('WORDPRESS_REVALIDATE_SECRET')) {
            $const_secret = constant('WORDPRESS_REVALIDATE_SECRET');
            if (is_string($const_secret) && trim($const_secret) !== '') {
                return trim($const_secret);
            }
        }

        // Fail-closed
        return null;
    }

    /**
     * Resolves the target revalidation endpoint.
     *
     * @return string Target endpoint URL.
     */
    public static function get_endpoint() {
        $endpoint = self::DEFAULT_ENDPOINT;

        if (defined('NEXTJS_REVALIDATE_URL') && constant('NEXTJS_REVALIDATE_URL')) {
            $endpoint = (string) constant('NEXTJS_REVALIDATE_URL');
        } elseif (getenv('NEXTJS_REVALIDATE_URL')) {
            $endpoint = (string) getenv('NEXTJS_REVALIDATE_URL');
        }

        return apply_filters('nextjs_revalidate_endpoint', $endpoint);
    }

    /**
     * Checks if a post type is an allowed CMS content type.
     *
     * @param string $post_type
     * @return bool
     */
    public static function is_allowed_post_type($post_type) {
        $allowed = apply_filters('nextjs_revalidate_allowed_post_types', self::ALLOWED_POST_TYPES);
        return in_array($post_type, $allowed, true);
    }

    /**
     * Hook: transition_post_status
     *
     * Handles:
     * - draft/private/pending/future/auto-draft -> publish (action: "update")
     * - publish -> publish (action: "update")
     * - publish -> draft/private/pending (action: "delete" - removes from public view)
     * - any status -> trash (action: "delete")
     * - trash -> publish (action: "update" - restored to public view)
     *
     * @param string   $new_status
     * @param string   $old_status
     * @param WP_Post  $post
     */
    public function on_transition_post_status($new_status, $old_status, $post) {
        if (!$post || !($post instanceof WP_Post)) {
            return;
        }

        // Discard autosaves and revisions
        if (wp_is_post_autosave($post->ID) || wp_is_post_revision($post->ID)) {
            return;
        }

        // Verify post type
        if (!self::is_allowed_post_type($post->post_type)) {
            return;
        }

        $slug = !empty($post->post_name) ? $post->post_name : sanitize_title($post->post_title);

        // Case 1: Post is newly published or updated while published
        if ($new_status === 'publish') {
            $this->queue_revalidation('update', $post->post_type, $slug, $post->ID);
            return;
        }

        // Case 2: Post moved to trash from any status
        if ($new_status === 'trash') {
            $this->queue_revalidation('delete', $post->post_type, $slug, $post->ID);
            return;
        }

        // Case 3: Previously published post unpublished (draft, private, pending, etc.)
        if ($old_status === 'publish' && $new_status !== 'publish') {
            $this->queue_revalidation('delete', $post->post_type, $slug, $post->ID);
            return;
        }

        // Other non-public transitions (e.g. draft -> draft) are ignored to prevent noise
    }

    /**
     * Hook: before_delete_post
     *
     * Captures slug and post_type BEFORE the record is permanently deleted from the DB.
     * Only dispatches if the post was published or in trash (previously published).
     *
     * @param int $post_id
     */
    public function on_before_delete_post($post_id) {
        if (!is_numeric($post_id) || intval($post_id) <= 0) {
            return;
        }

        // Discard autosaves and revisions
        if (wp_is_post_autosave($post_id) || wp_is_post_revision($post_id)) {
            return;
        }

        $post = get_post($post_id);
        if (!$post || !($post instanceof WP_Post)) {
            return;
        }

        if (!self::is_allowed_post_type($post->post_type)) {
            return;
        }

        // Discard drafts/pending/auto-drafts that were never publicly visible
        if ($post->post_status !== 'publish' && $post->post_status !== 'trash') {
            return;
        }

        $slug = !empty($post->post_name) ? $post->post_name : sanitize_title($post->post_title);

        // Queue delete invalidation immediately
        $this->queue_revalidation('delete', $post->post_type, $slug, $post_id);
    }

    /**
     * Hook: acf/save_post (priority 20)
     *
     * Ensures that when custom fields are updated via ACF, published posts
     * trigger revalidation after ACF has finished writing to postmeta.
     *
     * @param int|string $post_id
     */
    public function on_acf_save_post($post_id) {
        // In ACF, post_id can be 'options', 'user_1', 'term_2', etc.
        if (!is_numeric($post_id) || intval($post_id) <= 0) {
            return;
        }

        $post_id = intval($post_id);

        if (wp_is_post_autosave($post_id) || wp_is_post_revision($post_id)) {
            return;
        }

        $post = get_post($post_id);
        if (!$post || !($post instanceof WP_Post)) {
            return;
        }

        if (!self::is_allowed_post_type($post->post_type)) {
            return;
        }

        // Only published posts need public revalidation when ACF fields change
        if ($post->post_status !== 'publish') {
            return;
        }

        $slug = !empty($post->post_name) ? $post->post_name : sanitize_title($post->post_title);

        $this->queue_revalidation('update', $post->post_type, $slug, $post_id);
    }

    /**
     * FIX 1: Adds an invalidation task to the queue with safe entity-level deduplication.
     *
     * - Uses a deterministic composite key based on post_type:slug to prevent collisions.
     * - Enforces action precedence: 'delete' is never overwritten by 'update' within the same request.
     *
     * @param string $action    'update' | 'delete'
     * @param string $post_type
     * @param string $slug
     * @param int    $post_id
     */
    public function queue_revalidation($action, $post_type, $slug, $post_id = 0) {
        $action = strtolower(trim($action));
        $post_type = strtolower(trim($post_type));
        $slug = strtolower(trim($slug));

        // Deterministic composite key: post_type:slug when slug is known, fallback to post_{post_id}
        $key = !empty($slug) ? "{$post_type}:{$slug}" : ($post_id > 0 ? "post_{$post_id}" : "{$post_type}:" . uniqid('reval_', true));

        // Precedence Rule: If this entity is already queued for 'delete', do NOT overwrite with 'update'
        if (isset($this->queue[$key]) && $this->queue[$key]['action'] === 'delete' && $action === 'update') {
            return;
        }

        $this->queue[$key] = array(
            'action'    => $action,
            'post_type' => $post_type,
            'slug'      => $slug,
            'post_id'   => $post_id,
        );

        // If shutdown already fired or in immediate test context, dispatch now
        if (did_action('shutdown')) {
            $this->dispatch_queued_revalidations();
        }
    }

    /**
     * Drains the queue and dispatches requests to Next.js.
     * Hooked into 'shutdown' so all database updates and ACF meta saves have completed.
     * Resolves pending slugs if they were empty at initial queue time.
     */
    public function dispatch_queued_revalidations() {
        if (empty($this->queue)) {
            return;
        }

        $items = $this->queue;
        $this->queue = array(); // Clear queue to prevent re-entrancy

        foreach ($items as $item) {
            $slug = $item['slug'];

            // If slug was empty when queued (e.g. newly created post), resolve now from saved post
            if (empty($slug) && !empty($item['post_id'])) {
                $fresh_post = get_post($item['post_id']);
                if ($fresh_post && !empty($fresh_post->post_name)) {
                    $slug = $fresh_post->post_name;
                }
            }

            // Skip invalid items with no slug
            if (empty($slug)) {
                continue;
            }

            $this->send_revalidate_request($item['action'], $item['post_type'], $slug);
        }
    }

    /**
     * FIX 2: Sends the authenticated POST request to Next.js /api/revalidate.
     *
     * - Uses blocking HTTP request with a safe timeout (5 seconds) by default to guarantee
     *   the TLS handshake and HTTP POST complete before PHP shutdown terminates the process.
     * - Inspects and validates the HTTP response code (logging errors if non-200).
     *
     * @param string $action    'update' | 'delete'
     * @param string $post_type
     * @param string $slug
     * @return bool True if dispatched successfully, false otherwise.
     */
    public function send_revalidate_request($action, $post_type, $slug) {
        // 1. Request-level deduplication: Never send identical request multiple times in same request
        $dedup_key = "{$action}:{$post_type}:{$slug}";
        if (isset($this->dispatched[$dedup_key])) {
            return true;
        }

        // 2. Secret check (Fail closed)
        $secret = self::get_secret();
        if (empty($secret)) {
            error_log('[Next.js Revalidation] Dispatch aborted: WORDPRESS_REVALIDATE_SECRET is missing or not configured.');
            return false;
        }

        // 3. Prepare payload
        $payload = array(
            'action'    => $action,
            'post_type' => $post_type,
            'slug'      => $slug,
        );

        $endpoint = self::get_endpoint();

        // 4. Dispatch via WordPress HTTP API
        // FIX 2: Default to blocking=true with a 5-second timeout so the request completes
        // reliably on shutdown before PHP process termination.
        $blocking = apply_filters('nextjs_revalidate_blocking', true);

        $args = array(
            'method'      => 'POST',
            'timeout'     => 5,
            'redirection' => 2,
            'httpversion' => '1.1',
            'blocking'    => $blocking,
            'headers'     => array(
                'Authorization' => 'Bearer ' . $secret,
                'Content-Type'  => 'application/json',
                'User-Agent'    => 'WordPress-Revalidate-Dispatcher/1.0',
            ),
            'body'        => wp_json_encode($payload),
            'data_format' => 'body',
            'sslverify'   => true,
        );

        $response = wp_remote_post($endpoint, $args);

        // Mark as dispatched
        $this->dispatched[$dedup_key] = true;

        if (is_wp_error($response)) {
            error_log('[Next.js Revalidation] HTTP dispatch failed: ' . $response->get_error_message());
            return false;
        }

        if ($blocking) {
            $code = wp_remote_retrieve_response_code($response);
            if ($code >= 400) {
                error_log('[Next.js Revalidation] Revalidation endpoint returned HTTP error code: ' . $code);
                return false;
            }
        }

        return true;
    }
}

// Initialize dispatcher
NextJS_Revalidate_Dispatcher::get_instance();
