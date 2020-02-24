<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package wp_rig
 */

namespace WP_Rig\WP_Rig;

get_header();

wp_rig()->print_styles( 'wp-rig-content' );

global $wp_query, $showBlog;
$showBlog = false;
if( !empty( $wp_query->query ) && isset( $wp_query->query['pagename'] ) ) {
	$curPage = get_page_by_path( $wp_query->query['pagename'] );
	if( !empty( $curPage->ID ) && $curPage->ID == get_option( 'page_for_posts' ) ) {
		$showBlog = true;
	}
}

?>
	<main id="primary" class="site-main">
		<?php
		if( $showBlog ) {
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
		} else {
			if ( have_posts() ) {

				get_template_part( 'template-parts/content/page_header' );

				while ( have_posts() ) {
					the_post();

					get_template_part( 'template-parts/content/entry', get_post_type() );
				}

				if ( ! is_singular() ) {
					get_template_part( 'template-parts/content/pagination' );
				}
			} else {
				get_template_part( 'template-parts/content/error' );
			}
		}
		?>
	</main><!-- #primary -->
<?php
get_sidebar();
get_footer();
