var frontend_blocks =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 441);
/******/ })
/************************************************************************/
/******/ ({

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = domReady;
/**
 * @typedef {() => void} Callback
 *
 * TODO: Remove this typedef and inline `() => void` type.
 *
 * This typedef is used so that a descriptive type is provided in our
 * automatically generated documentation.
 *
 * An in-line type `() => void` would be preferable, but the generated
 * documentation is `null` in that case.
 *
 * @see https://github.com/WordPress/gutenberg/issues/18045
 */

/**
 * Specify a function to execute when the DOM is fully loaded.
 *
 * @param {Callback} callback A function to execute after the DOM is ready.
 *
 * @example
 * ```js
 * import domReady from '@wordpress/dom-ready';
 *
 * domReady( function() {
 * 	//do something after DOM loads.
 * } );
 * ```
 *
 * @return {void}
 */
function domReady(callback) {
  if (document.readyState === 'complete' || // DOMContentLoaded + Images/Styles/etc loaded, so we call directly.
  document.readyState === 'interactive' // DOMContentLoaded fires at this point, so we call directly.
  ) {
      return void callback();
    } // DOMContentLoaded has not fired yet, delay callback until then.


  document.addEventListener('DOMContentLoaded', callback);
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 441:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfill__ = __webpack_require__(442);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfill___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__polyfill__);
/**
 * All frontend scripts required by our blocks should be included here.
 *
 * This is the file that Webpack is compiling into blocks.frontend.build.js
 */

/**
 * Internal dependencies
 */


var context = __webpack_require__(443); // Import.


context.keys().forEach(function (key) {
  return context(key);
});

/***/ }),

/***/ 442:
/***/ (function(module, exports) {

/**
 * Polyfills used.
 */
// Nodelist forEach polyfill.
if (window.NodeList && !window.NodeList.prototype.forEach) {
  window.NodeList.prototype.forEach = Array.prototype.forEach;
}

/***/ }),

/***/ 443:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./accordion/frontend.js": 444,
	"./buttons/frontend.js": 445,
	"./gallery01/frontend.js": 446,
	"./generic-slider/frontend.js": 447,
	"./gift-slider/frontend.js": 448,
	"./hero-slider/frontend.js": 449,
	"./image-text-grid/frontend.js": 450,
	"./number-counter/frontend.js": 451,
	"./two-tone-text/frontend.js": 452,
	"./video-popup/frontend.js": 453
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 443;

/***/ }),

/***/ 444:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initAll", function() { return initAll; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__wordpress_dom_ready__ = __webpack_require__(16);
/**
 * WordPress dependencies
 */


var toggleAccordion = function toggleAccordion(el) {
  el.classList.toggle('rri-accordion--open');
  el.setAttribute('aria-expanded', el.classList.contains('rri-accordion--open') ? 'true' : 'false'); // Close other adjacent accordions if needed.

  if (el.classList.contains('rri-accordion--single-open')) {
    var adjacent = el.nextElementSibling;

    while (adjacent && adjacent.classList.contains('rri-accordion')) {
      forceCloseAccordion(adjacent);
      adjacent = adjacent.nextElementSibling;
    }

    adjacent = el.previousElementSibling;

    while (adjacent && adjacent.classList.contains('rri-accordion')) {
      forceCloseAccordion(adjacent);
      adjacent = adjacent.previousElementSibling;
    }
  }
};

var forceCloseAccordion = function forceCloseAccordion(el) {
  if (el.classList.contains('rri-accordion--design-plain')) {
    return;
  }

  el.classList.remove('rri-accordion--open');
  el.setAttribute('aria-expanded', 'false');
};

var detectMaxHeight = function detectMaxHeight(el) {
  var isOpen = el.classList.contains('rri-accordion--open'); // Open the accordion if needed.

  if (!isOpen) {
    el.style.display = 'none';
    el.classList.toggle('rri-accordion--open');
    el.style.display = '';
  } // Get the height in its open state.


  var contentHeight = el.querySelector('.rri-accordion__text, .rri-accordion__content').clientHeight; // Bring back the previous state.

  if (!isOpen) {
    el.style.display = 'none';
    el.classList.toggle('rri-accordion--open');
    el.style.display = '';
  } // Set the max height that we'll use


  el.style.setProperty('--max-height', "".concat(contentHeight + 50, "px"));
};

var instanceID = 1;

var init = function init(el) {
  // Set our max-height variable.
  detectMaxHeight(el);
  var a = el.querySelector('.rri-accordion__heading');
  a.addEventListener('click', function (ev) {
    ev.preventDefault();
    toggleAccordion(el);
  });
  a.addEventListener('keypress', function (ev) {
    ev.preventDefault();
    toggleAccordion(el);
  }); // Accessibility: https://www.w3.org/TR/wai-aria-practices/examples/accordion/accordion.html

  var heading = el.querySelector('.rri-accordion__heading h4, .rri-accordion__title');
  var content = el.querySelector('.rri-accordion__text, .rri-accordion__content');
  heading.setAttribute('id', "rri-accordion-".concat(instanceID, "__heading"));
  content.setAttribute('id', "rri-accordion-".concat(instanceID, "__content"));
  heading.setAttribute('aria-controls', "rri-accordion-".concat(instanceID, "__content"));
  content.setAttribute('aria-labelledby', "rri-accordion-".concat(instanceID, "__heading"));
  instanceID++;
};

