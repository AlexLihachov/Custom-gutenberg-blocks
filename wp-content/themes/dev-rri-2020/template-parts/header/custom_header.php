<?php
/**
 * Template part for displaying the custom header media
 *
 * @package wp_rig
 */

namespace WP_Rig\WP_Rig;

?>

<div class="rri-topbar">
	<div class="site top-bar-items">
		<div class="social-info">
			<ul class="icons">
				<li><a class="header-social-icon" href="#" target="_blank"><i class="fa fa-facebook" aria-label="Facebook"></i></a></li>
				<li><a class="header-social-icon" href="#" target="_blank"><i class="fa fa-twitter" aria-label="Facebook"></i></a></li>
				<li><a class="header-social-icon" href="#" target="_blank"><i class="fa fa-linkedin" aria-label="Facebook"></i></a></li>
				<li><a class="header-social-icon" href="#" target="_blank"><i class="fa fa-instagram" aria-label="Facebook"></i></a></li>
				<li><a class="header-social-icon" href="#" target="_blank"><i class="fa fa-mobile" aria-label="Facebook"></i>1 8442891008</a></li>
			</ul>
		</div>
		<div class="cart">
			<ul class="nav-right">
				<li><a href="#"><input type="text" /><i class="fa fa-search" aria-label="search"></i></a></li>
				<li><a href="#"><i class="fa fa-shopping-cart" aria-label="Cart"></i></a></li>
				<li><a href="#"><i class="fa fa-sign-in" aria-label="Cart"></i> Log in</a></li>
			</ul>
		</div>
	</div>
</div>

<?php

if ( ! has_header_image() ) {
	return;
}

?>
<figure class="header-image">
	<?php the_header_image_tag(); ?>
</figure><!-- .header-image -->

