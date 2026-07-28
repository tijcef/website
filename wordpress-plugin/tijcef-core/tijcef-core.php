<?php
/**
 * Plugin Name: TIJCEF Core
 * Description: Headless content, navigation, Grant Hub and public form services for tijcef.org.
 * Version: 2.2.0
 * Author: Tijwun Care and Empowerment Foundation
 */

if (!defined('ABSPATH')) {
    exit;
}

final class TIJCEF_Core {
    const REST_NAMESPACE = 'tijcef/v1';
    const PRIMARY_MENU = 'TIJCEF Primary';

    private static $grant_fields = array(
        'funder' => 'text',
        'sector' => 'text',
        'country' => 'text',
        'deadline' => 'text',
        'amount' => 'text',
        'application_url' => 'url',
        'verified' => 'boolean',
        'opportunity_type' => 'text',
    );

    public static function init() {
        add_action('init', array(__CLASS__, 'register_content_types'));
        add_action('admin_init', array(__CLASS__, 'maybe_upgrade_structure'));
        add_action('add_meta_boxes', array(__CLASS__, 'add_grant_meta_box'));
        add_action('save_post_tijcef_grant', array(__CLASS__, 'save_grant_meta'));
        add_action('rest_api_init', array(__CLASS__, 'register_routes'));
        add_filter('rest_pre_serve_request', array(__CLASS__, 'cors_headers'), 10, 4);
        add_filter('wp_robots', array(__CLASS__, 'backend_noindex'));
    }

    public static function activate() {
        self::register_content_types();
        self::create_default_categories_and_menu();
        flush_rewrite_rules();
    }

    public static function deactivate() {
        flush_rewrite_rules();
    }

    public static function maybe_upgrade_structure() {
        if (get_option('tijcef_core_version') === '2.2.0') {
            return;
        }

        $renames = array(
            'health-wellbeing' => 'Dignity',
            'gender-equality-menstrual-dignity' => 'Agency',
            'climate-action-sustainability' => 'Resilience',
            'research-monitoring-evaluation' => 'Evidence',
        );
        foreach ($renames as $old_slug => $new_name) {
            $term = get_term_by('slug', $old_slug, 'category');
            if ($term) {
                $new_term = term_exists($new_name, 'category');
                if ($new_term && (int) (is_array($new_term) ? $new_term['term_id'] : $new_term) !== (int) $term->term_id) {
                    $new_term_id = (int) (is_array($new_term) ? $new_term['term_id'] : $new_term);
                    $post_ids = get_objects_in_term($term->term_id, 'category');
                    foreach ((array) $post_ids as $post_id) {
                        wp_set_post_categories((int) $post_id, array($new_term_id), true);
                    }
                    wp_delete_term($term->term_id, 'category');
                } else {
                    wp_update_term($term->term_id, 'category', array(
                        'name' => $new_name,
                        'slug' => sanitize_title($new_name),
                    ));
                }
            } elseif (!term_exists($new_name, 'category')) {
                wp_insert_term($new_name, 'category');
            }
        }

        self::create_default_categories_and_menu(true);
        update_option('tijcef_core_version', '2.2.0');
    }

    public static function register_content_types() {
        register_post_type('tijcef_grant', array(
            'labels' => array(
                'name' => 'Grant Hub',
                'singular_name' => 'Opportunity',
                'add_new_item' => 'Add Opportunity',
                'edit_item' => 'Edit Opportunity',
            ),
            'public' => true,
            'show_in_rest' => true,
            'menu_icon' => 'dashicons-awards',
            'has_archive' => false,
            'rewrite' => false,
            'supports' => array('title', 'editor', 'excerpt', 'thumbnail', 'revisions', 'custom-fields'),
        ));

        register_post_type('tijcef_submission', array(
            'labels' => array(
                'name' => 'TIJCEF Submissions',
                'singular_name' => 'Submission',
            ),
            'public' => false,
            'show_ui' => true,
            'show_in_menu' => true,
            'menu_icon' => 'dashicons-email-alt',
            'supports' => array('title', 'editor', 'custom-fields'),
        ));

        foreach (self::$grant_fields as $key => $kind) {
            register_post_meta('tijcef_grant', $key, array(
                'single' => true,
                'show_in_rest' => true,
                'type' => $kind === 'boolean' ? 'boolean' : 'string',
                'sanitize_callback' => function($value) use ($kind) {
                    if ($kind === 'boolean') {
                        return (bool) $value;
                    }
                    if ($kind === 'url') {
                        return esc_url_raw($value);
                    }
                    return sanitize_text_field($value);
                },
                'auth_callback' => function() {
                    return current_user_can('edit_posts');
                },
            ));
        }
    }

