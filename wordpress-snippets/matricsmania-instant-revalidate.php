<?php
/**
 * Plugin Name: MatricsMania Real-Time Fast Revalidation & InfinityFree Optimizer
 * Description: Dispatches non-blocking instant webhooks to Next.js on post save/publish/trash (<1s live sync), throttles WP Heartbeat to save InfinityFree hits, and caps revisions to preserve inodes.
 * Version: 2.0.0
 * Author: MatricsMania Engineering
 * License: GPL-2.0+
 */

if (!defined('ABSPATH')) {
    exit;
}

class MatricsMania_Instant_Revalidate {

    const OPTION_FRONTEND_URL = 'matricsmania_frontend_url';
    const OPTION_SECRET_TOKEN  = 'matricsmania_revalidate_secret';
    const DEFAULT_FRONTEND_URL = 'https://matricsmania.com';

    private static $dispatched_posts = [];

    public function __construct() {
        // 1. Instant Real-Time Webhook Triggers (ACF, Gutenberg REST API, standard WP save)
        add_action('transition_post_status', [$this, 'handle_post_status_transition'], 10, 3);
        add_action('acf/save_post', [$this, 'handle_acf_save_post'], 20);
        add_action('rest_after_insert_post', [$this, 'handle_rest_after_insert_post'], 20, 2);
        add_action('wp_trash_post', [$this, 'handle_trash_post']);
        add_action('untrash_post', [$this, 'handle_untrash_post']);
        add_action('before_delete_post', [$this, 'handle_delete_post']);

        // 2. Admin Bar Quick-Sync Button
        add_action('admin_bar_menu', [$this, 'add_admin_bar_sync_button'], 100);
        add_action('admin_post_matricsmania_manual_sync', [$this, 'handle_manual_sync']);
        add_action('admin_notices', [$this, 'render_admin_notices']);

        // 3. Settings Page in WP Admin
        add_action('admin_menu', [$this, 'add_settings_page']);
        add_action('admin_init', [$this, 'register_settings']);

        // 4. InfinityFree Hit & Inode Protections
        $this->setup_infinityfree_optimizations();
    }

    /**
     * Get configured frontend URL
     */
    public static function get_frontend_url() {
        $url = get_option(self::OPTION_FRONTEND_URL, defined('MATRICSMANIA_FRONTEND_URL') ? MATRICSMANIA_FRONTEND_URL : self::DEFAULT_FRONTEND_URL);
        return untrailingslashit($url ?: self::DEFAULT_FRONTEND_URL);
    }

    /**
     * Get configured revalidation secret token
     */
    public static function get_secret_token() {
        if (defined('WORDPRESS_REVALIDATE_SECRET') && WORDPRESS_REVALIDATE_SECRET) {
            return WORDPRESS_REVALIDATE_SECRET;
        }
        return get_option(self::OPTION_SECRET_TOKEN, '');
    }

    /**
     * Dispatches non-blocking instant webhook to Next.js /api/revalidate
     */
    public function dispatch_revalidation($action, $post_type, $slug, $post_id = 0, $explicit_path = null) {
        $dedup_key = $post_type . ':' . $post_id . ':' . $action . ':' . $slug;
        if (isset(self::$dispatched_posts[$dedup_key])) {
            return true;
        }
        self::$dispatched_posts[$dedup_key] = true;

        $frontend_url = self::get_frontend_url();
        $secret = self::get_secret_token();

        if (empty($secret)) {
            error_log('[MatricsMania Revalidate] Skipped: WORDPRESS_REVALIDATE_SECRET is not configured.');
            return false;
        }

        $endpoint = $frontend_url . '/api/revalidate';

        $payload = [
            'action'    => sanitize_key($action),
            'post_type' => sanitize_key($post_type),
            'slug'      => sanitize_title($slug),
            'post_id'   => intval($post_id),
            'timestamp' => gmdate('c'),
        ];

        if ($explicit_path) {
            $payload['path'] = $explicit_path;
        }

        // Fire asynchronous non-blocking POST request to prevent any delay in WP Admin
        $args = [
            'method'      => 'POST',
            'blocking'    => false, // Non-blocking: WordPress returns instantly!
            'timeout'     => 5,
            'redirection' => 2,
            'httpversion' => '1.1',
            'headers'     => [
                'Content-Type'        => 'application/json; charset=utf-8',
                'Authorization'       => 'Bearer ' . $secret,
                'x-revalidate-secret' => $secret,
                'User-Agent'          => 'MatricsMania-WordPress-Syncer/2.0',
            ],
            'body'        => wp_json_encode($payload),
            'sslverify'   => false, // Tolerant of intermediate SSL chains on free hosting
        ];

        $response = wp_remote_post($endpoint, $args);

        if (is_wp_error($response)) {
            error_log('[MatricsMania Revalidate] Webhook error: ' . $response->get_error_message());
            return false;
        }

        return true;
    }

