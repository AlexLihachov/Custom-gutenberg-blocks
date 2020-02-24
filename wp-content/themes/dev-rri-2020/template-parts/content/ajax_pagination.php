<?php
/**
 * Template part for displaying ajax pagination
 *
 * @package wp_rig
 */

namespace WP_Rig\WP_Rig;

$page = get_query_var( 'paged' ) ? get_query_var( 'paged' ) : 1;

if( $wp_query->max_num_pages > 1 && $page != $wp_query->max_num_pages ) {
?>
	<div id="ajax_pagination" class="ajax-pagination">
		<a href="#" class="button-primary" id="ajax_load_more" data-vars='<?php echo json_encode( $wp_query->query_vars ); ?>' data-page="<?php echo ( get_query_var( 'paged' ) ? get_query_var('paged') : 1 ); ?>" data-max-page="<?php echo $wp_query->max_num_pages; ?>">Load More</a>
	</div>
<?php
}