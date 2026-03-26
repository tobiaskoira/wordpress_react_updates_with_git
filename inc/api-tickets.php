<?php

add_action('rest_api_init', function () {
    register_rest_route('mytheme/v1', '/tickets', [
        [
            'methods'  => 'GET',
            'callback' => 'mytheme_get_user_tickets',
            'permission_callback' => function () {
                return is_user_logged_in();
            },
        ],
        [
            'methods'  => 'POST',
            'callback' => 'mytheme_create_ticket',
            'permission_callback' => function () {
                return is_user_logged_in();
            },
        ],
    ]);

    register_rest_route('mytheme/v1', '/tickets/(?P<id>\d+)', [
        [
            'methods'  => 'GET',
            'callback' => 'mytheme_get_single_ticket',
            'permission_callback' => function () {
                return is_user_logged_in();
            },
        ],
    ]);

    register_rest_route('mytheme/v1', '/tickets/(?P<id>\d+)/messages', [
        [
            'methods'  => 'GET',
            'callback' => 'mytheme_get_ticket_messages',
            'permission_callback' => function () {
                return is_user_logged_in();
            },
        ],
        [
            'methods'  => 'POST',
            'callback' => 'mytheme_add_ticket_message',
            'permission_callback' => function () {
                return is_user_logged_in();
            },
        ],
    ]);
});

function mytheme_user_can_access_ticket($ticket_id) {
    $ticket = get_post($ticket_id);

    if (!$ticket || $ticket->post_type !== 'support_ticket') {
        return false;
    }

    $current_user_id = get_current_user_id();

    if ((int) $ticket->post_author === (int) $current_user_id) {
        return true;
    }

    if (current_user_can('edit_others_posts')) {
        return true;
    }

    return false;
}

function mytheme_get_user_tickets() {
    $current_user_id = get_current_user_id();

    $query = new WP_Query([
        'post_type'      => 'support_ticket',
        'post_status'    => 'publish',
        'author'         => $current_user_id,
        'posts_per_page' => 100,
        'orderby'        => 'date',
        'order'          => 'DESC',
    ]);

    $tickets = [];

    foreach ($query->posts as $ticket) {
        $tickets[] = [
            'id'      => $ticket->ID,
            'title'   => $ticket->post_title,
            'content' => $ticket->post_content,
            'status'  => get_post_meta($ticket->ID, '_ticket_status', true) ?: 'new',
            'date'    => get_the_date('c', $ticket->ID),
        ];
    }

    return rest_ensure_response($tickets);
}

function mytheme_create_ticket(WP_REST_Request $request) {
    $title   = sanitize_text_field($request->get_param('title'));
    $content = wp_kses_post($request->get_param('content'));

    if (!$title || !$content) {
        return new WP_REST_Response([
            'message' => 'Title and content are required.',
        ], 400);
    }

    $ticket_id = wp_insert_post([
        'post_type'    => 'support_ticket',
        'post_status'  => 'publish',
        'post_title'   => $title,
        'post_content' => $content,
        'post_author'  => get_current_user_id(),
    ]);

    if (is_wp_error($ticket_id)) {
        return new WP_REST_Response([
            'message' => 'Failed to create ticket.',
        ], 500);
    }

    update_post_meta($ticket_id, 'ticket_status', 'new');

    return rest_ensure_response([
        'id'      => $ticket_id,
        'title'   => get_the_title($ticket_id),
        'content' => get_post_field('post_content', $ticket_id),
        'status'  => 'new',
    ]);
}

function mytheme_get_single_ticket(WP_REST_Request $request) {
    $ticket_id = (int) $request['id'];

    if (!mytheme_user_can_access_ticket($ticket_id)) {
        return new WP_REST_Response([
            'message' => 'Access denied.',
        ], 403);
    }

    $ticket = get_post($ticket_id);

    return rest_ensure_response([
        'id'      => $ticket->ID,
        'title'   => $ticket->post_title,
        'content' => $ticket->post_content,
        'status'  => get_post_meta($ticket->ID, '_ticket_status', true) ?: 'new',
        'date'    => get_the_date('c', $ticket->ID),
    ]);
}

function mytheme_get_ticket_messages(WP_REST_Request $request) {
    $ticket_id = (int) $request['id'];

    if (!mytheme_user_can_access_ticket($ticket_id)) {
        return new WP_REST_Response([
            'message' => 'Access denied.',
        ], 403);
    }

    $comments = get_comments([
        'post_id' => $ticket_id,
        'status'  => 'approve',
        'orderby' => 'comment_date',
        'order'   => 'ASC',
    ]);

    $messages = [];

    foreach ($comments as $comment) {
        $messages[] = [
            'id'      => $comment->comment_ID,
            'author'  => $comment->comment_author,
            'content' => $comment->comment_content,
            'date'    => $comment->comment_date,
            'user_id' => (int) $comment->user_id,
        ];
    }

    return rest_ensure_response($messages);
}

function mytheme_add_ticket_message(WP_REST_Request $request) {
    $ticket_id = (int) $request['id'];
    $message   = wp_kses_post($request->get_param('message'));

    if (!mytheme_user_can_access_ticket($ticket_id)) {
        return new WP_REST_Response([
            'message' => 'Access denied.',
        ], 403);
    }

    if (!$message) {
        return new WP_REST_Response([
            'message' => 'Message is required.',
        ], 400);
    }

    $user = wp_get_current_user();

    $comment_id = wp_insert_comment([
        'comment_post_ID'      => $ticket_id,
        'comment_content'      => $message,
        'user_id'              => get_current_user_id(),
        'comment_author'       => $user->display_name ?: $user->user_login,
        'comment_author_email' => $user->user_email,
        'comment_approved'     => 1,
    ]);

    if (!$comment_id) {
        return new WP_REST_Response([
            'message' => 'Failed to add message.',
        ], 500);
    }

    $comment = get_comment($comment_id);

    return rest_ensure_response([
        'id'      => $comment->comment_ID,
        'author'  => $comment->comment_author,
        'content' => $comment->comment_content,
        'date'    => $comment->comment_date,
        'user_id' => (int) $comment->user_id,
    ]);
}