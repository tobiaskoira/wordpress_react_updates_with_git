<?php

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





