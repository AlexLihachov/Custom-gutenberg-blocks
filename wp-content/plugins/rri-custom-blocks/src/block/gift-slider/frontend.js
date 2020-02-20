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

			let slideCount = 0;
			let slides = null;

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
				console.log(slick);
				let prevSlide = null;
				let nextSlide = null;

				slideCount = slick.slideCount;
				slides = jQuery('.slick-slide');

				console.log(slick.currentSlide + 1);

				if (slick.currentSlide + 1 === slideCount) {
					nextSlide = slides.eq(0);
				} else {
					nextSlide = slides.eq(slick.currentSlide + 1);
				}

				console.log(slides.eq(slick.currentSlide + 1));

				if (slick.currentSlide - 1 < 0) {
					prevSlide = slides.eq(slideCount - 1);
				} else {
					prevSlide = slides.eq(slick.currentSlide - 1);
				}

				nextSlide.addClass('is-next');
				prevSlide.addClass('is-prev');

				// animatedSlide();
				// jQuery('.slick-active').prev().removeClass('is-next').addClass('is-prev');
				// jQuery('.slick-active').next().removeClass('is-prev').addClass('is-next');
			});

			jQuery(this).slick(settings);

			jQuery(this).on('swipe', function (event, slick, currentSlide, direction) {
				// animatedSlide();
			});

			jQuery('.rri-gift-prev').on('click', function () {
				// animatedSlide();
			});

			jQuery('.rri-gift-next').on('click', function () {
				// animatedSlide();
			});

			jQuery(this).on('afterChange', function (event, slick, currentSlide) {
				// jQuery(".slick-active").prev().removeClass('is-next').addClass('is-prev');
				// jQuery(".slick-active").next().removeClass('is-prev').addClass('is-next');
			});

			jQuery(this).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
				// console.log(currentSlide, nextSlide);
				// removeAnimatedSlide();
			});
		});
	}
});
