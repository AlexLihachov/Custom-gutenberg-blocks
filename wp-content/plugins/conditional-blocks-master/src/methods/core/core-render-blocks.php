<?php
/**
 * This file hooks into render filter to alter each Gutenberg Block before it's displayed.
 *
 * @package conditional-blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Filter block content before displaying.
 *
 * @param string $block_content the block content.
 * @param array  $block the whole Gutenberg block object including attributes.
 * @return string $block_content the new block content.
 */
function conditional_blocks_render_html( $block_content, $block ) {

	// Don't filter the admin render.
	if ( ! is_admin() ) {

		// No conditions return.
		if ( ! isset( $block['attrs']['conditionalBlocksAttributes'] ) ) {
			return $block_content;
		}

		$conditions = $block['attrs']['conditionalBlocksAttributes'];

		// Add CSS classes to block if set.
		$block_content = conditonal_blocks_render_device_visibility( $block_content, $conditions, $block );

		$render_block = apply_filters( 'conditional_blocks_render_conditions', array(), $conditions, $block );

		do_action( 'condition_blocks_after_condition_check', $render_block, $block );

		// If blocks shouldn't display due to conditions, clear the blocks content and return.
		if ( in_array( 'no', $render_block, true ) ) {
				return '';
		}
			return $block_content;

	}
}
// Don't filter the admin render.
add_filter( 'render_block', 'conditional_blocks_render_html', 200, 2 );


/**
 * Render User state visibility per block.
 *
 * @param array $render_block array containing condition name and 'yes'/'no' if blocks should be rendered.
 * @param array $conditions Block conditions array.
 * @param array $block the whole block object.
 * @return array render_block
 */
function conditonal_blocks_render_user_state( $render_block, $conditions, $block ) {

	if ( empty( $conditions['userState'] ) ) {
			// Setting not set render block.
			$render_block['userState'] = 'yes';
	} else {

		if ( $conditions['userState'] === 'logged-out' && is_user_logged_in() ) {
			$render_block['userState'] = 'no';
		}

		if ( $conditions['userState'] === 'logged-in' && ! is_user_logged_in() ) {
			$render_block['userState'] = 'no';
		}
	}

	return $render_block;
}

add_filter( 'conditional_blocks_render_conditions', 'conditonal_blocks_render_user_state', 10, 3 );


/**
 * Add device visibility per block.
 *
 * @param array $block_content the whole block object.
 * @param array $conditions block conditions array.
 * @param array $block the whole block object.
 * @return string $block_content
 */
function conditonal_blocks_render_device_visibility( $block_content, $conditions, $block ) {

	$html_classes = '';

	if ( isset( $conditions['hideOnMobile'] ) && $conditions['hideOnMobile'] === true ) {
		$html_classes .= 'conblock-hide-mobile ';
	}

	if ( isset( $conditions['hideOnTablet'] ) && $conditions['hideOnTablet'] === true ) {
		$html_classes .= 'conblock-hide-tablet ';
	}

	if ( isset( $conditions['hideOnDesktop'] ) && $conditions['hideOnDesktop'] === true ) {
		$html_classes .= 'conblock-hide-desktop ';
	}

	if ( ! empty( $html_classes ) ) {
			return $block_content = '<div class="' . $html_classes . '">' . $block_content . '</div>';
	} else {
			return $block_content;
	}

}
