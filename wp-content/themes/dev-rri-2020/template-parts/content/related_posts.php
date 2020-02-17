<?php
/**
 * Template part for displaying related posts
 *
 * @package wp_rig
 */

namespace WP_Rig\WP_Rig;

$_ID = get_the_ID();

$taxonomies =get_taxonomies('','names');
$post_terms = wp_get_object_terms( get_the_ID(), $taxonomies );

$tax_query = array();
if( is_array( $post_terms ) && count( $post_terms ) > 0 ) {
	foreach ( $post_terms as $post_term ) {
		$tax_query[] = array(
			'taxonomy' => $post_term->taxonomy,
			'field'    => 'slug',
			'terms'    => $post_term->slug
		);
	}
}

$args = array(
	'post_type'      => get_post_type(),
	'post__not_in'   => array( $_ID ),
	'posts_per_page' => 3
);

if( is_array( $tax_query ) && count( $tax_query ) > 0 ) {
	$args['tax_query'] = array(
		'relation' => 'OR',
		$tax_query
	);
}

$query = new \WP_Query( $args );

if( $query->have_posts() ) {
?>
	<div class="related-posts">
		<h2><?php _e('Related Posts', '') ?></h2>
		<div class="related-posts-container">
<?php
		while ( $query->have_posts() ) {
			$query->the_post();
?>
			<?php
				get_template_part( 'template-parts/content/posts_block', get_post_type() );
			?>
<?php
		}
?>
		</div>
	</div>
<?php
	wp_reset_postdata();
}