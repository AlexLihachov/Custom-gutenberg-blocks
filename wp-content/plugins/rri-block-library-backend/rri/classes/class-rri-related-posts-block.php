<?php
/**
 * Class to handle related posts block
 *
 * @since 1.0.0
 * @package RRI
 */

if ( ! class_exists( 'Rri_Related_Posts_Block' ) ) {
	/**
	 * Create class if not exists
	 *
	 * @since 1.0.0
	 */
	class Rri_Related_Posts_Block {
		public static function render_related_posts_block( $atts, $content ) {

			$atts = shortcode_atts( array(
    			'post_types'    => array(),
    			'related_posts' => array(),
    			'align'         => '',
			), $atts);


			ob_start();

			$arrIds = array_map(function ( $arr ) { return $arr['id']; }, $atts['related_posts']);

			if( is_array( $arrIds ) && count( $arrIds ) > 0 ) {
				$query = new WP_Query(
					array(
						'post_type' => 'any',
						'post__in'  => $arrIds,
						'orderby'   => 'post__in'
					)
				);

				if( $query->have_posts() ) {
					$taxonomies = get_taxonomies('','names');
			?>
					<div class="<?php echo ( $atts['align'] != '' ? 'align' . $atts['align'] : '' ); ?> rri-related-posts-content">
						<?php echo $content; ?>
						<div class="rri-related-posts-blocks">
			<?php
							while ( $query->have_posts() ) {
								$query->the_post();

								$post_type = get_post_type();

			?>
								<div class="rri-related-post-block">
									<?php
										if( has_post_thumbnail() ) {
									?>
											<div class="related-post-img">
									<?php
												the_post_thumbnail();
									?>
												<?php
													if( in_array( $post_type, array( 'podcast' ) ) ) {
												?>
														<div class="related-post-overlay">
															<i class="icon icon-Podcast"></i>
														</div>
												<?php
													}
												?>
											</div>
									<?php
										}
									?>
									<div class="related-post-content">
										<?php
											$post_terms = wp_get_object_terms( get_the_ID(), $taxonomies );

											if( is_array( $post_terms ) && count( $post_terms ) > 0 ) {
												foreach ( $post_terms as $term ) {
													$color = get_term_meta( $term->term_id, 'term_color', true );
										?>
													<div class="related-post-category">
														<a href="<?php echo get_term_link($term); ?>"><?php echo $term->name; ?></a>
													</div>
										<?php
												}
											}
										?>
										<h4><?php the_title(); ?></h4>
										
									</div>
									<div class="related-post-date"><?php the_date(); ?></div>
									<div class="read-more">
										<a href="<?php the_permalink(); ?>"><?php _e('Read More', RRI_TEXTDOMAIN); ?></a>
									</div>
								</div>
			<?php
							}
			?>
						</div>
					</div>
			<?php
				}

				wp_reset_postdata();
			}

			return ob_get_clean();
		}
	}
}