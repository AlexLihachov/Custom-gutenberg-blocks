/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';

domReady(() => {
	let gallery01 = jQuery(".rri-gallery01")
	gallery01.map((elem, index) =>{
		let load_more = jQuery(index).find(".rri-gallery01__load-more");
		let elems = jQuery(index).find(".rri-gallery01-block");
		elems.slice(0, 9).show();
		load_more.on("click", function (e) {
			e.preventDefault();
			jQuery(index).find(".rri-gallery01-block:hidden").slice(0, 2).slideDown();
			if (jQuery(index).find(".rri-gallery01-block:hidden").length === 0) {
				load_more.fadeOut('slow');
			}
		})
	})

});
