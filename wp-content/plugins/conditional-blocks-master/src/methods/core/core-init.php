<?php
/**
 * Run functions after plugin has ininitalized.
 *
 * @package XPLUGIN_SLUG
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
/**
 * continas all plugin contants to use, such as version and path.
 * 
 * @param string $key return a specific key or entire array.
 */
function XPLUGIN_PREFIX_setup( $key = false ) {

	$plugin = new XPLUGIN_PREFIX_CAPITAL_Init();

	$constants = $plugin->constants && is_array( $plugin->constants ) ? $plugin->constants : false;

	if ( $constants ) {
		return $key ? $constants[ $key ] : $constants;
	}

	return $false;
}
