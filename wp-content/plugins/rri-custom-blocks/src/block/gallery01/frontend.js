/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';

domReady(() => {
	let load_more = jQuery(".rri-gallery01__load-more");
	let elems = jQuery(".rri-gallery01-block");
	console.log(elems)
	elems.slice(0, 9).show();
	load_more.on("click", function (e) {
		e.preventDefault();
		jQuery(".rri-gallery01-block:hidden").slice(0, 4).slideDown();
		if (jQuery(".rri-gallery01-block:hidden").length === 0) {
			load_more.fadeOut('slow');
		}
	})
});
