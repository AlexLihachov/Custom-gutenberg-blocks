<?php
/**
 * WP Rig functions and definitions
 *
 * This file must be parseable by PHP 5.2.
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package wp_rig
 */

define( 'WP_RIG_MINIMUM_WP_VERSION', '4.5' );
define( 'WP_RIG_MINIMUM_PHP_VERSION', '7.0' );

// Bail if requirements are not met.
if ( version_compare( $GLOBALS['wp_version'], WP_RIG_MINIMUM_WP_VERSION, '<' ) || version_compare( phpversion(), WP_RIG_MINIMUM_PHP_VERSION, '<' ) ) {
	require get_template_directory() . '/inc/back-compat.php';
	return;
}

// Include WordPress shims.
require get_template_directory() . '/inc/wordpress-shims.php';

// Setup autoloader (via Composer or custom).
if ( file_exists( get_template_directory() . '/vendor/autoload.php' ) ) {
	require get_template_directory() . '/vendor/autoload.php';
} else {
	/**
	 * Custom autoloader function for theme classes.
	 *
	 * @access private
	 *
	 * @param string $class_name Class name to load.
	 * @return bool True if the class was loaded, false otherwise.
	 */
	function _wp_rig_autoload( $class_name ) {
		$namespace = 'WP_Rig\WP_Rig';

		if ( strpos( $class_name, $namespace . '\\' ) !== 0 ) {
			return false;
		}

		$parts = explode( '\\', substr( $class_name, strlen( $namespace . '\\' ) ) );

		$path = get_template_directory() . '/inc';
		foreach ( $parts as $part ) {
			$path .= '/' . $part;
		}
		$path .= '.php';

		if ( ! file_exists( $path ) ) {
			return false;
		}

		require_once $path;

		return true;
	}
	spl_autoload_register( '_wp_rig_autoload' );
}

// Load the `wp_rig()` entry point function.
require get_template_directory() . '/inc/functions.php';

/**
 * Add a block category for "RRI Blocks"
 *
 * @param array $categories Array of block categories.
 *
 * @return array
 */
function rri_block_categories( $categories ) {
    return array_merge(
        $categories,
        array(
            array(
                'slug'  => 'rri-blocks',
                'title' => 'RRI Blocks',
            ),
        )
    );
}
add_filter( 'block_categories', 'rri_block_categories', 10, 2 );


function rri_pre_get_posts( $query ) {
	if( !is_admin() && is_archive() && $query->is_main_query() ) {
		$temp = $query->query_vars;
		$temp['posts_per_page'] = 1;
		$temp['fields'] = 'ids';

		$arrPosts = get_posts($temp);

		if( is_array( $arrPosts ) ) {
			$query->set('post__not_in', $arrPosts );
		}
	}
}
add_action( 'pre_get_posts', 'rri_pre_get_posts' );

/**
 * Filter Force Login to allow exceptions for specific URLs.
 *
 * @param array $whitelist An array of URLs. Must be absolute.
 * 
 * @return array
 */
function my_forcelogin_whitelist( $whitelist ) {
	$whitelist[] = home_url( '/tim-hooker-qa/' );
	return $whitelist;
  }
  add_filter( 'v_forcelogin_whitelist', 'my_forcelogin_whitelist' );

// Initialize the theme.
call_user_func( 'WP_Rig\WP_Rig\wp_rig' );