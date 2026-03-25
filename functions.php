<?php
require_once get_template_directory() . '/inc/cpt-tickets.php';
require_once get_template_directory() . '/inc/ticket-status.php';
add_action('after_setup_theme', function(){

    add_theme_support('title-tag');
    add_theme_support('editor-styles');
    register_nav_menus( [
        'primary'=> 'Primary Menu',
        'menu_id' => 'primary-menu',
    ] );
    
});

add_theme_support('post-thumbnails');

add_action('wp_enqueue_scripts', function () {
  $theme_dir = get_template_directory();
  $theme_uri = get_template_directory_uri();


  // wp_enqueue_script(
  //   'flowbite',
  //   $theme_uri . '/node_modules/flowbite/dist/flowbite.min.js',
  //   [],
  //   null,
  //   true
  // );
 wp_enqueue_script(
    'flowbite_production',
   $theme_uri . '/assets/vendor/flowbite.min.js',
    [],
   null,
   true
  );
// Vite build (React + Tailwind CSS)
  $manifest_path = $theme_dir . '/dist/.vite/manifest.json';

  if (!file_exists($manifest_path)) return;

  $manifest = json_decode(file_get_contents($manifest_path), true);
  $entry = $manifest['src/main.jsx'] ?? null;
  if (!$entry) return;

wp_enqueue_script(
  'theme-vite',
  $theme_uri . '/dist/' . $entry['file'],
  [],
  null,
  true
);

if (!empty($entry['css'])) {
  foreach ($entry['css'] as $i => $css_file) {
    wp_enqueue_style(
      'theme-vite-' . $i,
      $theme_uri . '/dist/' . $css_file,
      [],
      null
    );
  }
}
});


//rest api endpoint for user data
add_action('rest_api_init', function () { 
    register_rest_route('mytheme/v1', '/user-data', [
        'methods' => 'GET',
        'callback' => function () {
            if (!is_user_logged_in()) {
                return new WP_Error('not_logged_in', 'You must be logged in to access this endpoint.', ['status' => 401]);
            }
            $current_user = wp_get_current_user();
            return [
                'id' => $current_user->ID,
                'name' => $current_user->display_name,
                'email' => $current_user->user_email,
                'slug' => $current_user->user_nicename,
                'registered_date' => $current_user->user_registered,
                'meta' => get_user_meta($current_user->ID),
            ];
        },
    ]);
});


