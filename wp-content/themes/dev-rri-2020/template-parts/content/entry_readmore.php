<?php
/**
 * Template part for displaying a post's content
 *
 * @package wp_rig
 */

namespace WP_Rig\WP_Rig;

?>
<div class="entry-read-more">
	<a href="<?php the_permalink(); ?>"><?php _e( 'Read More', wp_get_theme()->get( 'TextDomain' ) ); ?></a>
</div>