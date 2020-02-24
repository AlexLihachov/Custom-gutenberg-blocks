<?php
/**
 * WP_Rig\WP_Rig\Ajax_Search\Component class
 *
 * @package wp_rig
 */

namespace WP_Rig\WP_Rig\Ajax_Search;

use WP_Rig\WP_Rig\Component_Interface;
use function WP_Rig\WP_Rig\wp_rig;
use function add_action;
use function wp_enqueue_style;
use function wp_localize_script;

/**
 * Class for improving ajax_search among various core features.
 */
class Component implements Component_Interface {

	/**
	 * Gets the unique identifier for the theme component.
	 *
	 * @return string Component slug.
	 */
	public function get_slug() : string {
		return 'ajax_Search';
	}

	/**
	 * Adds the action and filter hooks to integrate with WordPress.
	 */
	public function initialize() {
		add_action( 'wp_enqueue_scripts', [ $this, 'action_enqueue_ajax_search_script' ] );
		add_action( 'wp_ajax_wp_rig_ajax_search', [ $this, 'ajax_search' ] );
		add_action( 'wp_ajax_nopriv_wp_rig_ajax_search', [ $this, 'ajax_search' ] );
	}

	/**
	 * Enqueues a script for ajax search.
	 */
	public function action_enqueue_ajax_search_script() {

		// If the AMP plugin is active, return early.
		if ( wp_rig()->is_amp() ) {
			return;
		}

		// Enqueue the ajax search script.
		wp_enqueue_script(
			'wp-rig-ajax-search',
			get_theme_file_uri( '/assets/js/ajax_search.min.js' ),
			['jquery'],
			wp_rig()->get_asset_version( get_theme_file_path( '/assets/js/ajax_search.min.js' ) ),
			false
		);
		wp_localize_script(
			'wp-rig-ajax-search',
			'wpRigAjaxSearch',
			[
				'ajax_url'   => admin_url( 'admin-ajax.php' ),
			]
		);
	}

	/**
	 * Function to handle ajax search
	 */
	public function ajax_search() {	

		if( false === ( $ajax_search_data = get_transient( 'rri_ajax_search_data' ) ) ){

			$ajax_search_data = new WP_Query(
				array(
					'post_type'      => 'any',
					'posts_per_page' => '-1',
				)
			);

			$arrData = array();

			if( have_posts() ) {
				while( have_posts() ) {
					the_post();

					$arrData = array(
						'title'     => get_the_title(),
						'content'   => strip_tags( get_the_content() ),
						'post_type' => get_post_type(),
						'image'     => ( has_post_thumbnail() ? get_the_post_thumbnail_url() : '' )
					);
				}
			}

			set_transient( 'rri_ajax_search_data', $ajax_search_data, 60 * 60 );
		}

		echo json_encode( $ajax_search_data );
		die;
	}
}