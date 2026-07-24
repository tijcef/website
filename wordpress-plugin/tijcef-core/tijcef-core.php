<?php
/**
 * Plugin Name: TIJCEF Core
 * Description: Headless content types and protected public intake endpoints for the TIJCEF Vite website.
 * Version: 1.0.0
 * Author: Tijwun Care and Empowerment Foundation
 */

if (!defined('ABSPATH')) exit;

function tijcef_register_content_types() {
    register_post_type('tijcef_grant', [
        'labels' => ['name' => 'Grant Opportunities', 'singular_name' => 'Grant Opportunity'],
        'public' => true,
        'show_in_rest' => true,
        'menu_icon' => 'dashicons-awards',
        'supports' => ['title', 'editor', 'custom-fields', 'revisions'],
        'rewrite' => ['slug' => 'grant-opportunity'],
    ]);
    register_post_type('tgis_report', [
        'labels' => ['name' => 'TGIS Reports', 'singular_name' => 'TGIS Report'],
        'public' => true,
        'show_in_rest' => true,
        'menu_icon' => 'dashicons-location-alt',
        'supports' => ['title', 'editor', 'custom-fields', 'revisions'],
        'rewrite' => ['slug' => 'tgis-report'],
    ]);

    $grant_meta = [
        'funder' => 'string', 'sector' => 'string', 'country' => 'string',
        'deadline' => 'string', 'amount' => 'string', 'application_url' => 'string',
        'verified' => 'boolean',
    ];
    foreach ($grant_meta as $key => $type) {
        register_post_meta('tijcef_grant', $key, [
            'type' => $type, 'single' => true, 'show_in_rest' => true,
            'sanitize_callback' => $type === 'boolean' ? 'rest_sanitize_boolean' : 'sanitize_text_field',
            'auth_callback' => function () { return current_user_can('edit_posts'); },
        ]);
    }
    $report_meta = [
        'category' => 'string', 'severity' => 'string', 'state' => 'string',
        'latitude' => 'number', 'longitude' => 'number', 'organization' => 'string',
        'image_url' => 'string',
    ];
    foreach ($report_meta as $key => $type) {
        register_post_meta('tgis_report', $key, [
            'type' => $type, 'single' => true, 'show_in_rest' => true,
            'sanitize_callback' => $type === 'number' ? 'floatval' : 'sanitize_text_field',
            'auth_callback' => function () { return current_user_can('edit_posts'); },
        ]);
    }
}
add_action('init', 'tijcef_register_content_types');

function tijcef_rate_limit(WP_REST_Request $request) {
    $ip = sanitize_text_field($_SERVER['REMOTE_ADDR'] ?? 'unknown');
    $key = 'tijcef_rate_' . md5($ip);
    $count = (int) get_transient($key);
    if ($count >= 8) return new WP_Error('rate_limited', 'Too many submissions. Please try again later.', ['status' => 429]);
    set_transient($key, $count + 1, HOUR_IN_SECONDS);
    return true;
}

function tijcef_receive_report(WP_REST_Request $request) {
    $limited = tijcef_rate_limit($request);
    if (is_wp_error($limited)) return $limited;
    if ($request->get_param('website')) return new WP_Error('invalid', 'Invalid submission.', ['status' => 400]);
    $title = sanitize_text_field($request->get_param('title'));
    $description = sanitize_textarea_field($request->get_param('description'));
    $email = sanitize_email($request->get_param('email'));
    if (!$title || !$description || !is_email($email)) return new WP_Error('required', 'Please complete all required fields.', ['status' => 422]);
    $post_id = wp_insert_post([
        'post_type' => 'tgis_report', 'post_status' => 'pending',
        'post_title' => $title, 'post_content' => $description,
    ], true);
    if (is_wp_error($post_id)) return $post_id;
    foreach (['category', 'state'] as $key) update_post_meta($post_id, $key, sanitize_text_field($request->get_param($key)));
    update_post_meta($post_id, 'submitter_email', $email);
    return new WP_REST_Response(['received' => true, 'reference' => $post_id], 201);
}

add_action('rest_api_init', function () {
    register_rest_route('tijcef/v1', '/reports', [
        'methods' => 'POST',
        'callback' => 'tijcef_receive_report',
        'permission_callback' => '__return_true',
    ]);
});

add_action('rest_api_init', function () {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function ($served) {
        $origin = get_http_origin();
        $allowed = ['https://tijcef.org', 'https://www.tijcef.org'];
        if ($origin && in_array($origin, $allowed, true)) {
            header('Access-Control-Allow-Origin: ' . esc_url_raw($origin));
            header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
            header('Access-Control-Allow-Headers: Content-Type, Authorization');
            header('Vary: Origin');
        }
        return $served;
    });
}, 15);
