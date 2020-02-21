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

			const animatedSlide = (element) => {
				element.find('.rri-gift-slide__above-title').addClass('animated');
				element.find('.rri-gift-slide__title').addClass('animated');
				element.find('.rri-gift-slide__number').addClass('animated');
				element.find('.rri-gift-slide__image').addClass('animated');
			};

			const removeAnimatedSlide = (element) => {
				element.find('.rri-gift-slide__above-title').removeClass('animated');
				element.find('.rri-gift-slide__title').removeClass('animated');
				element.find('.rri-gift-slide__number').removeClass('animated');
				element.find('.rri-gift-slide__image').removeClass('animated');
			};

			const toggleSlidesClasses = (currentSlideIndex, slides) => {
				let slideCount = slides.length;
				let nextSlideIndex, prevSlideIndex;

				if (currentSlideIndex + 1 === slideCount) {
					nextSlideIndex = 0;
				} else {
					nextSlideIndex = currentSlideIndex + 1;
				}


				if (currentSlideIndex - 1 < 0) {
					prevSlideIndex = slideCount - 1;
				} else {
					prevSlideIndex = currentSlideIndex - 1;
				}

				slides.each(function (index, item) {
					const slideIndex = jQuery(item).data('slick-index');
					jQuery(item).removeClass('is-prev').removeClass('is-next');

					if (slideIndex === prevSlideIndex) {
						jQuery(item).addClass('is-prev');
					} else if (slideIndex === nextSlideIndex) {
						jQuery(item).addClass('is-next');
					}
				});
			};

			jQuery(this).on('init', function (event, slick) {
				if (slick.slideCount <= 1) {
					return;
				}

				toggleSlidesClasses(slick.currentSlide, slick.$slides);
			});

			jQuery(this).slick(settings);

			jQuery(this).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
				slick.$slides.each(function (index, item) {
					const slideIndex = jQuery(item).data('slick-index');

					if (slideIndex === currentSlide) {
						removeAnimatedSlide(jQuery(item));
					} else if (slideIndex === nextSlide) {
						animatedSlide(jQuery(item));
					}
				});
			});

			jQuery(this).on('afterChange', function (event, slick, currentSlide) {
				toggleSlidesClasses(currentSlide, slick.$slides);
			});
		});
	}
});
