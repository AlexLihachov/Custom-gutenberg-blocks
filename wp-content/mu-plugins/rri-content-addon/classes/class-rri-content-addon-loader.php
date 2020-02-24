<?php
/**
 * RRI CONTENT Loader.
 *
 */

if ( ! class_exists( 'RRI_Content_Addon_Loader' ) ) {

	/**
	 * Class RRI_Content_Addon_Loader.
	 */
	final class RRI_Content_Addon_Loader {

		/**
		 * Member Variable
		 *
		 * @var instance
		 */
		private static $instance = null;

		/**
		 * Member Variable
		 *
		 * @var options
		 */
		public $options = null;

		/**
		 * Member Variable
		 *
		 * @var meta
		 */
		public $meta = null;

		/**
		 *  Initiator
		 */
		public static function get_instance() {

			if ( is_null( self::$instance ) ) {

				self::$instance = new self();

				/**
				 * RRI Content Addon loaded.
				 *
				 * Fires when rri-content-addon was fully loaded and instantiated.
				 *
				 * @since 1.0.0
				 */
				do_action( 'rri-content-addon' );
			}

			return self::$instance;
		}

		/**
		 * Constructor
		 */
		public function __construct() {

			$this->define_constants();

			add_action( 'plugins_loaded', array( $this, 'load_plugin' ), 99 );
			
		}

		/**
		 * Defines all constants
		 *
		 * @since 1.0.0
		 */
		public function define_constants() {

			define( 'RRI_CONTENT_ADDON_BASE', plugin_basename( RRI_CONTENT_ADDON_FILE ) );
			define( 'RRI_CONTENT_ADDON_DIR', plugin_dir_path( RRI_CONTENT_ADDON_FILE ) );
			define( 'RRI_CONTENT_ADDON_URL', plugins_url( '/', RRI_CONTENT_ADDON_FILE ) );
			define( 'RRI_CONTENT_ADDON_VER', '1.0.0' );
			define( 'RRI_CONTENT_ADDON_SLUG', 'rri-content-addon' );
			define( 'RRI_CONTENT_ADDON_SETTINGS', 'rri_content_addon_settings' );
            
            define( 'RRI_CONTENT_ADDON_PODCAST_POST_TYPE', 'podcast' );
		    define( 'RRI_CONTENT_ADDON_TAXONOMY_PODCAST_CATEGEGORY', 'podcast-category' );
            
            define( 'RRI_CONTENT_ADDON_STORY_POST_TYPE', 'story' );
		    define( 'RRI_CONTENT_ADDON_TAXONOMY_STORY_CATEGEGORY', 'story-category' );
		
		}

		/**
		 * Loads plugin files.
		 *
		 * @since 1.0.0
		 *
		 * @return void
		 */
		public function load_plugin() {

			$this->load_core_files();
		}

        /**
		 * Load Core Files.
		 *
		 * @since 1.0.0
		 *
		 * @return void
		 */
		public function load_core_files() {

            require_once RRI_CONTENT_ADDON_DIR . 'modules/class-rri-podcast-post-type.php';
            require_once RRI_CONTENT_ADDON_DIR . 'modules/class-rri-story-post-type.php';

		}
    }

	/**
	 *  Prepare if class 'RRI_Content_Addon_Loader' exist.
	 *  Kicking this off by calling 'get_instance()' method
	 */
	RRI_Content_Addon_Loader::get_instance();
}
