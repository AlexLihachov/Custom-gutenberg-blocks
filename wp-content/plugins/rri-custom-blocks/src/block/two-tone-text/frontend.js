/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';

domReady(() => {
    jQuery('.js-parallax').addClass('is-show');

    const element = document.querySelector('.rri-two-tone-text');


    if(element){

        const width = element.dataset.width;
        const widthSecond = (100 - width)/2;

        jQuery('.rri-two-tone-text__third').css("width", widthSecond + "%");
        jQuery('.rri-two-tone-text__third-main').css("width", width + "%");


        let Visible = function(target){
            let firstLine  = document.querySelectorAll('.rri-two-tone-text__first-line');
            let secondLine = document.querySelectorAll('.rri-two-tone-text__second-line');
            const speed    = target.dataset.speed;

            let targetPosition = {
                    top    : window.pageYOffset + target.getBoundingClientRect().top,
                    left   : window.pageXOffset + target.getBoundingClientRect().left,
                    right  : window.pageXOffset + target.getBoundingClientRect().right,
                    bottom : window.pageYOffset + target.getBoundingClientRect().bottom
                },

                windowPosition = {
                    top    : window.pageYOffset,
                    left   : window.pageXOffset,
                    right  : window.pageXOffset + document.documentElement.clientWidth,
                    bottom : window.pageYOffset + document.documentElement.clientHeight
                };

            if(targetPosition.bottom > windowPosition.top &&
                targetPosition.top < windowPosition.bottom &&
                targetPosition.right > windowPosition.left &&
                targetPosition.left < windowPosition.right){

                let opera        = (navigator.userAgent.toLowerCase().indexOf('opera') > -1),
                    html         = document.documentElement,
                    body         = document.body,
                    headerScreen = document.compatMode == 'CSS1Compat' && !opera ? html.clientHeight : body.clientHeight;
                headerScreen     = headerScreen / 2;

                let scroller = window.pageXOffset - target.getBoundingClientRect().top + headerScreen;

                scroller = (speed * scroller) / 10000;

                firstLine[0].style.transform  = "translate3d(" + scroller + "px, 0px, 0px)";
                firstLine[1].style.transform  = "translate3d(" + scroller + "px, 0px, 0px)";
                secondLine[0].style.transform = "translate3d(-" + scroller + "px, 0px, 0px)";
                secondLine[1].style.transform = "translate3d(-" + scroller + "px, 0px, 0px)";
            }
        };

        window.addEventListener('scroll', function(){
            Visible(element);
        });
        Visible(element);
    }

});
