/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';

domReady(() => {
	const $sliders = jQuery('.rri-gift-slider__inner');

	if (typeof jQuery.fn.slick === 'function' && $sliders.length) {
		$sliders.each(function (i, item) {
			const settings = Object.assign(
				{},
				jQuery(this).data('settings'),
				{
					prevArrow: jQuery('.rri-gift-prev'),
					nextArrow: jQuery('.rri-gift-next'),
				});

			const animatedSlide = () => {
				jQuery('.slick-current .rri-gift-slide__title').addClass('animated');
				jQuery('.slick-current .rri-gift-slide__above-title').addClass('animated');
				jQuery('.slick-current .rri-gift-slide__number').addClass('animated');
				jQuery('.slick-current .rri-gift-slide__image').addClass('animated');
			};

			const removeAnimatedSlide = () => {
				jQuery('.slick-current .rri-gift-slide__title').removeClass('animated');
				jQuery('.slick-current .rri-gift-slide__above-title').removeClass('animated');
				jQuery('.slick-current .rri-gift-slide__number').removeClass('animated');
				jQuery('.slick-current .rri-gift-slide__image').removeClass('animated');
			};

			jQuery(this).on('init', function (event, slick) {
				animatedSlide();
				jQuery('.slick-active').prev().removeClass('is-next').addClass('is-prev');
				jQuery('.slick-active').next().removeClass('is-prev').addClass('is-next');
			});

			jQuery(this).slick(settings);

			jQuery(this).on('swipe', function (event, slick, currentSlide, direction) {
				animatedSlide();
			});

			jQuery('.rri-gift-prev').on('click', function () {
				animatedSlide();
			});

			jQuery('.rri-gift-next').on('click', function () {
				animatedSlide();
			});

			jQuery(this).on('afterChange', function (event, slick, currentSlide, nextSlide) {
				jQuery(".slick-active").prev().removeClass('is-next').addClass('is-prev');
				jQuery(".slick-active").next().removeClass('is-prev').addClass('is-next');
			});

			jQuery(this).on('beforeChange', function () {
				removeAnimatedSlide();
			});
		});
	}
});
