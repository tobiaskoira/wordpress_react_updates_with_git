<?php
function mytheme_register_support_ticket_cpt() {

    $labels = [
        'name'               => 'Tickets',
        'singular_name'      => 'Ticket',
        'menu_name'          => 'Tickets',
        'add_new'            => 'Add Ticket',
        'add_new_item'       => 'Add New Ticket',
        'edit_item'          => 'Edit Ticket',
        'new_item'           => 'New Ticket',
        'view_item'          => 'View Ticket',
        'search_items'       => 'Search Tickets',
        'not_found'          => 'No tickets found',
        'not_found_in_trash' => 'No tickets found in Trash',
    ];

    register_post_type('support_ticket', [

        'labels' => $labels,

        // no public URLs, only admin interface
        'public' => false,

        // admin interface is available
        'show_ui' => true,

        // rest API is not needed
        'show_in_rest' => false,

        // not publicly queryable
        'publicly_queryable' => false,

        // no archive page
        'exclude_from_search' => true,

        // supports title, editor, author, comments
        'supports' => [
            'title',
            'editor',
            'author',
            'comments'
        ],

        // ikonka v admin paneli
        'menu_icon' => 'dashicons-tickets-alt',

        // no archive page
        'has_archive' => false,

    ]);
}

add_action('init', 'mytheme_register_support_ticket_cpt');
?>