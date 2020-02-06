<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package wp_rig
 */

namespace WP_Rig\WP_Rig;

?>

	<footer id="colophon" class="rri-full-width">
		<div class="flex-container">
			<div class="flex-columns first-column">
				<h3>Robbins Research International, Inc.</h3>
				<p>6160 Cornerstone Court East Ste. 200 San Diego, CA 92121</p>
				<h3>Connect with Tony</h3>
				<div class="footer-social">
					<a class="footer-social-icon" href="#" target="_blank">
						<span class="icon icon-Facebook"></span>
					</a>
					<a class="footer-social-icon" href="#" target="_blank">
						<span class="icon icon-Twitter"></span>
					</a>
					<a class="footer-social-icon" href="#" target="_blank">
						<span class="icon icon-Instagram"></span>
					</a>
					<a class="footer-social-icon" href="#" target="_blank">
						<span class="icon icon-Linkedin"></span>
					</a>
				</div>
			</div>
			<div class="flex-columns second-column">
				<ul class="footer-links">
					<li><a href="#">Sitemap</a></li>
					<li><a href="#">Terms</a></li>
					<li><a href="#">Return Policy</a></li>
					<li><a href="#">DISC Assessment</a></li>
					<li><a href="#">Crew Program</a></li>
				</ul>
			</div>
			<div class="flex-columns third-column">
				<ul class="footer-links">
					<li><a href="#">Careers</a></li>
					<li><a href="#">Policies</a></li>
					<li><a href="#">Affiliates</a></li>
					<li><a href="#">Firewalk</a></li>
				</ul>
			</div>
			<div class="flex-columns forth-column">
				<ul class="footer-links">
					<li><a href="#">Lorem ipsum</a></li>
					<li><a href="#">Pellent eget ma</a></li>
					<li><a href="#">Terdum quis</a></li>
					<li><a href="#">Venenatis libero</a></li>
					<li><a href="#">Tempor metus </a></li>
				</ul>
			</div>
			<div class="flex-columns fifth-column">
				<h3>Customer Support</h3>
				<p>For questions on your products, coaching, or events please contact Customer Support.</p>
				<a href="#" class="btn cta-primary">Customer Support</a>
				<h3>Media Inquiries</h3>
				<p>Robbins Research International, Inc. has a dedicated media department. Members of the press are welcome to contact us regarding any of the Tony Robbins Companies.</p>
				<a href="#" class="btn cta-secoundry">Media Inquiries</a>
			</div>
		</div>
		<div  class="site-footer">
			© 2020 Robbins Research International, Inc. All rights reserved.
		</div>
		<?php // get_template_part( 'template-parts/footer/info' ); ?>
	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
