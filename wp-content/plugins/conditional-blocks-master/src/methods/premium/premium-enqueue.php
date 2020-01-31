<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Enqueue block JavaScript and CSS for the editor
 */
function conditional_blocks_editor_scripts_pro() {

		// Enqueue Premium JS.
		wp_enqueue_script(
			'conditional-premium-blocks-editor-js',
		    plugins_url( 'assets/js/blocks-premium.js', XPLUGIN_PREFIX_setup( 'file' ) ),
			[ 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-plugins', 'wp-components', 'wp-edit-post', 'wp-api', 'wp-editor', 'wp-hooks' ],
			XPLUGIN_PREFIX_setup( 'version' ),
			false
		);
}

add_action( 'conditional_blocks_add_editor_scripts', 'conditional_blocks_editor_scripts_pro' );

/**
 * Localize Script - this runs later when functions are available.
 */
function conditional_blocks_pro_localize_script() {
		// Prepare localized data.
		$pro_data = array(
			'isPro'     => false, // Not in use.
			'userRoles' => conblocks_get_user_roles(),
			'postMeta'  => conditional_blocks_get_post_meta(),
		);

		wp_localize_script( 'conditional-premium-blocks-editor-js', 'conblockData', $pro_data );

}
add_action( 'conditional_blocks_add_localize_script', 'conditional_blocks_pro_localize_script' );


/**
 * Dequeues the Conditional Blocks Pro script.
 */
function conditional_blocks_pro_dequeue() {
	wp_dequeue_script( 'conditional-premium-blocks-editor-js' );
}
add_action( 'conditional_blocks_dequeue_script', 'conditional_blocks_pro_dequeue' );
