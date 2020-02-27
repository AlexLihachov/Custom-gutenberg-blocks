/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';

domReady(() => {
	const $sliders = jQuery('.rri-image-text-grid');

	if (typeof jQuery.fn.slick === 'function' && $sliders.length) {
		$sliders.each(function (i, item) {
			jQuery(item).find('.rri-grid-block__slider').not('.slick-initialized').slick({
				dots: true,
				responsive: [
					{
						breakpoint: 768,
						settings: {
							arrows: false
						}
					}
				]
			});

		});
	}
});
