<?php
/**
 * Template part for displaying a post's hero image
 *
 * @package wp_rig
 */

namespace WP_Rig\WP_Rig;

if ( is_singular( get_post_type() ) ) {
	if( has_post_thumbnail() ) {
		$url = get_the_post_thumbnail_url();
		if( $url != '' ) {
		?>
			<div class="entry-hero" style="background-image: url('<?php echo $url; ?>')"></div>
		<?php
		}
	}
}