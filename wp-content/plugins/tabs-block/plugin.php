<?php
/**
 * Plugin Name: RRI Vertical Tabs
 * Plugin URI: 
 * Description: Vertical tabs block.
 * Author:
 * Author URI:
 * Version: 
 * License
 * License URI: 
 *
 * @package RRI
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/* Constant version */
define('RRI_VERSION', '1.0.1');

/* Constant slug */
define('RRI_SLUG', basename(plugin_dir_path(__FILE__)));

/* Constant path to the main file for activation call */
define('RRI_CORE_FILE', __FILE__);

/* Constant path to plugin directory */
define('RRI_PATH', trailingslashit(plugin_dir_path(__FILE__)));

/* Constant uri to plugin directory */
define('RRI_URI', trailingslashit(plugin_dir_url(__FILE__)));


require_once RRI_PATH . 'src/init.php';

/* Function for vertical tabs class initialization */
if( ! function_exists( 'rri_vt_init' ) ) :
	function rri_vt_init(){
		return RRI_vertical_tabs::instance();
	}
endif;

rri_vt_init();
