<?php
/**
 * Template part for displaying a archive page header
 *
 * @package wp_rig
 */

namespace WP_Rig\WP_Rig;

$query_object = get_queried_object();

if( !empty( $query_object->term_id ) && ! empty( $query_object->taxonomy ) ) {

	$taxonomy = get_taxonomy( $query_object->taxonomy );

	$query = new \WP_Query(
		array(
			'post_type'      => ! empty( $taxonomy->object_type ) ?  $taxonomy->object_type : 'any',
			'posts_per_page' => 1,
			'tax_query'      => array(
				array(
					'taxonomy' => $query_object->taxonomy,
					'field'    => 'term_id',
					'terms'    => $query_object->term_id
				)
			)
		)
	);

	if( $query->have_posts() ) {
		$query->the_post();

		global $archive_header_post_id;
		$archive_header_post_id = get_the_ID();

		$feature_image = ( has_post_thumbnail() ? get_the_post_thumbnail_url() : '' );

?>
		<div class="archive-header" style="<?php echo ( $feature_image != '' ? "background-image: url('" . $feature_image . "');" : '' ); ?>">
			<div class="archive-header-inner">
				<div class="archive-header-content">
					<?php
						get_template_part( 'template-parts/content/entry_category', get_post_type() );
						get_template_part( 'template-parts/content/entry_title', get_post_type() );
						get_template_part( 'template-parts/content/entry_excerpt', get_post_type() );
						get_template_part( 'template-parts/content/entry_readmore', get_post_type() );
					?>
				</div>
			</div>
		</div>
<?php

		wp_reset_postdata();
	}
}

?>