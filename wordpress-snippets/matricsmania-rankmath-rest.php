<?php
/**
 * Plugin Name: MatricsMania Rank Math REST API Exposer
 * Description: Exposes Rank Math SEO title, description, canonical URL, and robots directives directly in standard WordPress REST API responses for all public post types.
 * Version: 1.0.0
 * Author: MatricsMania Engineering
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('rest_api_init', function () {
    $post_types = get_post_types(['public' => true], 'names');

    foreach ($post_types as $post_type) {
        register_rest_field($post_type, 'rank_math_seo', [
            'get_callback' => function ($post_arr) {
                $post_id = isset($post_arr['id']) ? intval($post_arr['id']) : 0;
                if (!$post_id) {
                    return null;
                }

                $title = get_post_meta($post_id, 'rank_math_title', true);
                $description = get_post_meta($post_id, 'rank_math_description', true);
                $canonical = get_post_meta($post_id, 'rank_math_canonical_url', true);
                $robots = get_post_meta($post_id, 'rank_math_robots', true);

                if (function_exists('rank_math')) {
                    if (empty($title) && class_exists('\RankMath\Paper\Paper')) {
                        $title = \RankMath\Paper\Paper::get()->get_title();
                    }
                    if (empty($description) && class_exists('\RankMath\Paper\Paper')) {
                        $description = \RankMath\Paper\Paper::get()->get_description();
                    }
                }

                return [
                    'title'       => $title ? html_entity_decode(wp_strip_all_tags($title), ENT_QUOTES, 'UTF-8') : null,
                    'description' => $description ? html_entity_decode(wp_strip_all_tags($description), ENT_QUOTES, 'UTF-8') : null,
                    'canonical'   => $canonical ?: null,
                    'robots'      => $robots ?: null,
                ];
            },
            'schema' => null,
        ]);
    }
});