    public static function add_grant_meta_box() {
        add_meta_box(
            'tijcef-grant-details',
            'Opportunity Details',
            array(__CLASS__, 'render_grant_meta_box'),
            'tijcef_grant',
            'normal',
            'high'
        );
    }

    public static function render_grant_meta_box($post) {
        wp_nonce_field('tijcef_save_grant', 'tijcef_grant_nonce');
        $types = array(
            'grant' => 'Grant',
            'scholarship' => 'Scholarship',
            'fellowship' => 'Fellowship',
            'job' => 'Job',
            'internship' => 'Internship',
        );
        $current_type = get_post_meta($post->ID, 'opportunity_type', true) ?: 'grant';
        ?>
        <style>.tijcef-field{margin:0 0 14px}.tijcef-field label{display:block;font-weight:600;margin-bottom:5px}.tijcef-field input,.tijcef-field select{width:100%;max-width:760px}</style>
        <div class="tijcef-field">
            <label for="tijcef_opportunity_type">Opportunity type</label>
            <select id="tijcef_opportunity_type" name="tijcef_opportunity_type">
                <?php foreach ($types as $value => $label) : ?>
                    <option value="<?php echo esc_attr($value); ?>" <?php selected($current_type, $value); ?>><?php echo esc_html($label); ?></option>
                <?php endforeach; ?>
            </select>
        </div>
        <?php
        $labels = array(
            'funder' => 'Funder / organisation',
            'sector' => 'Sector',
            'country' => 'Country / eligibility geography',
            'deadline' => 'Deadline',
            'amount' => 'Funding / benefit',
            'application_url' => 'Official application URL',
        );
        foreach ($labels as $key => $label) :
            $value = get_post_meta($post->ID, $key, true);
            $type = $key === 'application_url' ? 'url' : 'text';
            ?>
            <div class="tijcef-field">
                <label for="tijcef_<?php echo esc_attr($key); ?>"><?php echo esc_html($label); ?></label>
                <input type="<?php echo esc_attr($type); ?>" id="tijcef_<?php echo esc_attr($key); ?>" name="tijcef_<?php echo esc_attr($key); ?>" value="<?php echo esc_attr($value); ?>">
            </div>
        <?php endforeach; ?>
        <label><input type="checkbox" name="tijcef_verified" value="1" <?php checked((bool) get_post_meta($post->ID, 'verified', true)); ?>> Reviewed and verified against the official source</label>
        <?php
    }

