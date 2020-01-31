<?php
/**
 * Enqueue files.
 *
 * @package conditional-blocks.
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue block JavaScript and CSS for the editor.
 */
function conditional_blocks_editor_scripts() {

	if ( ! is_admin() ) {
		return;
	}

	// Enqueue block editor JS.
	wp_enqueue_script(
		'conditional-blocks-editor-js',
		//	plugin_dir_url( XPLUGIN_PREFIX_setup( 'file' ) ) . 'assets/js/blocks-premium.js',
		plugins_url( 'assets/js/blocks-free.js', XPLUGIN_PREFIX_setup( 'file' ) ),
		[ 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-plugins', 'wp-components', 'wp-edit-post', 'wp-api', 'wp-editor', 'wp-hooks' ],
		XPLUGIN_PREFIX_setup( 'version' ),
		false
	);

	// Register block editor styles for backend.
	wp_enqueue_style(
		'conditional-blocks-editor-css', // Handle.
		plugins_url( 'assets/css/editor.css', XPLUGIN_PREFIX_setup( 'file' ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
		XPLUGIN_PREFIX_setup( 'version' ),
		false
	);

	do_action( 'conditional_blocks_add_editor_scripts' );
}

// Use init instead of enqueue_block_editor_assets to make sure all third-party plugins have loaded.
add_action( 'admin_init', 'conditional_blocks_editor_scripts', 1 );

/**
 * Localize Script - this runs later when functions are available.
 * dequeue_script if the page isn't gutenberg. This fixes conflicts with other plugins running react.
 */
function conditional_blocks_localize_editor() {

	$current_screen = get_current_screen();

	if ( method_exists( $current_screen, 'is_block_editor' ) && $current_screen->is_block_editor() ) {

		do_action( 'conditional_blocks_add_localize_script' );

	} else {

		wp_dequeue_script( 'conditional-blocks-editor-js' );
		do_action( 'conditional_blocks_dequeue_script' );
	}

}

add_action( 'admin_enqueue_scripts', 'conditional_blocks_localize_editor' );


/**
 * Enqueue frontend and editor JavaScript and CSS
 */
function conditional_blocks_frontend_assets() {

	if ( is_admin() ) {
		return;
	}

	// Enqueue block editor styles.
	wp_enqueue_style(
		'conditional-blocks-front-css',
		plugins_url( 'assets/css/frontend.css', XPLUGIN_PREFIX_setup( 'file' ) ),
		false,
		XPLUGIN_PREFIX_setup( 'version' ),
		false
	);

}

// Hook the enqueue functions into the frontend and editor.
add_action( 'enqueue_block_assets', 'conditional_blocks_frontend_assets' );
