<?php
/**
 * Class to register blocks
 *
 * @since 1.0.0
 * @package RRI
 */

if ( ! class_exists( 'Rri_Register_Blocks' ) ) {

	/**
	 * Create class if not exists
	 *
	 * @since 1.0.0
	 */
	class Rri_Register_Blocks {
		/**
		 * Add hooks and filters
		 *
		 * @since 1.0.0
		 * @static
		 * @access public
		 */
		public static function init() {
			add_action( 'init', __CLASS__ . '::init_hook' );
			add_action( 'enqueue_block_editor_assets', __CLASS__ . '::block_editor_assets' );
			add_action( 'wp_enqueue_scripts', __CLASS__ . '::wp_enqueue_scripts' );
		}

		/**
		 * Function to handle init action
		 *
		 * @since 1.0.0
		 * @static
		 * @access public
		 */
		public static function init_hook() {

			/* Script to extend group block */
			wp_register_script( 'rri-group-block-js', RRI_URL . 'js/rri-group-block.js', array( 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-editor' ), filemtime( RRI_DIR . 'js/rri-group-block.js' ), false );

			wp_localize_script( 'rri-group-block-js', 'rri', array( 'image_url' => RRI_URL . 'images/' ) );

			register_block_type(
				RRI_TEXTDOMAIN . '/rri-group-block',
				array(
					'editor_script'   => 'rri-group-block-js',
					'render_callback' => 'Rri_Group_Block::render_group_block',
					'attributes'      => array(
						'width'                => array(
							'default' => null,
							'type'    => 'number',
						),
						'width_type'           => array(
							'default' => 'px',
							'type'    => 'string',
						),
						'height'               => array(
							'default' => null,
							'type'    => 'number',
						),
						'height_type'          => array(
							'default' => 'px',
							'type'    => 'string',
						),
						'margin_top'           => array(
							'default' => 0,
							'type'    => 'number',
						),
						'margin_right'         => array(
							'default' => 0,
							'type'    => 'number',
						),
						'margin_bottom'        => array(
							'default' => 0,
							'type'    => 'number',
						),
						'margin_left'          => array(
							'default' => 0,
							'type'    => 'number',
						),
						'padding_top'          => array(
							'default' => 0,
							'type'    => 'number',
						),
						'padding_right'        => array(
							'default' => 0,
							'type'    => 'number',
						),
						'padding_bottom'       => array(
							'default' => 0,
							'type'    => 'number',
						),
						'padding_left'         => array(
							'default' => 0,
							'type'    => 'number',
						),
						'z_index'              => array(
							'default' => null,
							'type'    => 'number',
						),
						'element_style'        => array(
							'default' => '',
							'type'    => 'string',
						),
						'background_color'     => array(
							'default' => '',
							'type'    => 'string',
						),
						'background_image'     => array(
							'default' => new stdClass(),
							'type'    => 'object',
						),
						'background_video_url' => array(
							'default' => '',
							'type'    => 'string',
						),
						'background_parallax'  => array(
							'default' => false,
							'type'    => 'boolean',
						),
					),
				)
			);

			wp_enqueue_script('jquery-ui-accordion');

			wp_register_script( 'rri-related-posts-block-js', RRI_URL . 'js/rri-related-posts-block.js', array( 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-editor', 'jquery-ui-accordion' ), filemtime( RRI_DIR . 'js/rri-related-posts-block.js' ), false );

			register_block_type(
				RRI_TEXTDOMAIN . '/rri-related-posts-block',
				array(
					'editor_script'   => 'rri-related-posts-block-js',
					'render_callback' => 'Rri_Related_Posts_Block::render_related_posts_block',
					'attributes'      => array(
						'post_types'    => array(
							'type'    => 'array',
							'default' => array(),
							'items'   => array(
								'type' => 'object',
							),
						),
						'related_posts' => array(
							'type'    => 'object',
							'default' => json_decode(''),
							'items'   => array(
								'type' => 'object',
							)
						),
						'align'         => array(
							'type'    => 'string',
							'default' => ''
						)
					)
				)
			);
		}

		/**
		 * Function to handle enqueue_block_editor_assets action
		 *
		 * @since 1.0.0
		 * @static
		 * @access public
		 */
		public static function block_editor_assets() {
			$my_theme = wp_get_theme();
			$ver      = $my_theme->get( 'Version' );

			wp_enqueue_style( 'rri-editor-style', RRI_URL . 'css/rri-editor-style.css', array(), $ver );
		}

		/**
		 * Function to handle wp_enqueue_scripts action
		 *
		 * @since 1.0.0
		 * @static
		 * @access public
		 */
		public static function wp_enqueue_scripts() {
			$my_theme = wp_get_theme();
			$ver      = $my_theme->get( 'Version' );

			wp_enqueue_style( 'rri-front-style', RRI_URL . 'css/rri-front-style.css', array(), $ver );
		}
	}


	/**
	 * Calling init function to activate hooks and filters.
	 */
	Rri_Register_Blocks::init();
}
