<?php
/**
 * Class to handle header block
 *
 * @since 1.0.0
 * @package RRI
 */

if ( ! class_exists( 'Rri_Header_Block' ) ) {
	/**
	 * Create class if not exists
	 *
	 * @since 1.0.0
	 */

	class Rri_Header_Block {
		/**
		 * Function to handle server side rendering of the rri header block
		 * 
		 * @since 1.0.0
		 * @static
		 * @access public
		 * @param $atts Attributes of the block as Array
		 * @param $content Contents of the header block as String
		 * @return String Contents of the header block as string
		 */

        public static function init() {
            add_action( 'enqueue_block_assets', __CLASS__ . '::header_block_assets' );
        }

        public static function header_block_assets() {
            $my_theme = wp_get_theme();
            $ver      = $my_theme->get( 'Version' );

            wp_enqueue_style( 'rri-header-block-style', RRI_URL . 'css/rri-header-block.css', array(), $ver );
            wp_register_script(
                'rri-blocks-js',
                RRI_URL . 'js/rri-blocks.js',
                array('jquery', 'wp-api', 'wp-a11y', 'wp-util'),
                null,
                true
            );

        }

		public static function render_header_block( $atts, $content ) {
            return html_entity_decode($content);
		}
	}

    Rri_Header_Block::init();
}
