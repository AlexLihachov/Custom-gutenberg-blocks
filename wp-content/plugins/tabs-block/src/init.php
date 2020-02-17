<?php
/**
 * Blocks Initializer Class.
 *
 * @since   1.0.1
 * @package RRI
 */


if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if( ! class_exists( 'RRR_vertical_tabs' ) ) :
	final class RRI_vertical_tabs {
		private $version;
		private $slug;
        private $plugin_url;
		private $plugin_path;
		static private $data;
		
		private static $instance = null;
        
        private function __construct() {
            /* Nothing here! */
        }

		public function __clone() {
			_doing_it_wrong( __FUNCTION__, __("Please don't hack me!", 'RRI'), '1.0.1' );
		}

		public function __wakeup() {
			_doing_it_wrong( __FUNCTION__, __("Please don't hack me!", 'RRI'), '1.0.1' );
		}

		/*
         * Class construct function
         * @since 1.0.1
         */
		public static function instance(){
			if(!isset(self::$instance)){
				self::$instance = new self();
				self::$instance->setup();
				self::$instance->add_actions();
			}
			return self::$instance;
		}

		/*
         * Class setup
         * @since 1.0.1
         */
		private function setup(){
			$this->version = RRI_VERSION;
			$this->version = RRI_SLUG;
			$this->plugin_url = RRI_URI;
			$this->plugin_path = RRI_PATH;
		}

		/*
         * Class actions
         * @since 1.0.1
         */
		private function add_actions(){
			// Enqueue Gutenberg block assets for both frontend + backend.
			add_action( 'init', array($this, 'register_block_assets' ) );

			// Blocks category init
			add_filter('block_categories', array($this, 'register_block_category'));

			// Blocks category init
			add_filter('init', array($this, 'register_block'));

			add_action( 'wp_enqueue_scripts', array($this, 'add_frontend_assets') );
		}

		/*
         * Block assets registration
         * @since 1.0.1
         */
		public function register_block_assets(){
			// Register block styles for both frontend + backend.
			wp_register_style(
				'rri-vartical-tabs-css',
				$this->plugin_url . '/dist/blocks.style.build.css',
				array( 'wp-editor' ),
				null
			);

			// Register block editor script for backend.
			wp_register_script(
				'rri-vartical-tabs-js',
				$this->plugin_url . '/dist/blocks.build.js',
				array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), 
				null,
				true
			);
		
			// Register block editor styles for backend.
			wp_register_style(
				'rri-vartical-tabs-editor',
				$this->plugin_url . 'dist/blocks.editor.build.css',
				array( 'wp-edit-blocks' ),
				null
			);
		
			// WP Localized globals. Use dynamic PHP stuff in JavaScript via `cgbGlobal` object.
			wp_localize_script(
				'rri-vartical-tabs-js',
				'rri',
				[
					'pluginDirPath' => $this->plugin_url,
					'pluginDirUrl'  => $this->plugin_path,
				]
			);
		}

		/*
         * Frontend assets
         * @since 1.0.1
         */
		public function add_frontend_assets(){
			wp_register_script(
				'rri-tabs-js',
				$this->plugin_url . '/dist/js/rri-tabs.js',
				array('jquery', 'wp-api', 'wp-a11y', 'wp-util'), 
				null,
				true
			);
			wp_enqueue_script('rri-tabs-js');
		}

		/*
         * Block category registration callback
         * @since 1.0.1
         */
		public function register_block_category( $categories ){
			return array_merge(
				$categories,
				array(
					array(
						'slug' 	=> 'rri_blocks',
						'title'	=> __( 'RRi Blcoks', 'RRI' ),
						'icon'	=> 'star-empty'
					),
				)
			);
		}

		/*
         * Block registration callback
         * @since 1.0.1
         */
		public function  register_block(){
			register_block_type(
				'rri/vertical-tabs', 
				array(
					'style'         => 'rri-vartical-tabs-css',
					'editor_script' => 'rri-vartical-tabs-js',
					'editor_style'  => 'rri-vartical-tabs-editor',
					'render_callback' => array($this, 'render_block'),
				)
			);
		}

		public static function render_block($attributes, $content){
			if(is_admin()) {
				return;
			}
			ob_start(); ?>
				<div class='rri-vertical-tabs <?php echo isset($attributes['align']) ? 'align'.$attributes['align'] : ''; ?>' style='<?php echo $attributes['element_style']; ?>'> 
					<div class='rri-vertical-tabs-inner'>
						<div class='rri-tabs-nav'>
							<ul class='rri-nav' role="tablist">
								
							</ul>
						</div>
						<div class='rri-tabs-panels' style='height:<?php echo $attributes['height'].(!empty($attributes['height_type']) ? $attributes['height_type'] : 'px').';'; ?>'>
							<?php echo $content; ?>
						</div>
					</div>
				</div>
			
			<?php

			$output = ob_get_clean();

			return $output;
		}

		/*
         * Get version
         * @since 1.0.1
         */
        public function get_version() {
            return $this->version;
        }

		/*
         * Get slug
         * @since 1.0.1
         */
        public function get_slug(){
            return $this->slug;
        }
        
        /*
         * Return the plugin url
         * @since 1.0.1
         */
        public function get_plugin_url() {
            return $this->plugin_url;
        }

        /*
         * Return the plugin path
         * @since 1.0.1
         */
        public function get_plugin_path() {
            return $this->plugin_path;
        }
	}
endif;
