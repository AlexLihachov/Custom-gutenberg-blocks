<?php
/**
 * Class to handle group block
 *
 * @since 1.0.0
 * @package RRI
 */

if ( ! class_exists( 'Rri_Group_Block' ) ) {
	/**
	 * Create class if not exists
	 *
	 * @since 1.0.0
	 */
	class Rri_Group_Block {

		/**
		 * Function to handle server side rendering of the rri group block
		 * 
		 * @since 1.0.0
		 * @static
		 * @access public
		 * @param $atts Attributes of the block as Array
		 * @param $content Contents of the group block as String
		 * @return String Contents of the group block as string
		 */
		public static function render_group_block( $atts, $content ) {
			$atts = shortcode_atts( array(
    			'width' => '',
    			'width_type' => 'px',
    			'height' => '',
    			'height_type' => 'px',
    			'padding' => '',
    			'margin_top' => '',
    			'margin_right' => '',
    			'margin_bottom' => '',
    			'margin_left' => '',
    			'padding_top' => '',
    			'padding_right' => '',
    			'padding_bottom' => '',
    			'padding_left' => '',
    			'z_index' => '',
    			'element_style' => '',
    			'align' => '',
			), $atts);

			ob_start();
			//print_r($atts);
			echo '<div class="' . ( $atts['align'] != '' ? 'align' . $atts['align'] : '' ) . '" style="' . ( $atts['element_style'] ? $atts['element_style'] : '' ) . '">' . $content . '</div>';
			return ob_get_clean();
		}
	}
}
