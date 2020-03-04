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
					nextArrow: jQuery(item).find('.rri-hero-slider__arrow--next'),
					autoplay: true
				}
			);

			function addAnimations($slider) {
				$slider.find('.slick-current .rri-hero-slide__bg').addClass('animated');
				$slider.find('.slick-current .rri-hero-slide__title').addClass('animated');
				$slider.find('.slick-current .rri-hero-slide__copy').addClass('animated');
				$slider.find('.slick-current .rri-hero-slide__cta').addClass('animated');
			}

			function removeAnimation($slider) {
				$slider.find('.slick-current .rri-hero-slide__bg').removeClass('animated');
				$slider.find('.slick-current .rri-hero-slide__title').removeClass('animated');
				$slider.find('.slick-current .rri-hero-slide__copy').removeClass('animated');
				$slider.find('.slick-current .rri-hero-slide__cta').removeClass('animated');
			}

			// Init handler
			jQuery(item).on('init', function (slick) {
				addAnimations(jQuery(item));
			});

			// Setup
			jQuery(item).find('.rri-hero-slider__inner').slick(settings);

			// Change handlers
			jQuery(item).on('beforeChange', function (event, slick, currentSlide) {
				removeAnimation(jQuery(item));

			});

			jQuery(item).on('afterChange', function (event, slick, currentSlide) {
				addAnimations(jQuery(item));
			});
		});
	}
});
