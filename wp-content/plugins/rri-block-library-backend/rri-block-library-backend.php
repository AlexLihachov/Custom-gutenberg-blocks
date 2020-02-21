<?php
/**
 * Plugin Name: RRI Block Library - Backend
 * Plugin URI: http://www.tonyrobbins.com/
 * Description: Gutenberg blocks for RRI
 * Version: 1.0.1
 * Author: Chandni Patel
 * Author URI: http://phpwebdev.in/
 * Developer: Chandni Patel
 * Developer URI: http://phpwebdev.in/
 * Text Domain: rri
 * Domain Path: rri/languages
 * License: GNU General Public License v3.0
 * License URI: http://www.gnu.org/licenses/gpl-3.0.html
 *
 * @package RRI
 */

/**
 * Exit if accessed directly
 */
if ( ! defined( 'ABSPATH' ) ) {
	die( 'Access Denied!' );
}

/**
 * Define constants
 */
define( 'RRI_DIR', plugin_dir_path( __FILE__ ) . 'rri/' );
define( 'RRI_URL', plugin_dir_url( __FILE__ ) . 'rri/' );
define( 'RRI_TEXTDOMAIN', 'rri' );

/**
 * Include core files of the plugin
 */
require_once RRI_DIR . 'classes/class-rri-block-library-backend.php';

/**
 * Create the main object of the plugin when the plugin is loaded
 */
if ( ! function_exists( 'rri_block_library_backend_init' ) ) {

	/**
	 * Function to initialize the plugin.
	 *
	 * @since 1.0.0
	 * @return class object
	 */
	function rri_block_library_backend_init() {
		/* Initialize the base class of the plugin */
		return Rri_Block_Library_Backend::instance();
	}
}

add_action( 'plugins_loaded', 'rri_block_library_backend_init' );
