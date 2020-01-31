<?php
/**
 * This file adds all the pro conditional checks to the block render.
 *
 * @package conditional-blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}


/**
 * Check if user user role is allowed.
 *
 * @param array $render_block array containing condition name and 'yes'/'no' if blocks should be rendered.
 * @param array $conditions Block block conditions array.
 * @param array $block the whole block object.
 * @return array render_block
 */
function conditional_blocks_render_user_roles( $render_block, $conditions, $block ) {

	// Nothing to do here - exit and show the content.
	if ( empty( $conditions['userRoles'] ) ) {
		$render_block['userRoles'] = 'yes';
	} else {
		// If User doesn't have an account.
		if ( ! is_user_logged_in() ) {
			$render_block['userRoles'] = 'no';
			return $render_block;
		}

		$user          = wp_get_current_user();
		$current_roles = (array) $user->roles;

		$showUserRole  = isset( $conditions['showUserRoles'] ) ? $conditions['showUserRoles'] : true;
		
		/*$allow_user = false;*/
		$allow_user    = $showUserRole ? false : true;

		foreach ( $conditions['userRoles'] as $conditon_role ) {
			if ( in_array( $conditon_role, $current_roles, true ) ) {
				/*$allow_user = true;*/
				$allow_user = $showUserRole ? true : false;
				break;
			}
		} // end foreach.


		// If allowed displayed the content.
		if ( true === $allow_user ) {
			$render_block['userRoles'] = 'yes';
		} else {
			$render_block['userRoles'] = 'no';
		}
	}

	return $render_block;

}

add_filter( 'conditional_blocks_render_conditions', 'conditional_blocks_render_user_roles', 10, 3 );

/**
 * Check referers
 *
 * @param array $render_block array containing condition name and 'yes'/'no' if blocks should be rendered.
 * @param array $conditions Block block conditions array.
 * @param array $block the whole block object.
 * @return array render_block
 */
function conditonal_blocks_check_referer( $render_block, $conditions, $block ) {

	$showHttpReferer = ( isset( $conditions['showDomainReferer'] ) ? $conditions['showDomainReferer'] : true );

	// Exit if no condition.
	if ( empty( $conditions['httpReferer'] ) ) {
		$render_block['httpReferer'] = 'yes';
		return $render_block;
	}

	// No referer, don't show.
	if ( empty( $_SERVER['HTTP_REFERER'] ) ) {
		/*$render_block['httpReferer'] = 'no';*/
		$render_block['httpReferer'] =  $showHttpReferer ? 'no' : 'yes';
		return $render_block;
	}

	$referer_parse = parse_url( $_SERVER['HTTP_REFERER'] );

	$accepted_referers = array_map( 'trim', explode( ',', $conditions['httpReferer'] ) );

	// No referer.
	if ( empty( $referer_parse ) ) {
		/*$render_block['httpReferer'] = 'no';*/
		$render_block['httpReferer'] =  $showHttpReferer ? 'no' : 'yes';
		return $render_block;
	}

	// Check if referer is allowed by the block.
	if ( isset( $referer_parse['host'] ) && ( in_array( $referer_parse['host'], $accepted_referers, true ) ) ) {
		/*$render_block['httpReferer'] = 'yes';*/
		$render_block['httpReferer'] = $showHttpReferer ? 'yes' : 'no';
		return $render_block;
	}

	// Default No.
	/*$render_block['httpReferer'] = 'no';*/
	$render_block['httpReferer'] = $showHttpReferer ? 'no' : 'yes';
	return $render_block;
}

add_filter( 'conditional_blocks_render_conditions', 'conditonal_blocks_check_referer', 10, 3 );


/**
 * Check the user brower and device.
 *
 * @param array $render_block array containing condition name and 'yes'/'no' if blocks should be rendered.
 * @param array $conditions Block block conditions array.
 * @param array $block the whole block object.
 * @return array render_block
 */