var initAll = function initAll() {
  document.querySelectorAll('.rri-accordion:not(.rri-accordion--design-plain)').forEach(function (el) {
    return init(el);
  });
};
Object(__WEBPACK_IMPORTED_MODULE_0__wordpress_dom_ready__["a" /* default */])(initAll);

/***/ }),

/***/ 445:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__wordpress_dom_ready__ = __webpack_require__(16);
/**
 * WordPress dependencies
 */

Object(__WEBPACK_IMPORTED_MODULE_0__wordpress_dom_ready__["a" /* default */])(function () {
  jQuery(window).resize(function () {
    jQuery('.rri-buttons__item-container').each(function () {
      var width = jQuery(this).parent().width();
      var widthChild = jQuery(this).width();
      var widthChildSiblings = jQuery(this).siblings().width();
      var widthSum = widthChild + widthChildSiblings + 20;

      if (width < widthSum) {
        jQuery(this).next().css({
          "margin-left": "0",
          "margin-top": "20px"
        });
      } else {
        jQuery(this).next().css({
          "margin-left": "20px",
          "margin-top": "0"
        });
      }
    });
  });
});

/***/ }),

/***/ 446:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__wordpress_dom_ready__ = __webpack_require__(16);
/**
 * WordPress dependencies
 */

Object(__WEBPACK_IMPORTED_MODULE_0__wordpress_dom_ready__["a" /* default */])(function () {
  var load_more = jQuery(".rri-gallery01__load-more");
  var elems = jQuery(".rri-gallery01-block");
  console.log(elems);
  elems.slice(0, 9).show();
  load_more.on("click", function (e) {
    e.preventDefault();
    jQuery(".rri-gallery01-block:hidden").slice(0, 4).slideDown();

    if (jQuery(".rri-gallery01-block:hidden").length === 0) {
      load_more.fadeOut('slow');
    }
  });
});

/***/ }),

/***/ 447:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__wordpress_dom_ready__ = __webpack_require__(16);
/**
 * WordPress dependencies
 */

Object(__WEBPACK_IMPORTED_MODULE_0__wordpress_dom_ready__["a" /* default */])(function () {
  var $sliders = jQuery('.rri-generic-slider');

  if (typeof jQuery.fn.slick === 'function' && $sliders.length) {
    $sliders.each(function (i, item) {
      var settings = jQuery(this).data('settings');
      jQuery(item).find('.rri-generic-slider__inner').slick(settings);
    });
  }
});

/***/ }),

/***/ 448:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__wordpress_dom_ready__ = __webpack_require__(16);
/**
 * WordPress dependencies
 */

Object(__WEBPACK_IMPORTED_MODULE_0__wordpress_dom_ready__["a" /* default */])(function () {
  var $sliders = jQuery('.rri-gift-slider__inner');

  if (typeof jQuery.fn.slick === 'function' && $sliders.length) {
    $sliders.each(function (i, item) {
      var settings = Object.assign({}, jQuery(this).data('settings'), {
        prevArrow: jQuery('.rri-gift-prev'),
        nextArrow: jQuery('.rri-gift-next')
      });

      var animatedSlide = function animatedSlide(element) {
        element.find('.rri-gift-slide__above-title').addClass('animated');
        element.find('.rri-gift-slide__title').addClass('animated');
        element.find('.rri-gift-slide__number').addClass('animated');
        element.find('.rri-gift-slide__image').addClass('animated');
      };

      var removeAnimatedSlide = function removeAnimatedSlide(element) {
        element.find('.rri-gift-slide__above-title').removeClass('animated');
        element.find('.rri-gift-slide__title').removeClass('animated');
        element.find('.rri-gift-slide__number').removeClass('animated');
        element.find('.rri-gift-slide__image').removeClass('animated');
      };

      var toggleSlidesClasses = function toggleSlidesClasses(currentSlideIndex, slides) {
        var slideCount = slides.length;
        var nextSlideIndex, prevSlideIndex;

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
          var slideIndex = jQuery(item).data('slick-index');
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
          var slideIndex = jQuery(item).data('slick-index');

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

/***/ }),

/***/ 449:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__wordpress_dom_ready__ = __webpack_require__(16);
/**
 * WordPress dependencies
 */

Object(__WEBPACK_IMPORTED_MODULE_0__wordpress_dom_ready__["a" /* default */])(function () {
  var $sliders = jQuery('.rri-hero-slider__wrapper');

  if (typeof jQuery.fn.slick === 'function' && $sliders.length) {
    $sliders.each(function (i, item) {
      var settings = Object.assign({}, jQuery(this).data('settings'), {
        prevArrow: jQuery(item).find('.rri-hero-slider__arrow--prev'),
        nextArrow: jQuery(item).find('.rri-hero-slider__arrow--next')
      });
      jQuery(item).find('.rri-hero-slider__inner').slick(settings);
    });
  }
});

/***/ }),

/***/ 450:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__wordpress_dom_ready__ = __webpack_require__(16);
/**
 * WordPress dependencies
 */

Object(__WEBPACK_IMPORTED_MODULE_0__wordpress_dom_ready__["a" /* default */])(function () {
  var $sliders = jQuery('.rri-image-text-grid');

  if (typeof jQuery.fn.slick === 'function' && $sliders.length) {
    $sliders.each(function (i, item) {
      jQuery(item).find('.rri-grid-block__slider').not('.slick-initialized').slick({
        dots: true,
        responsive: [{
          breakpoint: 768,
          settings: {
            arrows: false
          }
        }]
      });
    });
  }
});

/***/ }),

