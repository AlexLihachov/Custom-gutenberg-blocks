/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';

domReady(() => {
	const $sliders = jQuery('.rri-generic-slider');

	if (typeof jQuery.fn.slick === 'function' && $sliders.length) {
		$sliders.each(function (i, item) {
			const settings = jQuery(this).data('settings');
			jQuery(item).find('.rri-generic-slider__inner').slick(settings);
		});
	}
});
