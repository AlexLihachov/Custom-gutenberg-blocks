<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

defined( 'RRI_FILE' ) || define( 'RRI_FILE', __FILE__ );

/**
 * Enqueue block assets for both frontend + backend.
 *
 * @since 0.1
 */
function rri_blocks_frontend_assets() {
	wp_enqueue_style(
		'rri-blocks-front-styles',
		plugins_url( 'dist/frontend_blocks.css', dirname( __FILE__ ) )
	);
	wp_enqueue_script(
		'rri-blocks-front-js',
		plugins_url( 'dist/frontend_blocks.js', dirname( __FILE__ ) ),
		null,
		true
	);

	wp_enqueue_style(
		'slick-styles',
		plugins_url( 'src/plugins/slick/slick.css', dirname( __FILE__ ) )
	);

	wp_enqueue_style(
		'slick-theme-styles',
		plugins_url( 'src/plugins/slick/slick-theme.css', dirname( __FILE__ ) )
	);

	wp_enqueue_script(
		'slick-script',
		plugins_url( 'src/plugins/slick/slick.min.js', dirname( __FILE__ ) ),
		array( 'jquery' ),
		true
	);
}

add_action( 'enqueue_block_assets', 'rri_blocks_frontend_assets' );

/**
 * Enqueue block assets for backend editor.
 *
 * @since 0.1
 */
function rri_blocks_assets() {
	// Register block styles for Backend.
	wp_register_style(
		'rri-blocks-editor-css',
		plugins_url( 'dist/editor_blocks.css', dirname( __FILE__ ) ),
		array( 'wp-editor', 'wp-edit-blocks' ),
		null
	);

	// Register block editor script for Backend.
	wp_register_script(
		'rri-blocks-editor-js',
		plugins_url( '/dist/editor_blocks.js', dirname( __FILE__ ) ),
		array(
			'code-editor',
			'wp-blocks',
			'wp-element',
			'wp-components',
			'wp-editor',
			'wp-util',
			'wp-plugins',
			'wp-edit-post',
			'wp-i18n'
		),
		null,
		true
	);

	// WP Localized globals. Use dynamic PHP stuff in JavaScript via `rriData` object.
	wp_localize_script(
		'rri-blocks-editor-js',
		'rriData',
		[
			'pluginDirPath' => plugin_dir_path( __DIR__ ),
			'pluginDirUrl' => plugin_dir_url( __DIR__ ),
			'srcUrl' => plugins_url( '/', __DIR__ ),
			'locale' => get_locale(),
		]
	);

	/**
	 * Register Gutenberg block on server-side.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/blocks/writing-your-first-block-type#enqueuing-block-scripts
	 * @since 1.16.0
	 */
	register_block_type(
		'rri/blocks', array(
			'editor_script' => 'rri-blocks-editor-js',
			'editor_style' => 'rri-blocks-editor-css',
		)
	);
}

add_action( 'init', 'rri_blocks_assets' );
