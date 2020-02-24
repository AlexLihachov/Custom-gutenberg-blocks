<?php
/**
 * WP_Rig\WP_Rig\Ajax_Pagination\Component class
 *
 * @package wp_rig
 */

namespace WP_Rig\WP_Rig\Ajax_Pagination;

use WP_Rig\WP_Rig\Component_Interface;
use function WP_Rig\WP_Rig\wp_rig;
use function add_action;
use function wp_enqueue_style;
use function wp_localize_script;

/**
 * Class for improving ajax_pagination among various core features.
 */
class Component implements Component_Interface {

	/**
	 * Gets the unique identifier for the theme component.
	 *
	 * @return string Component slug.
	 */
	public function get_slug() : string {
		return 'ajax_pagination';
	}

	/**
	 * Adds the action and filter hooks to integrate with WordPress.
	 */
	public function initialize() {
		add_action( 'wp_enqueue_scripts', [ $this, 'action_enqueue_ajax_pagination_script' ] );
		add_action( 'wp_ajax_wp_rig_ajax_pagination', [ $this, 'ajax_pagination' ] );
		add_action( 'wp_ajax_nopriv_wp_rig_ajax_pagination', [ $this, 'ajax_pagination' ] );
	}

	/**
	 * Enqueues a script for ajax pagination.
	 */
	public function action_enqueue_ajax_pagination_script() {

		// If the AMP plugin is active, return early.
		if ( wp_rig()->is_amp() ) {
			return;
		}

		// Enqueue the ajax pagination script.
		wp_enqueue_script(
			'wp-rig-ajax-pagination',
			get_theme_file_uri( '/assets/js/ajax_pagination.min.js' ),
			['jquery'],
			wp_rig()->get_asset_version( get_theme_file_path( '/assets/js/ajax_pagination.min.js' ) ),
			false
		);
		wp_localize_script(
			'wp-rig-ajax-pagination',
			'wpRigAjaxPagination',
			[
				'ajax_url'   => admin_url( 'admin-ajax.php' ),
			]
		);
	}

	/**
	 * Function to handle ajax pagination
	 */
	public function ajax_pagination() {	
		$query_vars = ( isset( $_REQUEST['vars'] ) ? json_decode( stripslashes( $_REQUEST['vars'] ), true ) : array() );
		$page = ( isset( $_REQUEST['page'] ) ? $_REQUEST['page'] + 1 : 1 );
		
		$query_vars['paged'] = $page;
		$query_vars['page'] = $page;

		if( isset( $query_vars['offset'] ) ) {
			unset( $query_vars['offset'] );
		}

		query_posts( $query_vars );

		ob_start();

		if( have_posts() ) {
			while ( have_posts() ) {
				the_post();

				get_template_part( 'template-parts/content/posts_block', get_post_type() );
			}
		}

		$content = ob_get_clean();

		ob_start();

		get_template_part( 'template-parts/content/ajax_pagination' );

		$pagination = ob_get_clean();

		echo json_encode( array( 'content' => $content, 'pagination_link' => $pagination ) );
		die;
	}
}