function conditonal_blocks_check_user_agent( $render_block, $conditions, $block ) {

	$showUserAgent = isset( $conditions['showUserAgent'] ) ? $conditions['showUserAgent'] : true;

	if ( empty( $conditions['httpUserAgent'] ) ) {
		$render_block['httpUserAgent'] = 'yes';
		return $render_block;
	}

	if ( empty( $_SERVER['HTTP_USER_AGENT'] ) ) {
		$render_block['httpUserAgent'] = 'no';
		return $render_block;
	}

	$allowed_agents = $conditions['httpUserAgent'];

	$current_agent = conblock_parse_user_agent();

	if ( empty( $current_agent['platform'] ) ) {
		/*$render_block['httpUserAgent'] = 'no';*/
		$render_block['httpUserAgent'] = $showUserAgent ? 'no' : 'yes';
		return $render_block;
	}

	$current_agent = strtolower( $current_agent['platform'] );

	// Check if referer is allowed by the block.
	if ( isset( $allowed_agents ) && ( in_array( $current_agent, $allowed_agents, true ) ) ) {
		/*$render_block['httpUserAgent'] = 'yes';*/
		$render_block['httpUserAgent'] = $showUserAgent ? 'yes' : 'no';
		return $render_block;
	}

	/*$render_block['httpUserAgent'] = 'no';*/
	$render_block['httpUserAgent'] = $showUserAgent ? 'no' : 'yes';
	return $render_block;
}

add_filter( 'conditional_blocks_render_conditions', 'conditonal_blocks_check_user_agent', 10, 3 );


/**
 * Check Post meta condition.
 *
 * @param array $render_block array containing condition name and 'yes'/'no' if blocks should be rendered.
 * @param array $conditions Block block conditions array.
 * @param array $block the whole block object.
 * @return array render_block
 */
function conditional_blocks_render_post_meta( $render_block, $conditions, $block ) {

	// Exit if condition is not needed.
	if ( empty( $conditions['postMeta'] ) || ! is_array( $conditions['postMeta'] ) ) {
		$render_block['postMeta'] = 'yes';
		return $render_block;
	}

	// Selected Post Meta Key from block.
	$condition_key = ! empty( $conditions['postMeta']['key'] ) ? $conditions['postMeta']['key'] : false;

	// Operator to use.
	$condition_operator = ! empty( $conditions['postMeta']['operator'] ) ? $conditions['postMeta']['operator'] : false;

	// Exit if none is set.
	if ( empty( $condition_key ) || empty( $condition_operator ) ) {
		$render_block['postMeta'] = 'yes';
		return $render_block;
	}

	// Post meta value to check for.
	$condition_value = isset( $conditions['postMeta']['value'] ) && ! empty( $conditions['postMeta']['value'] ) ? $conditions['postMeta']['value'] : '';

	$selected_meta = conditional_blocks_get_post_meta( $condition_key );

	// Meta is stored in arrays - Use as string.
	$selected_meta = is_array( $selected_meta ) ? $selected_meta[0] : '';

	if ( '===' === $condition_operator ) {
		if ( $selected_meta === $condition_value ) {
			$render_block['postMeta'] = 'yes';
			return $render_block;
		}
	}

	if ( '!==' === $condition_operator ) {
		if ( $selected_meta !== $condition_value ) {
			$render_block['postMeta'] = 'yes';
			return $render_block;
		}
	}

	if ( 'true' === $condition_operator ) {
		if ( $selected_meta ) {
			$render_block['postMeta'] = 'yes';
			return $render_block;
		}
	}

	if ( 'false' === $condition_operator ) {
		if ( empty( $selected_meta ) ) {
			$render_block['postMeta'] = 'yes';
			return $render_block;
		}
	}

		// Failed all check hide block.
		$render_block['postMeta'] = 'no';
		return $render_block;
}

add_filter( 'conditional_blocks_render_conditions', 'conditional_blocks_render_post_meta', 10, 3 );

/**
 * Check Date Ranges for Block.
 *
 * @param array $render_block array containing condition name and 'yes'/'no' if blocks should be rendered.
 * @param array $conditions Block block conditions array.
 * @param array $block the whole block object.
 * @return array render_block
 */
function conditonal_blocks_check_date_ranges( $render_block, $conditions, $block ) {

	if ( empty( $conditions['dates'] ) || ! is_array( $conditions['dates'] ) ) {
		// Failed all check hide block.
		$render_block['postMeta'] = 'yes';
		return $render_block;
	}

	$date_ranges = $conditions['dates'];
	$is_between  = false;
	$now         = new DateTime();

	// See if this moment is in a range.
	foreach ( $date_ranges as $range ) {

		$start = new DateTime();
		$start->setTimestamp( $range['start'] );

		$end = new DateTime();
		$end->setTimestamp( $range['end'] );

		if ( $now >= $start && $now <= $end ) {
			$is_between = true;
			break;
		}
	}
	// if now is in between the date ranges.
	if ( true === $is_between ) {
		$render_block['dates'] = 'yes';
	} else {
		$render_block['dates'] = 'no';
	}

	return $render_block;
}

add_filter( 'conditional_blocks_render_conditions', 'conditonal_blocks_check_date_ranges', 10, 3 );
