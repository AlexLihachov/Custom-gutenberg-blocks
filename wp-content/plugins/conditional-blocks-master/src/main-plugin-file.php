<?php
/**
 * Plugin Name: XPLUGIN_NAME
 * Author URI: https://conditionalblocks.com/
 * Description: Conditionally show or hide any Gutenberg Block for any reason.
 * Author: Conditional Blocks
 * Version: XPLUGIN_VERSION
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package conditional_blocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

new XPLUGIN_PREFIX_CAPITAL_Init();

/**
 * XPLUGIN_PREFIX_CAPITAL_Init int the plugin.
 */
class XPLUGIN_PREFIX_CAPITAL_Init {
	/**
	 * Access all plugin constants
	 *
	 * @var array
	 */
	public $constants;

	/**
	 * Access notices class.
	 *
	 * @var class
	 */
	private $notices;

	/**
	 * Plugin init.
	 */
	public function __construct() {

		$this->constants = array(
			'name'           => 'XPLUGIN_NAME',
			'version'        => 'XPLUGIN_VERSION',
			'slug'           => plugin_basename( __FILE__, ' . php' ),
			'base'           => plugin_basename( __FILE__ ),
			'name_sanitized' => basename( __FILE__, '. php' ),
			'path'           => plugin_dir_path( __FILE__ ),
			'url'            => plugin_dir_url( __FILE__ ),
			'file'           => __FILE__,
		);

		// include Notices.
		include_once plugin_dir_path( __FILE__ ) . 'classes/class-admin-notices.php';
		// Set notices to class.
		$this->notices = new XPLUGIN_PREFIX_admin_notices();
		// Activation.
		register_activation_hook( __FILE__, array( $this, 'activation' ) );

		// Load plugin when all plugins are loaded.
		add_action( 'plugins_loaded', array( $this, 'init' ) );
	}

	/**
	 * Plugin init.
	 */
	public function init() {

		// @if type = 'premium'
		if ( class_exists( 'CONBLOCK_Init' ) ) {

			$free_plugin = new CONBLOCK_Init();

			// Required if functions are not yet loaded.
			require_once ABSPATH . 'wp-admin/includes/plugin.php';

			deactivate_plugins( $free_plugin->constants['base'] );

			$result = deactivate_plugins( $free_plugin->constants['base'] );

			$this->notices->add_notice(
				'warning',
				'Head\'s up - XPLUGIN_NAME is is standalone. The free version has been deactivated automatically.'
			);

			return false;
		}
		// @endif

		// Require core files.
		require_once plugin_dir_path( __FILE__ ) . 'methods/core/core-init.php';
		require_once plugin_dir_path( __FILE__ ) . 'methods/core/core-functions.php';
		require_once plugin_dir_path( __FILE__ ) . 'methods/core/core-render-blocks.php';
		require_once plugin_dir_path( __FILE__ ) . 'methods/core/core-enqueue.php';
		// @if type = 'premium'
		// Require Premium files.
		require_once plugin_dir_path( __FILE__ ) . 'methods/premium/premium-functions.php';
		require_once plugin_dir_path( __FILE__ ) . 'methods/premium/premium-render-blocks.php';
		require_once plugin_dir_path( __FILE__ ) . 'methods/premium/premium-enqueue.php';
		// @endif

		// Include our dependencies.
		$this->dependencies();
	}

	public function activation() {
		// @if type = 'free'
		$text = __(
			'Thank you for installing XPLUGIN_NAME! Fire up the Gutenberg editor and start adding conditions. ',
			'conditional-blocks'
		) . '<a class="button button-primary" href="' . esc_url( admin_url( '/options-general.php?page=conditional-blocks' ) ) . '">' . __( 'Go to settings', 'conditional-blocks' ) . '</a>';
		$this->notices->add_notice(
			'success',
			$text
		);
		// @endif

		// @if type = 'premium'
		$text = __(
			'Thank you for going Pro! You just need to active <b>XPLUGIN_NAME</b> to recieve automatic updates and support!  ',
			'conditional-blocks'
		) . '<a class="button button-primary" href="' . esc_url( admin_url( '/options-general.php?page=conditional-blocks' ) ) . '">' . __( 'Activate License', 'conditional-blocks' ) . '</a>';

		$this->notices->add_notice(
			'success',
			$text
		);
		// @endif
	}


	/**
	 * Include dependencies
	 */
	public function dependencies() {

		// Admin settings API.
		require_once plugin_dir_path( __FILE__ ) . 'classes/class-settings-api.php';
		// Create our settings page.
		require_once plugin_dir_path( __FILE__ ) . 'methods/core/class-admin-settings.php';

		new XPLUGIN_PREFIX_Admin_Settings( $this->constants );

		// @if type = 'premium'
		// Add Pro classes.
		require_once plugin_dir_path( __FILE__ ) . 'methods/premium/admin-settings.php';

		// Add our licesening class.
		require_once plugin_dir_path( __FILE__ ) . '/classes/class-premium-license.php';
		// Pass in plugin information, id of license field the section it belongs to section.
		$license = new XPLUGIN_PREFIX_License( $this->constants, 'edd_license', 'conditional_blocks_pro_license' );

		// Get our updater class.
		require_once plugin_dir_path( __FILE__ ) . '/classes/class-premium-updater.php';
		// Run the updater.
		new XPLUGIN_PREFIX_Updater(
			'XPLUGIN_EDD_STORE_URL',
			__FILE__,
			array(
				'author'  => 'XPLUGIN_AUTHOR',  // author of this plugin.
				'version' => 'XPLUGIN_VERSION', // current version number.
				'item_id' => 'XPLUGIN_EDD_ITEM_ID',  // name of this plugin.
				'license' => $license->get_key(),  // license key.
				'url'     => home_url(),
				'beta'    => false,
			)
		);
		// @endif
	}
}
