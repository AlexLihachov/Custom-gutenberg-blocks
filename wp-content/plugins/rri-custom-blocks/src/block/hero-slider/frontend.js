/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';

domReady(() => {
	const $sliders = jQuery('.rri-hero-slider__wrapper');

	if (typeof jQuery.fn.slick === 'function' && $sliders.length) {
		$sliders.each(function (i, item) {
			const settings = Object.assign(
				{},
				jQuery(this).data('settings'),
				{
					prevArrow: jQuery(item).find('.rri-hero-slider__arrow--prev'),
					nextArrow: jQuery(item).find('.rri-hero-slider__arrow--next')
				});

			jQuery(item).find('.rri-hero-slider__inner').slick(settings);
		});
	}
});