    /**
     * Post status transition hook (Publish, Update, Unpublish)
     */
    public function handle_post_status_transition($new_status, $old_status, $post) {
        if (!is_object($post) || wp_is_post_revision($post) || wp_is_post_autosave($post)) {
            return;
        }

        $allowed_types = ['services', 'industries', 'locations', 'case_studies', 'case-studies', 'post', 'posts', 'page', 'pages'];
        if (!in_array($post->post_type, $allowed_types, true)) {
            return;
        }

        // Only trigger on live changes or status transitions
        if ($new_status === 'publish' || $old_status === 'publish') {
            $action = ($new_status === 'publish' && $old_status !== 'publish') ? 'publish' : 'update';
            if ($new_status !== 'publish' && $old_status === 'publish') {
                $action = 'unpublish';
            }

            $this->dispatch_revalidation(
                $action,
                $post->post_type,
                $post->post_name,
                $post->ID
            );
        }
    }

    /**
     * ACF save_post hook (Fires after all custom ACF fields are written to DB)
     */
    public function handle_acf_save_post($post_id) {
        if (is_numeric($post_id)) {
            $post = get_post($post_id);
            if ($post && $post->post_status === 'publish') {
                $this->dispatch_revalidation('update', $post->post_type, $post->post_name, $post->ID);
            }
        }
    }

    /**
     * Gutenberg REST API insert post hook (Fires after REST API inserts or updates post)
     */
    public function handle_rest_after_insert_post($post, $request) {
        if ($post && is_object($post) && $post->post_status === 'publish') {
            $this->dispatch_revalidation('update', $post->post_type, $post->post_name, $post->ID);
        }
    }

    /**
     * Trash post hook
     */
    public function handle_trash_post($post_id) {
        $post = get_post($post_id);
        if ($post && !wp_is_post_revision($post)) {
            $this->dispatch_revalidation('trash', $post->post_type, $post->post_name, $post->ID);
        }
    }

    /**
     * Untrash post hook
     */
    public function handle_untrash_post($post_id) {
        $post = get_post($post_id);
        if ($post && !wp_is_post_revision($post)) {
            $this->dispatch_revalidation('untrash', $post->post_type, $post->post_name, $post->ID);
        }
    }

    /**
     * Delete post hook
     */
    public function handle_delete_post($post_id) {
        $post = get_post($post_id);
        if ($post && !wp_is_post_revision($post)) {
            $this->dispatch_revalidation('delete', $post->post_type, $post->post_name, $post->ID);
        }
    }

    /**
     * Add "⚡ Sync Website" button to the WP Admin Bar
     */
    public function add_admin_bar_sync_button($wp_admin_bar) {
        if (!current_user_can('manage_options')) {
            return;
        }

        $sync_url = wp_nonce_url(
            admin_url('admin-post.php?action=matricsmania_manual_sync'),
            'matricsmania_sync_nonce'
        );

        $wp_admin_bar->add_node([
            'id'    => 'matricsmania_sync',
            'title' => '<span style="color:#00F0FF;font-weight:600;">⚡ Sync Website</span>',
            'href'  => $sync_url,
            'meta'  => [
                'title' => 'Immediately revalidate Next.js site cache and show fresh CMS changes',
            ],
        ]);
    }

    /**
     * Handles manual sync from admin bar
     */
    public function handle_manual_sync() {
        check_admin_referer('matricsmania_sync_nonce');

        if (!current_user_can('manage_options')) {
            wp_die('Unauthorized');
        }

        $frontend_url = self::get_frontend_url();
        $secret = self::get_secret_token();

        if (empty($secret)) {
            wp_safe_redirect(add_query_arg(['matricsmania_sync_status' => 'no_secret'], wp_get_referer() ?: admin_url()));
            exit;
        }

        // Blocking request here so we can confirm status to admin
        $res = wp_remote_post($frontend_url . '/api/revalidate', [
            'timeout'     => 10,
            'redirection' => 2,
            'headers'     => [
                'Content-Type'  => 'application/json',
                'Authorization' => 'Bearer ' . $secret,
            ],
            'body'        => wp_json_encode([
                'action' => 'sync_all',
                'path'   => '*',
            ]),
            'sslverify'   => false,
        ]);

        $status = 'success';
        if (is_wp_error($res) || wp_remote_retrieve_response_code($res) !== 200) {
            $status = 'error';
        }

        wp_safe_redirect(add_query_arg(['matricsmania_sync_status' => $status], wp_get_referer() ?: admin_url()));
        exit;
    }

    /**
     * Renders admin notices on manual sync
     */
    public function render_admin_notices() {
        if (!isset($_GET['matricsmania_sync_status'])) {
            return;
        }

        $status = sanitize_key($_GET['matricsmania_sync_status']);
        if ($status === 'success') {
            echo '<div class="notice notice-success is-dismissible"><p><strong>⚡ MatricsMania Website Synced!</strong> All Next.js pages and caches were refreshed in real time.</p></div>';
        } elseif ($status === 'no_secret') {
            echo '<div class="notice notice-warning is-dismissible"><p><strong>⚠️ Sync Incomplete:</strong> Please set your Revalidation Secret under Settings &gt; MatricsMania Frontend Sync.</p></div>';
        } else {
            echo '<div class="notice notice-error is-dismissible"><p><strong>✕ Sync Failed:</strong> Could not reach Next.js revalidation endpoint. Check your Site URL and Secret.</p></div>';
        }
    }

