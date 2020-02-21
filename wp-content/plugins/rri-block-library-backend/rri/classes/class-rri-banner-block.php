<?php
/**
 * Class to handle banner block
 *
 * @since 1.0.0
 * @package RRI
 */

if ( ! class_exists( 'Rri_Banner_Block' ) ) {
	/**
	 * Create class if not exists
	 *
	 * @since 1.0.0
	 */

	class Rri_Banner_Block {
		/**
		 * Function to handle server side rendering of the rri banner block
		 * 
		 * @since 1.0.0
		 * @static
		 * @access public
		 * @param $atts Attributes of the block as Array
		 * @param $content Contents of the banner block as String
		 * @return String Contents of the banner block as string
		 */

        public static function init() {
            add_action( 'enqueue_block_assets', __CLASS__ . '::banner_block_assets' );
        }

        public static function banner_block_assets() {
            $my_theme = wp_get_theme();
            $ver      = $my_theme->get( 'Version' );

            wp_enqueue_style( 'rri-banner-block-style', RRI_URL . 'css/rri-banner-block.css', array(), $ver );
            wp_register_script(
                'rri-blocks-js',
                RRI_URL . 'js/rri-blocks.js',
                array('jquery', 'wp-api', 'wp-a11y', 'wp-util'),
                null,
                true
            );
            wp_enqueue_script('rri-blocks-js');

        }

		public static function render_banner_block( $atts, $content ) {
            return html_entity_decode($content);
		}
	}

    Rri_Banner_Block::init();
}
