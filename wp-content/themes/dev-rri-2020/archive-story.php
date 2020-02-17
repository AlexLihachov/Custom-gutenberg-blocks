<?php
/**
 * The template for displaying archive story page
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
		if ( have_posts() ) {

			get_template_part( 'template-parts/content/page_header' );

			get_template_part( 'template-parts/content/category_filter' );
		?>
			<div id="archive_container" class="archive-container">
		<?php
				while ( have_posts() ) {
					the_post();

					get_template_part( 'template-parts/content/posts_block', get_post_type() );
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