    public static function save_grant_meta($post_id) {
        if (
            !isset($_POST['tijcef_grant_nonce']) ||
            !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['tijcef_grant_nonce'])), 'tijcef_save_grant') ||
            !current_user_can('edit_post', $post_id) ||
            (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE)
        ) {
            return;
        }

        $allowed_types = array('grant', 'scholarship', 'fellowship', 'job', 'internship');
        $opportunity_type = isset($_POST['tijcef_opportunity_type'])
            ? sanitize_key(wp_unslash($_POST['tijcef_opportunity_type']))
            : 'grant';
        update_post_meta($post_id, 'opportunity_type', in_array($opportunity_type, $allowed_types, true) ? $opportunity_type : 'grant');

        foreach (array('funder', 'sector', 'country', 'deadline', 'amount', 'application_url') as $key) {
            $value = isset($_POST['tijcef_' . $key]) ? wp_unslash($_POST['tijcef_' . $key]) : '';
            update_post_meta($post_id, $key, $key === 'application_url' ? esc_url_raw($value) : sanitize_text_field($value));
        }
        update_post_meta($post_id, 'verified', isset($_POST['tijcef_verified']));
    }

    public static function register_routes() {
        register_rest_route(self::REST_NAMESPACE, '/navigation', array(
            'methods' => WP_REST_Server::READABLE,
            'callback' => array(__CLASS__, 'navigation'),
            'permission_callback' => '__return_true',
        ));
        register_rest_route(self::REST_NAMESPACE, '/newsletter', array(
            'methods' => WP_REST_Server::CREATABLE,
            'callback' => array(__CLASS__, 'newsletter'),
            'permission_callback' => '__return_true',
        ));
        register_rest_route(self::REST_NAMESPACE, '/inquiries', array(
            'methods' => WP_REST_Server::CREATABLE,
            'callback' => array(__CLASS__, 'inquiry'),
            'permission_callback' => '__return_true',
        ));
        register_rest_route(self::REST_NAMESPACE, '/payments/verify', array(
            'methods' => WP_REST_Server::CREATABLE,
            'callback' => array(__CLASS__, 'verify_payment'),
            'permission_callback' => '__return_true',
        ));
    }

    public static function navigation() {
        $menu = wp_get_nav_menu_object(self::PRIMARY_MENU);
        if (!$menu) {
            return new WP_Error(
                'tijcef_navigation_missing',
                'Create and publish a WordPress menu named TIJCEF Primary.',
                array('status' => 404)
            );
        }
        $items = wp_get_nav_menu_items($menu->term_id, array('update_post_term_cache' => false));
        if (!$items) {
            return rest_ensure_response(array('items' => array()));
        }

        $nodes = array();
        foreach ($items as $item) {
            $label = strtolower(trim(wp_strip_all_tags($item->title)));
            $path = (string) wp_parse_url($item->url, PHP_URL_PATH);
            if (
                in_array($label, array('tgis', 'tijcef journal'), true) ||
                preg_match('#(^|/)(tgis|journal)(/|$)#i', $path)
            ) {
                continue;
            }
            $nodes[(int) $item->ID] = array(
                'id' => (int) $item->ID,
                'label' => html_entity_decode(wp_strip_all_tags($item->title), ENT_QUOTES, 'UTF-8'),
                'url' => esc_url_raw($item->url),
                'children' => array(),
                '_parent' => (int) $item->menu_item_parent,
            );
        }

        $tree = array();
        foreach (array_keys($nodes) as $id) {
            $parent = $nodes[$id]['_parent'];
            unset($nodes[$id]['_parent']);
            if ($parent && isset($nodes[$parent])) {
                $nodes[$parent]['children'][] = &$nodes[$id];
            } else {
                $tree[] = &$nodes[$id];
            }
        }
        return rest_ensure_response(array('items' => array_values($tree)));
    }

    public static function newsletter(WP_REST_Request $request) {
        if (!self::rate_limit('newsletter', 8, HOUR_IN_SECONDS)) {
            return new WP_Error('tijcef_rate_limit', 'Please wait before trying again.', array('status' => 429));
        }
        if ($request->get_param('website')) {
            return rest_ensure_response(array('success' => true));
        }
        $email = sanitize_email((string) $request->get_param('email'));
        if (!is_email($email)) {
            return new WP_Error('tijcef_invalid_email', 'Please enter a valid email address.', array('status' => 400));
        }
        $existing = get_posts(array(
            'post_type' => 'tijcef_submission',
            'post_status' => 'private',
            'meta_key' => 'subscriber_email',
            'meta_value' => $email,
            'fields' => 'ids',
            'posts_per_page' => 1,
        ));
        if (!$existing) {
            $post_id = wp_insert_post(array(
                'post_type' => 'tijcef_submission',
                'post_status' => 'private',
                'post_title' => 'Newsletter: ' . $email,
                'post_content' => 'Newsletter subscription received through tijcef.org.',
            ));
            if (!is_wp_error($post_id)) {
                update_post_meta($post_id, 'submission_type', 'newsletter');
                update_post_meta($post_id, 'subscriber_email', $email);
            }
        }
        return rest_ensure_response(array('success' => true));
    }

    public static function inquiry(WP_REST_Request $request) {
        if (!self::rate_limit('inquiry', 5, HOUR_IN_SECONDS)) {
            return new WP_Error('tijcef_rate_limit', 'Please wait before trying again.', array('status' => 429));
        }
        if ($request->get_param('website')) {
            return rest_ensure_response(array('success' => true));
        }
        $payload = $request->get_json_params();
        if (!is_array($payload)) {
            $payload = $request->get_params();
        }
        $email = sanitize_email(isset($payload['email']) ? $payload['email'] : '');
        if ($email && !is_email($email)) {
            return new WP_Error('tijcef_invalid_email', 'Please enter a valid email address.', array('status' => 400));
        }
        $kind = sanitize_key(isset($payload['kind']) ? $payload['kind'] : 'contact');
        $name = sanitize_text_field(isset($payload['name']) ? $payload['name'] : 'Website visitor');
        $clean = array();
        foreach ($payload as $key => $value) {
            if ($key === 'website') {
                continue;
            }
            $clean[sanitize_key($key)] = is_scalar($value) ? sanitize_textarea_field((string) $value) : '';
        }
        $post_id = wp_insert_post(array(
            'post_type' => 'tijcef_submission',
            'post_status' => 'private',
            'post_title' => ucfirst($kind) . ': ' . $name,
            'post_content' => wp_json_encode($clean, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES),
        ));
        if (is_wp_error($post_id)) {
            return new WP_Error('tijcef_save_failed', 'We could not save your message. Please try again.', array('status' => 500));
        }
        update_post_meta($post_id, 'submission_type', $kind);
        update_post_meta($post_id, 'contact_email', $email);
        wp_mail(get_option('admin_email'), 'New TIJCEF website submission: ' . $kind, "A new submission is available in WordPress.\n\nFrom: " . $name . "\nEmail: " . $email);
        return rest_ensure_response(array('success' => true));
    }

    public static function verify_payment(WP_REST_Request $request) {
        if (!self::rate_limit('payment', 12, HOUR_IN_SECONDS)) {
            return new WP_Error('tijcef_rate_limit', 'Please wait before trying again.', array('status' => 429));
        }
        $reference = sanitize_text_field((string) $request->get_param('reference'));
        if (!$reference || !preg_match('/^[A-Za-z0-9._-]{4,100}$/', $reference)) {
            return new WP_Error('tijcef_invalid_reference', 'Invalid payment reference.', array('status' => 400));
        }
        if (!defined('TIJCEF_PAYSTACK_SECRET_KEY') || !TIJCEF_PAYSTACK_SECRET_KEY) {
            return new WP_Error('tijcef_payment_not_configured', 'Payment verification is not configured.', array('status' => 503));
        }
        $response = wp_remote_get('https://api.paystack.co/transaction/verify/' . rawurlencode($reference), array(
            'timeout' => 20,
            'headers' => array('Authorization' => 'Bearer ' . TIJCEF_PAYSTACK_SECRET_KEY),
        ));
        if (is_wp_error($response)) {
            return new WP_Error('tijcef_payment_unavailable', 'Payment verification is temporarily unavailable.', array('status' => 502));
        }
        $body = json_decode(wp_remote_retrieve_body($response), true);
        $successful = wp_remote_retrieve_response_code($response) === 200 && !empty($body['status']) && isset($body['data']['status']) && $body['data']['status'] === 'success';
        if (!$successful) {
            return new WP_Error('tijcef_payment_unverified', 'The payment could not be verified.', array('status' => 400));
        }
        return rest_ensure_response(array(
            'success' => true,
            'reference' => $reference,
            'amount' => isset($body['data']['amount']) ? (int) $body['data']['amount'] : 0,
            'currency' => isset($body['data']['currency']) ? sanitize_text_field($body['data']['currency']) : 'NGN',
        ));
    }

    private static function rate_limit($action, $limit, $window) {
        $ip = isset($_SERVER['REMOTE_ADDR']) ? sanitize_text_field(wp_unslash($_SERVER['REMOTE_ADDR'])) : 'unknown';
        $key = 'tijcef_rl_' . md5($action . '|' . $ip);
        $count = (int) get_transient($key);
        if ($count >= $limit) {
            return false;
        }
        set_transient($key, $count + 1, $window);
        return true;
    }

    public static function cors_headers($served, $result, $request, $server) {
        $origin = isset($_SERVER['HTTP_ORIGIN']) ? esc_url_raw(wp_unslash($_SERVER['HTTP_ORIGIN'])) : '';
        $allowed = array('https://tijcef.org', 'https://www.tijcef.org', 'http://localhost:8080', 'http://localhost:5173');
        if (in_array($origin, $allowed, true)) {
            header('Access-Control-Allow-Origin: ' . $origin);
            header('Vary: Origin', false);
            header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
            header('Access-Control-Allow-Headers: Content-Type, Authorization');
        }
        return $served;
    }

    public static function backend_noindex($robots) {
        $robots['noindex'] = true;
        $robots['follow'] = true;
        return $robots;
    }

    private static function create_default_categories_and_menu($force_rebuild = false) {
        $category_names = array(
            'Dignity',
            'Agency',
            'Resilience',
            'Evidence',
            'Current Programs',
            'Completed Projects',
            'Impact Stories',
            'Reports & Publications',
            'Toolkits',
            'Gallery',
        );
        $categories = array();
        foreach ($category_names as $name) {
            $term = term_exists($name, 'category');
            if (!$term) {
                $term = wp_insert_term($name, 'category');
            }
            if (!is_wp_error($term)) {
                $categories[sanitize_title($name)] = (int) (is_array($term) ? $term['term_id'] : $term);
            }
        }

        $menu = wp_get_nav_menu_object(self::PRIMARY_MENU);
        if (!$menu) {
            $menu_id = wp_create_nav_menu(self::PRIMARY_MENU);
        } else {
            $menu_id = (int) $menu->term_id;
        }
        if (is_wp_error($menu_id)) {
            return;
        }
        $existing_items = wp_get_nav_menu_items($menu_id);
        if ($existing_items && !$force_rebuild) {
            return;
        }
        if ($force_rebuild) {
            foreach ((array) $existing_items as $existing_item) {
                wp_delete_post($existing_item->ID, true);
            }
        }

        $add_link = function($label, $url, $parent = 0) use ($menu_id) {
            return wp_update_nav_menu_item($menu_id, 0, array(
                'menu-item-title' => $label,
                'menu-item-url' => 'https://tijcef.org' . $url,
                'menu-item-status' => 'publish',
                'menu-item-parent-id' => $parent,
                'menu-item-type' => 'custom',
            ));
        };
        $add_category = function($label, $slug, $parent) use ($menu_id, $categories) {
            if (!isset($categories[$slug])) {
                return 0;
            }
            return wp_update_nav_menu_item($menu_id, 0, array(
                'menu-item-title' => $label,
                'menu-item-object-id' => $categories[$slug],
                'menu-item-object' => 'category',
                'menu-item-type' => 'taxonomy',
                'menu-item-status' => 'publish',
                'menu-item-parent-id' => $parent,
            ));
        };

        $add_link('Home', '/');
        $add_link('About', '/about');
        $pillars = $add_link('Our Pillars', '/pillars');
        $add_category('Dignity', 'dignity', $pillars);
        $add_category('Agency', 'agency', $pillars);
        $add_category('Resilience', 'resilience', $pillars);
        $add_category('Evidence', 'evidence', $pillars);

        $programs = $add_link('Programs', '/programs');
        $add_category('Current Programs', 'current-programs', $programs);
        $add_category('Completed Projects', 'completed-projects', $programs);
        $add_category('Impact Stories', 'impact-stories', $programs);

        $grants = $add_link('Grant Hub', '/grants');
        $add_link('All Opportunities', '/grants/opportunities', $grants);
        $add_link('Grants', '/grants/grants', $grants);
        $add_link('Scholarships', '/grants/scholarships', $grants);
        $add_link('Fellowships', '/grants/fellowships', $grants);
        $add_link('Jobs', '/grants/jobs', $grants);
        $add_link('Internships', '/grants/internships', $grants);

        $add_link('Get Involved', '/get-involved');
        $resources = $add_link('Resources', '/resources');
        $add_category('Reports & Publications', 'reports-publications', $resources);
        $add_category('Toolkits', 'toolkits', $resources);
        $add_category('Gallery', 'gallery', $resources);
        $add_link('Contact', '/contact');
    }
}

TIJCEF_Core::init();
register_activation_hook(__FILE__, array('TIJCEF_Core', 'activate'));
register_deactivation_hook(__FILE__, array('TIJCEF_Core', 'deactivate'));