    /**
     * Add Settings page
     */
    public function add_settings_page() {
        add_options_page(
            'MatricsMania Frontend Sync',
            'MatricsMania Sync',
            'manage_options',
            'matricsmania-sync',
            [$this, 'render_settings_page']
        );
    }

    public function register_settings() {
        register_setting('matricsmania_sync_options', self::OPTION_FRONTEND_URL, 'esc_url_raw');
        register_setting('matricsmania_sync_options', self::OPTION_SECRET_TOKEN, 'sanitize_text_field');
    }

    public function render_settings_page() {
        $url = self::get_frontend_url();
        $secret = self::get_secret_token();
        ?>
        <div class="wrap">
            <h1>⚡ MatricsMania Real-Time Frontend Sync & InfinityFree Optimizer</h1>
            <p>Connects headless WordPress to your high-performance Next.js site with <strong>&lt;1s instant revalidation</strong> while protecting your InfinityFree daily hits and inodes.</p>
            
            <form method="post" action="options.php">
                <?php settings_fields('matricsmania_sync_options'); ?>
                <table class="form-table">
                    <tr>
                        <th scope="row"><label for="<?php echo esc_attr(self::OPTION_FRONTEND_URL); ?>">Next.js Website URL</label></th>
                        <td>
                            <input name="<?php echo esc_attr(self::OPTION_FRONTEND_URL); ?>" type="url" id="<?php echo esc_attr(self::OPTION_FRONTEND_URL); ?>" value="<?php echo esc_attr($url); ?>" class="regular-text" placeholder="https://matricsmania.com" />
                            <p class="description">Your production Next.js frontend domain (e.g. <code>https://matricsmania.com</code>).</p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="<?php echo esc_attr(self::OPTION_SECRET_TOKEN); ?>">Revalidation Secret Token</label></th>
                        <td>
                            <input name="<?php echo esc_attr(self::OPTION_SECRET_TOKEN); ?>" type="password" id="<?php echo esc_attr(self::OPTION_SECRET_TOKEN); ?>" value="<?php echo esc_attr($secret); ?>" class="regular-text" />
                            <p class="description">Must match <code>WORDPRESS_REVALIDATE_SECRET</code> in your Next.js <code>.env</code> file.</p>
                        </td>
                    </tr>
                </table>
                <?php submit_button('Save Settings'); ?>
            </form>

            <hr />
            <h2>⚡ Manual Cache Purge</h2>
            <p>Need to force an immediate refresh of the whole website right now?</p>
            <a href="<?php echo esc_url(wp_nonce_url(admin_url('admin-post.php?action=matricsmania_manual_sync'), 'matricsmania_sync_nonce')); ?>" class="button button-primary">
                ⚡ Force Sync All Pages Now
            </a>

            <hr />
            <h2>🛡️ InfinityFree Credit & Inode Protections Active</h2>
            <ul style="list-style: disc; padding-left: 20px;">
                <li><strong>Heartbeat API Throttled:</strong> Reduced from 15s to 120s (saves ~3,000 to 5,000 hits/day from open admin tabs).</li>
                <li><strong>Revisions Capped:</strong> Limited to 3 revisions per post (saves MySQL storage and inodes).</li>
                <li><strong>XML-RPC Pingbacks Disabled:</strong> Stops bot attack traffic from wasting hits.</li>
                <li><strong>Non-blocking Webhooks:</strong> Webhooks trigger in the background so post editing is instant.</li>
            </ul>
        </div>
        <?php
    }

    /**
     * InfinityFree Free Hosting Protections:
     * Saves daily hits and keeps inode usage far below the 80,000 limit.
     */
    private function setup_infinityfree_optimizations() {
        // 1. Throttle WP Heartbeat API (drastically saves hits from open WP Admin browser tabs!)
        add_filter('heartbeat_settings', function ($settings) {
            $settings['interval'] = 120; // 120 seconds instead of default 15 seconds
            return $settings;
        });

        // 2. Cap Post Revisions to 3 (saves database rows and inodes)
        if (!defined('WP_POST_REVISIONS')) {
            define('WP_POST_REVISIONS', 3);
        }

        // 3. Disable XML-RPC Pingback spam (prevents brute hits on InfinityFree)
        add_filter('xmlrpc_enabled', '__return_false');
        add_filter('wp_headers', function ($headers) {
            unset($headers['X-Pingback']);
            return $headers;
        });

        // 4. Disable self-pingbacks
        add_action('pre_ping', function (&$links) {
            $home = get_option('home');
            foreach ($links as $l => $link) {
                if (0 === strpos($link, $home)) {
                    unset($links[$l]);
                }
            }
        });
    }
}

// Initialize on plugin load
new MatricsMania_Instant_Revalidate();
