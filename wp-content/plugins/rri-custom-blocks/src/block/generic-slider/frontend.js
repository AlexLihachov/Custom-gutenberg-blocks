/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';

domReady(() => {
	const $sliders = jQuery('.rri-generic-slider');

	if (typeof jQuery.fn.slick === 'function' && $sliders.length) {
		$sliders.each(function (i, item) {
			const settings = Object.assign(
				{},
				jQuery(this).data('settings'),
				{
					accessibility: true,
					touchMove: true,
					swipe: true,
					prevArrow: jQuery(item).find('.rri-generic-slider__arrow--left'),
					nextArrow: jQuery(item).find('.rri-generic-slider__arrow--right'),
				}
			);
			jQuery(item).find('.rri-generic-slider__inner').slick(settings);
		});
	}
});
