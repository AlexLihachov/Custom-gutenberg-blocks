<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
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
				the_post();

				get_template_part( 'template-parts/content/entry_hero', get_post_type() );
		?>
				<header class="entry-header">
					<div class="content-top">
						<?php
							get_template_part( 'template-parts/content/entry_category', get_post_type() );
							get_template_part( 'template-parts/content/entry_meta', get_post_type() );
						?>	
						<div class="clearfix"></div>
					</div>
		<?php
					get_template_part( 'template-parts/content/entry_title', get_post_type() );
		?>
				</header>
		<?php
				get_template_part( 'template-parts/content/entry', get_post_type() );
				get_template_part( 'template-parts/content/related_posts', get_post_type() );
		}
		?>
	</main><!-- #primary -->
<?php
/*get_sidebar();*/
get_footer();
