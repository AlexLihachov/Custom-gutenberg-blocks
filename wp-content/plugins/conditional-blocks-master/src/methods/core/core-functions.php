<?php
/**
 * Main functions.
 *
 * @package conditional-blocks.
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Get the value of a settings field.
 *
 * @param string $option settings field name.
 * @param string $section the section name this field belongs to.
 * @param string $default default text if it's not found.
 *
 * @return mixed
 */
function conblock_get_option( $option, $section = false, $default = '' ) {

	if ( $section === false ) {
		$section = 'conditional_blocks_general';
	}

	$options = get_option( $section );

	if ( isset( $options[ $option ] ) ) {
		return $options[ $option ];
	}
	return $default;
}


/**
 * Prepare debug information about the block render.
 *
 * @param array  $render_block Render the block or not.
 * @param object $block the entire block object.
 */
function conditional_blocks_debug_render( $render_block, $block ) {

	$debug = conblock_get_option( 'debug_block_render', false, false );

	// return if debugging isn't enabled.
	if ( empty( $debug ) ) {
		return;
	}

	$post_id = get_the_ID();

	$post_title = $post_id ? get_the_title( $post_id ) : 'NA';

	$debug_info = array(
		'block_displayed_on'  => $post_title,
		'block_name'          => $block['blockName'],
		'render_by_condition' => $render_block,
	);

	if ( $debug === 'detailed' ) {
		$debug_info['block_detailed'] = $block;
	}

	conblock_write_log( $debug_info );
}

add_action( 'condition_blocks_after_condition_check', 'conditional_blocks_debug_render', 10, 2 );

/**
 * Write to the debug log if WP_DEBUG debugging is enabled.
 *
 * @param mixed $log log content to write out.
 */
function conblock_write_log( $log ) {
	// No debugging today.
	if ( empty( conblock_get_option( 'debug_block_render', false, false ) ) ) {
		return;
	}
	if ( true === WP_DEBUG ) {
		if ( is_array( $log ) || is_object( $log ) ) {
				error_log( print_r( $log, true ) ); // phpcs:ignore
		} else {
				error_log( $log ); //phpcs:ignore
		}
	}
}