/***/ 451:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__wordpress_dom_ready__ = __webpack_require__(16);
/**
 * WordPress dependencies
 */

Object(__WEBPACK_IMPORTED_MODULE_0__wordpress_dom_ready__["a" /* default */])(function () {
  var element = document.querySelector('.rri-number-counter__container');
  var isEvent = false;

  if (element) {
    var Visible = function Visible(target) {
      var targetPosition = {
        top: window.pageYOffset + target.getBoundingClientRect().top,
        left: window.pageXOffset + target.getBoundingClientRect().left,
        right: window.pageXOffset + target.getBoundingClientRect().right,
        bottom: window.pageYOffset + target.getBoundingClientRect().bottom
      },
          windowPosition = {
        top: window.pageYOffset,
        left: window.pageXOffset,
        right: window.pageXOffset + document.documentElement.clientWidth,
        bottom: window.pageYOffset + document.documentElement.clientHeight
      };

      if (targetPosition.bottom > windowPosition.top && targetPosition.top < windowPosition.bottom && targetPosition.right > windowPosition.left && targetPosition.left < windowPosition.right) {
        jQuery('.rri-number-counter__element').each(function () {
          var i = 1;

          var _this = jQuery(this);

          var count = _this.data('count');

          var time = 100;

          var initialOffset = _this.data('initialoffset');

          var interval = setInterval(function (event) {
            _this.find('.rri-number-counter__count-text').text(i);

            if (i == count) {
              clearInterval(interval);
              return;
            }

            _this.find('.rri-number-counter__count-circle').css('stroke-dashoffset', initialOffset - (i + 1) * (initialOffset / time));

            i++;
          }, 100);
        });
        isEvent = true;
      }
    };

    window.addEventListener('scroll', function () {
      if (!isEvent) {
        Visible(element);
      }
    });
    Visible(element);
  }
});

/***/ }),

/***/ 452:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__wordpress_dom_ready__ = __webpack_require__(16);
/**
 * WordPress dependencies
 */

Object(__WEBPACK_IMPORTED_MODULE_0__wordpress_dom_ready__["a" /* default */])(function () {
  jQuery('.js-parallax').addClass('is-show');
  var element = document.querySelector('.rri-two-tone-text');

  if (element) {
    var width = element.dataset.width;
    var widthSecond = (100 - width) / 2;
    jQuery('.rri-two-tone-text__third').css("width", widthSecond + "%");
    jQuery('.rri-two-tone-text__third-main').css("width", width + "%");

    var Visible = function Visible(target) {
      var firstLine = document.querySelectorAll('.rri-two-tone-text__first-line');
      var secondLine = document.querySelectorAll('.rri-two-tone-text__second-line');
      var speed = target.dataset.speed;
      var targetPosition = {
        top: window.pageYOffset + target.getBoundingClientRect().top,
        left: window.pageXOffset + target.getBoundingClientRect().left,
        right: window.pageXOffset + target.getBoundingClientRect().right,
        bottom: window.pageYOffset + target.getBoundingClientRect().bottom
      },
          windowPosition = {
        top: window.pageYOffset,
        left: window.pageXOffset,
        right: window.pageXOffset + document.documentElement.clientWidth,
        bottom: window.pageYOffset + document.documentElement.clientHeight
      };

      if (targetPosition.bottom > windowPosition.top && targetPosition.top < windowPosition.bottom && targetPosition.right > windowPosition.left && targetPosition.left < windowPosition.right) {
        var opera = navigator.userAgent.toLowerCase().indexOf('opera') > -1,
            html = document.documentElement,
            body = document.body,
            headerScreen = document.compatMode == 'CSS1Compat' && !opera ? html.clientHeight : body.clientHeight;
        headerScreen = headerScreen / 2;
        var scroller = window.pageXOffset - target.getBoundingClientRect().top + headerScreen;
        scroller = speed * scroller / 10000;
        firstLine[0].style.transform = "translate3d(" + scroller + "px, 0px, 0px)";
        firstLine[1].style.transform = "translate3d(" + scroller + "px, 0px, 0px)";
        secondLine[0].style.transform = "translate3d(-" + scroller + "px, 0px, 0px)";
        secondLine[1].style.transform = "translate3d(-" + scroller + "px, 0px, 0px)";
      }
    };

    window.addEventListener('scroll', function () {
      Visible(element);
    });
    Visible(element);
  }
});

/***/ }),

/***/ 453:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bigpicture__ = __webpack_require__(454);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bigpicture___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_bigpicture__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__wordpress_dom_ready__ = __webpack_require__(16);
/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */


