<?php
/**
 * Base class of the plugin
 *
 * @since 1.0.0
 * @package RRI
 */

if ( ! class_exists( 'Rri_Block_Library_Backend' ) ) {

	/**
	 * Create class if not exists
	 *
	 * @since 1.0.0
	 */
	class Rri_Block_Library_Backend {
		/**
		 * Instance of the class
		 *
		 * @var rri_block_library_backend the single instance of the class
		 * @since 1.0.0
		 */
		protected static $instance = null;

		/**
		 * Instantiates the plugin and include all the files needed for the plugin.
		 *
		 * @since 1.0.0
		 * @access public
		 */
		public function __construct() {

			/* Load plugin files */
			self::load_plugin_files();
		}

		/**
		 * Include all the files needed for the plugin
		 *
		 * @since 1.0.0
		 * @static
		 * @access private
		 */
		private static function load_plugin_files() {
			/* File to register all blocks */
			require_once RRI_DIR . 'classes/class-rri-register-blocks.php';

			/* Group block */
			require_once RRI_DIR . 'classes/class-rri-group-block.php';

            /* Banner block */
            require_once RRI_DIR . 'classes/class-rri-banner-block.php';

            /* Header block */
            require_once RRI_DIR . 'classes/class-rri-header-block.php';
		}

		/**
		 * Create RRI Block Library Backend Instance
		 * Make sure single instance of the plugin is loaded
		 *
		 * @since 1.0.0
		 * @static
		 * @access public
		 * @return Plugin main instance
		 */
		public static function instance() {
			if ( is_null( self::$instance ) ) {
				self::$instance = new self();
			}

			return self::$instance;
		}
	}
}
