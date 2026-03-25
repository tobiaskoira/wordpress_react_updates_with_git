<?php 
function mytheme_add_ticket_status_meta_box() {
    add_meta_box(
        'ticket_status_meta_box', // ID
        'Ticket Status', // Title
        'mytheme_render_ticket_status_meta_box', // Callback
        'support_ticket', // Post type
        'side', // Context
        'default' // Priority
    );
}

add_action('add_meta_boxes', 'mytheme_add_ticket_status_meta_box');    

function mytheme_render_ticket_status_meta_box($post) {
    $status = get_post_meta($post->ID, '_ticket_status', true);
    ?>
    <label for="ticket_status">Status:</label>
    <select name="ticket_status" id="ticket_status" class="widefat">
        <option value="open" <?php selected($status, 'open'); ?>>Open</option>
        <option value="in_progress" <?php selected($status, 'in_progress'); ?>>In Progress</option>
        <option value="closed" <?php selected($status, 'closed'); ?>>Closed</option>
    </select>
    <?php
}

function mytheme_save_ticket_status_meta_box($post_id) {
    if (array_key_exists('ticket_status', $_POST)) {
        update_post_meta(
            $post_id,
            '_ticket_status',
            $_POST['ticket_status']
        );
    }
}
add_action('save_post', 'mytheme_save_ticket_status_meta_box');