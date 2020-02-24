<?php
/**
 * Template part for displaying related posts
 *
 * @package wp_rig
 */

namespace WP_Rig\WP_Rig;
$counter = $wp_query->current_post;

?>
<div class="posts-block <?php echo ( is_archive() && in_array($counter, array(0, 6) ) ? 'big' : '' ); ?>">
<?php
	$_the_permalink = get_the_permalink();
	if( has_post_thumbnail() ) {
?>
		<div class="post-image" style="background-image: url('<?php echo get_the_post_thumbnail_url(); ?>')"></div>
<?php
	}
?>
	<div class="post-content-inner">
		<div class="post-category">
		<?php
			$taxonomies =get_taxonomies('','names');
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
		<h4><a href="<?php echo $_the_permalink; ?>"><?php the_title(); ?></a></h4>
		<p><a href="<?php echo $_the_permalink; ?>"><?php _e( 'Read More', wp_get_theme()->get( 'TextDomain' ) ); ?></a></p>
	</div>
</div>