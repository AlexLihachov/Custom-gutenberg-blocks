<?php
/**
 * WP_Rig\WP_Rig\Editor\Component class
 *
 * @package wp_rig
 */

namespace WP_Rig\WP_Rig\Editor;

use WP_Rig\WP_Rig\Component_Interface;
use function add_action;
use function add_theme_support;

/**
 * Class for integrating with the block editor.
 *
 * @link https://wordpress.org/gutenberg/handbook/extensibility/theme-support/
 */
class Component implements Component_Interface {

	/**
	 * Gets the unique identifier for the theme component.
	 *
	 * @return string Component slug.
	 */
	public function get_slug() : string {
		return 'editor';
	}

	/**
	 * Adds the action and filter hooks to integrate with WordPress.
	 */
	public function initialize() {
		add_action( 'after_setup_theme', [ $this, 'action_add_editor_support' ] );
	}

	/**
	 * Adds support for various editor features.
	 */
	public function action_add_editor_support() {
		// Add support for editor styles.
		add_theme_support( 'editor-styles' );

		// Add support for default block styles.
		add_theme_support( 'wp-block-styles' );

		// Add support for wide-aligned images.
		add_theme_support( 'align-wide' );

		/**
		 * Add support for color palettes.
		 *
		 * To preserve color behavior across themes, use these naming conventions:
		 * - Use primary and secondary color for main variations.
		 * - Use `theme-[color-name]` naming standard for standard colors (red, blue, etc).
		 * - Use `custom-[color-name]` for non-standard colors.
		 *
		 * Add the line below to disable the custom color picker in the editor.
		 * add_theme_support( 'disable-custom-colors' );
		 */
		add_theme_support( 'disable-custom-colors' );

		add_theme_support(
			'editor-color-palette',
			[
				[
					'name'  => __( 'TR Blue', 'wp-rig' ),
					'slug'  => 'tr-blue',
					'color' => '#14AECF',
				],
				[
					'name'  => __( 'Header Gray', 'wp-rig' ),
					'slug'  => 'header-gray',
					'color' => '#201E1D',
				],
				[
					'name'  => __( 'Body Gray', 'wp-rig' ),
					'slug'  => 'body-gray',
					'color' => '#38484F',
				],
				[
					'name'  => __( 'Muted Gray', 'wp-rig' ),
					'slug'  => 'muted-gray',
					'color' => '#96A2A7',
				],
				[
					'name'  => __( 'Light Gray', 'wp-rig' ),
					'slug'  => 'light-gray',
					'color' => '#F7F8F8',
				],
				[
					'name'  => __( 'Section Gray', 'wp-rig' ),
					'slug'  => 'section-gray',
					'color' => '#E5EEF1',
				],
				[
					'name'  => __( 'TR Black', 'wp-rig' ),
					'slug'  => 'tr-black',
					'color' => '#101E1D',
				],
				[
					'name'  => __( 'White', 'wp-rig' ),
					'slug'  => 'white',
					'color' => '#FFFFFF',
				],
			]
		);

		/*
		 * Add support custom font sizes.
		 *
		 * Add the line below to disable the custom color picker in the editor.
		 * add_theme_support( 'disable-custom-font-sizes' );
		 */
		add_theme_support( 'disable-custom-font-sizes' );
		
		add_theme_support(
			'editor-font-sizes',
			[
				[
					'name'      => __( 'Small', 'wp-rig' ),
					'shortName' => __( 'S', 'wp-rig' ),
					'size'      => 16,
					'slug'      => 'small',
				],
				[
					'name'      => __( 'Medium', 'wp-rig' ),
					'shortName' => __( 'M', 'wp-rig' ),
					'size'      => 25,
					'slug'      => 'medium',
				],
				[
					'name'      => __( 'Large', 'wp-rig' ),
					'shortName' => __( 'L', 'wp-rig' ),
					'size'      => 31,
					'slug'      => 'large',
				],
				[
					'name'      => __( 'Larger', 'wp-rig' ),
					'shortName' => __( 'XL', 'wp-rig' ),
					'size'      => 39,
					'slug'      => 'larger',
				],
			]
		);
	}
}
