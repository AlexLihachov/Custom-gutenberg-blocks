/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';

domReady(() => {
	const $sliders = jQuery('.rri-generic-slider');

	if (typeof jQuery.fn.slick === 'function' && $sliders.length) {
		$sliders.each(function (i, item) {
			jQuery(item).find('.rri-generic-slider__inner').slick({
				adaptiveHeight: true
			});
		});
	}
});