Object(__WEBPACK_IMPORTED_MODULE_1__wordpress_dom_ready__["a" /* default */])(function () {
  var elems = document.querySelectorAll('.rri-video-popup[data-video], .rri-video-popup [data-video]');

  var openVideo = function openVideo(el) {
    if (__WEBPACK_IMPORTED_MODULE_0_bigpicture___default.a) {
      var videoID = el.getAttribute('data-video');
      var args = {
        el: el,
        noLoader: true
      };

      if (videoID.match(/^\d+$/g)) {
        args.vimeoSrc = videoID;
      } else if (videoID.match(/^https?:\/\//g)) {
        args.vidSrc = videoID;
      } else {
        args.ytSrc = videoID;
      }

      __WEBPACK_IMPORTED_MODULE_0_bigpicture___default()(args);
    }
  };

  elems.forEach(function (el) {
    var a = el.querySelector('a');
    a.addEventListener('click', function (ev) {
      ev.preventDefault();
      openVideo(el);
    });
    a.addEventListener('touchend', function (ev) {
      ev.preventDefault();
      openVideo(el);
    });
  });
});

/***/ }),

/***/ 454:
/***/ (function(module, exports) {

// BigPicture.js | license MIT | henrygd.me/bigpicture

// trigger element used to open popup
var el;

// set to true after first interaction
var initialized;

// container element holding html needed for script
var container;

// currently active display element (image, video, youtube / vimeo iframe container)
var displayElement;

// popup image element
var displayImage;

// popup video element
var displayVideo;

// popup audio element
var displayAudio;

// container element to hold youtube / vimeo iframe
var iframeContainer;

// iframe to hold youtube / vimeo player
var iframeSiteVid;

// store requested image source
var imgSrc;

// button that closes the container
var closeButton;

// youtube / vimeo video id
var siteVidID;

// keeps track of loading icon display state
var isLoading;

// timeout to check video status while loading
var checkMediaTimeout;

// loading icon element
var loadingIcon;

// caption element
var caption;

// caption content element
var captionText;

// store caption content
var captionContent;

// hide caption button element
var captionHideButton;

// open state for container element
var isOpen;

// gallery open state
var galleryOpen;

// used during close animation to avoid triggering timeout twice
var isClosing;

// array of prev viewed image urls to check if cached before showing loading icon
var imgCache = [];

// store whether image requested is remote or local
var remoteImage;

// store animation opening callbacks
var animationStart;
var animationEnd;

// store changeGalleryImage callback
var onChangeImage;

// gallery left / right icons
var rightArrowBtn;

var leftArrowBtn;

// position of gallery
var galleryPosition;

// hold active gallery els / image src
var galleryEls;

// counter element
var galleryCounter;

// store images in gallery that are being loaded
var preloadedImages = {};

// whether device supports touch events
var supportsTouch;

// options object
var opts;

// Save bytes in the minified version
var appendEl = 'appendChild';
var createEl = 'createElement';
var removeEl = 'removeChild';

function BigPicture (options) {
	// initialize called on initial open to create elements / style / event handlers
	initialized || initialize();

	// clear currently loading stuff
	if (isLoading) {
		clearTimeout(checkMediaTimeout);
		removeContainer();
	}

	opts = options;

	// store video id if youtube / vimeo video is requested
	siteVidID = options.ytSrc || options.vimeoSrc;

	// store optional callbacks
	animationStart = options.animationStart;
	animationEnd = options.animationEnd;
	onChangeImage = options.onChangeImage;

	// set trigger element
	el = options.el;

	// wipe existing remoteImage state
	remoteImage = false;

	// set caption if provided
	captionContent = el.getAttribute('data-caption');

	if (options.gallery) {
		makeGallery(options.gallery, options.position);
	} else if (siteVidID || options.iframeSrc) {
		// if vimeo, youtube, or iframe video
		// toggleLoadingIcon(true)
		displayElement = iframeContainer;
		createIframe();
	} else if (options.imgSrc) {
		// if remote image
		remoteImage = true;
		imgSrc = options.imgSrc;
		!~imgCache.indexOf(imgSrc) && toggleLoadingIcon(true);
		displayElement = displayImage;
		displayElement.src = imgSrc;
	} else if (options.audio) {
		// if direct video link
		toggleLoadingIcon(true);
		displayElement = displayAudio;
		displayElement.src = options.audio;
		checkMedia('audio file');
	} else if (options.vidSrc) {
		// if direct video link
		toggleLoadingIcon(true);
		makeVidSrc(options.vidSrc);
		checkMedia('video');
	} else {
		// local image / background image already loaded on page
		displayElement = displayImage;
		// get img source or element background image
		displayElement.src =
			el.tagName === 'IMG'
				? el.src
				: window
						.getComputedStyle(el)
						.backgroundImage.replace(/^url|[(|)|'|"]/g, '');
	}

	// add container to page
	container[appendEl](displayElement);
	document.body[appendEl](container);
}

// create all needed methods / store dom elements on first use
function initialize() {
	var startX;
	// return close button elements
	function createCloseButton(className) {
		var el = document[createEl]('button');
		el.className = className;
		el.innerHTML =
			'<svg viewBox="0 0 48 48"><path d="M28 24L47 5a3 3 0 1 0-4-4L24 20 5 1a3 3 0 1 0-4 4l19 19L1 43a3 3 0 1 0 4 4l19-19 19 19a3 3 0 0 0 4 0v-4L28 24z"/></svg>';
		return el
	}

	function createArrowSymbol(direction, style) {
		var el = document[createEl]('button');
		el.className = 'bp-lr';
		el.innerHTML =
			'<svg viewBox="0 0 129 129" height="70" fill="#fff"><path d="M88.6 121.3c.8.8 1.8 1.2 2.9 1.2s2.1-.4 2.9-1.2a4.1 4.1 0 0 0 0-5.8l-51-51 51-51a4.1 4.1 0 0 0-5.8-5.8l-54 53.9a4.1 4.1 0 0 0 0 5.8l54 53.9z"/></svg>';
		changeCSS(el, style);
		el.onclick = function (e) {
			e.stopPropagation();
			updateGallery(direction);
		};
		return el
	}

	// add style - if you want to tweak, run through beautifier
	var style = document[createEl]('STYLE');
	style.innerHTML =
		'#bp_caption,#bp_container{bottom:0;left:0;right:0;position:fixed;opacity:0}#bp_container>*,#bp_loader{position:absolute;right:0;z-index:10}#bp_container,#bp_caption,#bp_container svg{pointer-events:none}#bp_container{top:0;z-index:9999;background:rgba(0,0,0,.7);opacity:0;transition:opacity .35s}#bp_loader{top:0;left:0;bottom:0;display:flex;align-items:center;cursor:wait;background:0;z-index:9}#bp_loader svg{width:50%;max-width:300px;max-height:50%;margin:auto;animation:bpturn 1s infinite linear}#bp_aud,#bp_container img,#bp_sv,#bp_vid{user-select:none;max-height:96%;max-width:96%;top:0;bottom:0;left:0;margin:auto;box-shadow:0 0 3em rgba(0,0,0,.4);z-index:-1}#bp_sv{background:#111}#bp_sv svg{width:66px}#bp_caption{font-size:.9em;padding:1.3em;background:rgba(15,15,15,.94);color:#fff;text-align:center;transition:opacity .3s}#bp_aud{width:650px;top:calc(50% - 20px);bottom:auto;box-shadow:none}#bp_count{left:0;right:auto;padding:14px;color:rgba(255,255,255,.7);font-size:22px;cursor:default}#bp_container button{position:absolute;border:0;outline:0;background:0;cursor:pointer;transition:all .1s}#bp_container>.bp-x{padding:0;height:41px;width:41px;border-radius:100%;top:8px;right:14px;opacity:.8;line-height:1}#bp_container>.bp-x:focus,#bp_container>.bp-x:hover{background:rgba(255,255,255,.2)}.bp-x svg,.bp-xc svg{height:21px;width:20px;fill:#fff;vertical-align:top;}.bp-xc svg{width:16px}#bp_container .bp-xc{left:2%;bottom:100%;padding:9px 20px 7px;background:#d04444;border-radius:2px 2px 0 0;opacity:.85}#bp_container .bp-xc:focus,#bp_container .bp-xc:hover{opacity:1}.bp-lr{top:50%;top:calc(50% - 130px);padding:99px 0;width:6%;background:0;border:0;opacity:.4;transition:opacity .1s}.bp-lr:focus,.bp-lr:hover{opacity:.8}@keyframes bpf{50%{transform:translatex(15px)}100%{transform:none}}@keyframes bpl{50%{transform:translatex(-15px)}100%{transform:none}}@keyframes bpfl{0%{opacity:0;transform:translatex(70px)}100%{opacity:1;transform:none}}@keyframes bpfr{0%{opacity:0;transform:translatex(-70px)}100%{opacity:1;transform:none}}@keyframes bpfol{0%{opacity:1;transform:none}100%{opacity:0;transform:translatex(-70px)}}@keyframes bpfor{0%{opacity:1;transform:none}100%{opacity:0;transform:translatex(70px)}}@keyframes bpturn{0%{transform:none}100%{transform:rotate(360deg)}}@media (max-width:600px){.bp-lr{font-size:15vw}}';
	document.head[appendEl](style);

	// create container element
	container = document[createEl]('DIV');
	container.id = 'bp_container';
	container.onclick = close;
	closeButton = createCloseButton('bp-x');
	container[appendEl](closeButton);
	// gallery swipe listeners
	if ('ontouchstart' in window) {
		supportsTouch = true;
		container.ontouchstart = function (ref) {
			var changedTouches = ref.changedTouches;

			startX = changedTouches[0].pageX;
		};
		container.ontouchmove = function (e) {
			e.preventDefault();
		};
		container.ontouchend = function (ref) {
			var changedTouches = ref.changedTouches;

			if (!galleryOpen) {
				return
			}
			var distX = changedTouches[0].pageX - startX;
			// swipe right
			distX < -30 && updateGallery(1);
			// swipe left
			distX > 30 && updateGallery(-1);
		};
	}

	// create display image element
	displayImage = document[createEl]('IMG');

	// create display video element
	displayVideo = document[createEl]('VIDEO');
	displayVideo.id = 'bp_vid';
	displayVideo.setAttribute('playsinline', true);
	displayVideo.controls = true;
	displayVideo.loop = true;

	// create audio element
	displayAudio = document[createEl]('audio');
	displayAudio.id = 'bp_aud';
	displayAudio.controls = true;
	displayAudio.loop = true;

	// create gallery counter
	galleryCounter = document[createEl]('span');
	galleryCounter.id = 'bp_count';

	// create caption elements
	caption = document[createEl]('DIV');
	caption.id = 'bp_caption';
	captionHideButton = createCloseButton('bp-xc');
	captionHideButton.onclick = toggleCaption.bind(null, false);
	caption[appendEl](captionHideButton);
	captionText = document[createEl]('SPAN');
	caption[appendEl](captionText);
	container[appendEl](caption);

	// left / right arrow icons
	rightArrowBtn = createArrowSymbol(1, 'transform:scalex(-1)');
	leftArrowBtn = createArrowSymbol(-1, 'left:0;right:auto');

	// create loading icon element
	loadingIcon = document[createEl]('DIV');
	loadingIcon.id = 'bp_loader';
	loadingIcon.innerHTML =
		'<svg viewbox="0 0 32 32" fill="#fff" opacity=".8"><path d="M16 0a16 16 0 0 0 0 32 16 16 0 0 0 0-32m0 4a12 12 0 0 1 0 24 12 12 0 0 1 0-24" fill="#000" opacity=".5"/><path d="M16 0a16 16 0 0 1 16 16h-4A12 12 0 0 0 16 4z"/></svg>';
	// create youtube / vimeo container
	iframeContainer = document[createEl]('DIV');
	iframeContainer.id = 'bp_sv';

	// create iframe to hold youtube / vimeo player
	iframeSiteVid = document[createEl]('IFRAME');
	iframeSiteVid.setAttribute('allowfullscreen', true);
	iframeSiteVid.allow = 'autoplay; fullscreen';
	iframeSiteVid.onload = function () { return iframeContainer[removeEl](loadingIcon); };
	changeCSS(
		iframeSiteVid,
		'border:0;position:absolute;height:100%;width:100%;left:0;top:0'
	);
	iframeContainer[appendEl](iframeSiteVid);

	// display image bindings for image load and error
	displayImage.onload = open;
	displayImage.onerror = open.bind(null, 'image');

	window.addEventListener('resize', function () {
		// adjust loader position on window resize
		galleryOpen || (isLoading && toggleLoadingIcon(true));
		// adjust iframe dimensions
		displayElement === iframeContainer && updateIframeDimensions();
	});

	// close container on escape key press and arrow buttons for gallery
	document.addEventListener('keyup', function (ref) {
		var keyCode = ref.keyCode;

		keyCode === 27 && isOpen && close(container);
		if (galleryOpen) {
			keyCode === 39 && updateGallery(1);
			keyCode === 37 && updateGallery(-1);
			keyCode === 38 && updateGallery(10);
			keyCode === 40 && updateGallery(-10);
		}
	});
	// prevent scrolling with arrow keys if gallery open
	document.addEventListener('keydown', function (e) {
		var usedKeys = [37, 38, 39, 40];
		if (galleryOpen && ~usedKeys.indexOf(e.keyCode)) {
			e.preventDefault();
		}
	});

	// trap focus within conainer while open
	document.addEventListener(
		'focus',
		function (e) {
			if (isOpen && !container.contains(e.target)) {
				e.stopPropagation();
				closeButton.focus();
			}
		},
		true
	);

	// all done
	initialized = true;
}

// return transform style to make full size display el match trigger el size
function getRect() {
	var ref = el.getBoundingClientRect();
	var top = ref.top;
	var left = ref.left;
	var width = ref.width;
	var height = ref.height;
	var leftOffset = left - (container.clientWidth - width) / 2;
	var centerTop = top - (container.clientHeight - height) / 2;
	var scaleWidth = el.clientWidth / displayElement.clientWidth;
	var scaleHeight = el.clientHeight / displayElement.clientHeight;
	return ("transform:translate3D(" + leftOffset + "px, " + centerTop + "px, 0) scale3D(" + scaleWidth + ", " + scaleHeight + ", 0)")
}

function makeVidSrc(source) {
	if (Array.isArray(source)) {
		displayElement = displayVideo.cloneNode();
		source.forEach(function (src) {
			var source = document[createEl]('SOURCE');
			source.src = src;
			source.type = "video/" + (src.match(/.(\w+)$/)[1]);
			displayElement[appendEl](source);
		});
	} else {
		displayElement = displayVideo;
		displayElement.src = source;
	}
}

function makeGallery(gallery, position) {
	if (Array.isArray(gallery)) {
		// is array of images
		galleryPosition = position || 0;
		galleryEls = gallery;
		captionContent = gallery[galleryPosition].caption;
	} else {
		// is element selector or nodelist
		galleryEls = [].slice.call(
			typeof gallery === 'string'
				? document.querySelectorAll((gallery + " [data-bp]"))
				: gallery
		);
		// find initial gallery position
		var elIndex = galleryEls.indexOf(el);
		galleryPosition =
			position === 0 || position ? position : elIndex !== -1 ? elIndex : 0;
		// make gallery object w/ els / src / caption
		galleryEls = galleryEls.map(function (el) { return ({
			el: el,
			src: el.getAttribute('data-bp'),
			caption: el.getAttribute('data-caption'),
		}); });
	}
	// show loading icon if needed
	remoteImage = true;
	// set initial src to imgSrc so it will be cached in open func
	imgSrc = galleryEls[galleryPosition].src;
	!~imgCache.indexOf(imgSrc) && toggleLoadingIcon(true);
	if (galleryEls.length > 1) {
		// if length is greater than one, add gallery stuff
		container[appendEl](galleryCounter);
		galleryCounter.innerHTML = (galleryPosition + 1) + "/" + (galleryEls.length);
		if (!supportsTouch) {
			// add arrows if device doesn't support touch
			container[appendEl](rightArrowBtn);
			container[appendEl](leftArrowBtn);
		}
	} else {
		// gallery is one, just show without clutter
		galleryEls = false;
	}
	displayElement = displayImage;
	// set initial image src
	displayElement.src = imgSrc;
}

function updateGallery(movement) {
	var galleryLength = galleryEls.length - 1;

	// only allow one change at a time
	if (isLoading) {
		return
	}

	// return if requesting out of range image
	var isEnd =
		(movement > 0 && galleryPosition === galleryLength) ||
		(movement < 0 && !galleryPosition);
	if (isEnd) {
		// if beginning or end of gallery, run end animation
		if (!opts.loop) {
			changeCSS(displayImage, '');
			setTimeout(
				changeCSS,
				9,
				displayImage,
				("animation:" + (movement > 0 ? 'bpl' : 'bpf') + " .3s;transition:transform .35s")
			);
			return
		}
		// if gallery is looped, adjust position to beginning / end
		galleryPosition = movement > 0 ? -1 : galleryLength + 1;
	}

	// normalize position
	galleryPosition = Math.max(
		0,
		Math.min(galleryPosition + movement, galleryLength)
	)

	// load images before and after for quicker scrolling through pictures
	;[galleryPosition - 1, galleryPosition, galleryPosition + 1].forEach(
		function (position) {
			// normalize position
			position = Math.max(0, Math.min(position, galleryLength));
			// cancel if image has already been preloaded
			if (preloadedImages[position]) { return }
			var src = galleryEls[position].src;
			// create image for preloadedImages
			var img = document[createEl]('IMG');
			img.addEventListener('load', addToImgCache.bind(null, src));
			img.src = src;
			preloadedImages[position] = img;
		}
	);
	// if image is loaded, show it
	if (preloadedImages[galleryPosition].complete) {
		return changeGalleryImage(movement)
	}
	// if not, show loading icon and change when loaded
	isLoading = true;
	changeCSS(loadingIcon, 'opacity:.4;');
	container[appendEl](loadingIcon);
	preloadedImages[galleryPosition].onload = function () {
		galleryOpen && changeGalleryImage(movement);
	};
	// if error, store error object in el array
	preloadedImages[galleryPosition].onerror = function () {
		galleryEls[galleryPosition] = {
			error: 'Error loading image',
		};
		galleryOpen && changeGalleryImage(movement);
	};
}

function changeGalleryImage(movement) {
	if (isLoading) {
		container[removeEl](loadingIcon);
		isLoading = false;
	}
	var activeEl = galleryEls[galleryPosition];
	if (activeEl.error) {
		// show alert if error
		alert(activeEl.error);
	} else {
		// add new image, animate images in and out w/ css animation
		var oldimg = container.querySelector('img:last-of-type');
		displayImage = displayElement = preloadedImages[galleryPosition];
		changeCSS(
			displayImage,
			("animation:" + (movement > 0 ? 'bpfl' : 'bpfr') + " .35s;transition:transform .35s")
		);
		changeCSS(oldimg, ("animation:" + (movement > 0 ? 'bpfol' : 'bpfor') + " .35s both"));
		container[appendEl](displayImage);
		// update el for closing animation
		if (activeEl.el) {
			el = activeEl.el;
		}
	}
	// update counter
	galleryCounter.innerHTML = (galleryPosition + 1) + "/" + (galleryEls.length);
	// show / hide caption
	toggleCaption(galleryEls[galleryPosition].caption);
	// execute onChangeImage callback
	onChangeImage && onChangeImage([displayImage, galleryEls[galleryPosition]]);
}

// create video iframe
function createIframe() {
	var url;
	var prefix = 'https://';
	var suffix = 'autoplay=1';

	// create appropriate url
	if (opts.ytSrc) {
		url = prefix + "www.youtube.com/embed/" + siteVidID + "?html5=1&rel=0&playsinline=1&" + suffix;
	} else if (opts.vimeoSrc) {
		url = prefix + "player.vimeo.com/video/" + siteVidID + "?" + suffix;
	} else if (opts.iframeSrc) {
		url = opts.iframeSrc;
	}

	// add loading spinner to iframe container
	changeCSS(loadingIcon, '');
	iframeContainer[appendEl](loadingIcon);

	// set iframe src to url
	iframeSiteVid.src = url;

	updateIframeDimensions();

	setTimeout(open, 9);
}

function updateIframeDimensions() {
	var height;
	var width;

	// handle height / width / aspect / max width for iframe
	var windowHeight = window.innerHeight * 0.95;
	var windowWidth = window.innerWidth * 0.95;
	var windowAspect = windowHeight / windowWidth;

	var ref = opts.dimensions || [1920, 1080];
	var dimensionWidth = ref[0];
	var dimensionHeight = ref[1];

	var iframeAspect = dimensionHeight / dimensionWidth;

	if (iframeAspect > windowAspect) {
		height = Math.min(dimensionHeight, windowHeight);
		width = height / iframeAspect;
	} else {
		width = Math.min(dimensionWidth, windowWidth);
		height = width * iframeAspect;
	}

	iframeContainer.style.cssText += "width:" + width + "px;height:" + height + "px;";
}

// timeout to check video status while loading
function checkMedia(errMsg) {
	if (~[1, 4].indexOf(displayElement.readyState)) {
		open();
		// short timeout to to make sure controls show in safari 11
		setTimeout(function () {
			displayElement.play();
		}, 99);
	} else if (displayElement.error) {
		open(errMsg);
	} else {
		checkMediaTimeout = setTimeout(checkMedia, 35, errMsg);
	}
}

// hide / show loading icon
function toggleLoadingIcon(bool) {
	// don't show loading icon if noLoader is specified
	if (opts.noLoader) {
		return
	}
	// bool is true if we want to show icon, false if we want to remove
	// change style to match trigger element dimensions if we want to show
	bool &&
		changeCSS(
			loadingIcon,
			("top:" + (el.offsetTop) + "px;left:" + (el.offsetLeft) + "px;height:" + (el.clientHeight) + "px;width:" + (el.clientWidth) + "px")
		);
	// add or remove loader from DOM
	el.parentElement[bool ? appendEl : removeEl](loadingIcon);
	isLoading = bool;
}

// hide & show caption
function toggleCaption(captionContent) {
	if (captionContent) {
		captionText.innerHTML = captionContent;
	}
	changeCSS(
		caption,
		("opacity:" + (captionContent ? "1;pointer-events:auto" : '0'))
	);
}

function addToImgCache(url) {
	!~imgCache.indexOf(url) && imgCache.push(url);
}

// animate open of image / video; display caption if needed
function open(err) {
	// hide loading spinner
	isLoading && toggleLoadingIcon();

	// execute animationStart callback
	animationStart && animationStart();

	// check if we have an error string instead of normal event
	if (typeof err === 'string') {
		removeContainer();
		return opts.onError
			? opts.onError()
			: alert(("Error: The requested " + err + " could not be loaded."))
	}

	// if remote image is loaded, add url to imgCache array
	remoteImage && addToImgCache(imgSrc);

	// transform displayEl to match trigger el
	displayElement.style.cssText += getRect();

	// fade in container
	changeCSS(container, "opacity:1;pointer-events:auto");

	// set animationEnd callback to run after animation ends (cleared if container closed)
	animationEnd = setTimeout(animationEnd, 410);

	isOpen = true;

	galleryOpen = !!galleryEls;

	// enlarge displayEl, fade in caption if hasCaption
	setTimeout(function () {
		displayElement.style.cssText += 'transition:transform .35s;transform:none';
		captionContent && setTimeout(toggleCaption, 250, captionContent);
	}, 60);
}

// close active display element
function close(e) {
	var target = e.target;
	var clickEls = [
		caption,
		captionHideButton,
		displayVideo,
		displayAudio,
		captionText,
		leftArrowBtn,
		rightArrowBtn,
		loadingIcon ];

	// blur to hide close button focus style
	target && target.blur();

	// don't close if one of the clickEls was clicked or container is already closing
	if (isClosing || ~clickEls.indexOf(target)) {
		return
	}

	// animate closing
	displayElement.style.cssText += getRect();
	changeCSS(container, 'pointer-events:auto');

	// timeout to remove els from dom; use variable to avoid calling more than once
	setTimeout(removeContainer, 350);

	// clear animationEnd timeout
	clearTimeout(animationEnd);

	isOpen = false;
	isClosing = true;
}

// remove container / display element from the DOM
function removeContainer() {
	// clear src of displayElement (or iframe if display el is iframe container)
	// needs to be done before removing container in IE
	var srcEl =
		displayElement === iframeContainer ? iframeSiteVid : displayElement;
	srcEl.removeAttribute('src');

	// remove container from DOM & clear inline style
	document.body[removeEl](container);
	container[removeEl](displayElement);
	changeCSS(container, '');
	changeCSS(displayElement, '');

	// remove caption
	toggleCaption(false);

	if (galleryOpen) {
		// remove all gallery stuff
		var images = container.querySelectorAll('img');
		for (var i = 0; i < images.length; i++) {
			container[removeEl](images[i]);
		}
		isLoading && container[removeEl](loadingIcon);
		container[removeEl](galleryCounter);
		galleryOpen = galleryEls = false;
		preloadedImages = {};
		supportsTouch || container[removeEl](rightArrowBtn);
		supportsTouch || container[removeEl](leftArrowBtn);
		// in case displayimage changed, we need to update event listeners
		displayImage.onload = open;
		displayImage.onerror = open.bind(null, 'image');
	}

	// run close callback
	opts.onClose && opts.onClose();

	isClosing = isLoading = false;
}

// style helper functions
function changeCSS(ref, newStyle) {
	var style = ref.style;

	style.cssText = newStyle;
}

module.exports = BigPicture;


/***/ })

/******/ });
//# sourceMappingURL=frontend_blocks.js.map