<?php
/**
 * Template part for displaying a post's category
 *
 * @package wp_rig
 */

namespace WP_Rig\WP_Rig;

?>

<div class="post-category">
	<?php
		$taxonomies = get_taxonomies('','names');
		$post_terms = wp_get_object_terms( get_the_ID(), $taxonomies );

		if( is_array( $post_terms ) && count( $post_terms ) > 0 ) {
			foreach ( $post_terms as $term ) {
	?>
				<a href="<?php echo get_term_link($term); ?>"><?php echo $term->name; ?></a>
	<?php
			}
		}
	?>
</div>
