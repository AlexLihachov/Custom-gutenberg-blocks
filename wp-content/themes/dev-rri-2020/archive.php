<?php
/**
 * The template for displaying archive pages
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package wp_rig
 */

namespace WP_Rig\WP_Rig;

get_header();

wp_rig()->print_styles( 'wp-rig-content' );

?>
	<main id="primary" class="site-main">
		<?php
		get_template_part( 'template-parts/content/archive_header' );

		if ( have_posts() ) {


				get_template_part( 'template-parts/content/category_filter' );
		?>
				<div id="archive_container" class="archive-container">
		<?php
					while ( have_posts() ) {
						the_post();
					
						if( $archive_header_post_id != get_the_ID() ){
							get_template_part( 'template-parts/content/posts_block', get_post_type() );
						}
					}
		?>
				</div>
		<?php

				get_template_part( 'template-parts/content/ajax_pagination' );

		} else {
			get_template_part( 'template-parts/content/error' );
		}
		?>
	</main><!-- #primary -->
<?php
get_sidebar();
get_footer();
