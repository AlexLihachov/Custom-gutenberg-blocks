/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';

domReady(() => {

    const element = document.querySelector('.rri-number-counter__container');

    let isEvent = false;

    if(element){
        let Visible = function(target){
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

                jQuery('.rri-number-counter__element').each(function(){
                    let i               = 1;
                    let _this           = jQuery(this);
                    const count         = _this.data('count');
                    const time          = 100;
                    const initialOffset = _this.data('initialoffset');

                    let interval = setInterval(function(event){
                        _this.find('.rri-number-counter__count-text').text(i);
                        if(i == count){
                            clearInterval(interval);
                            return;
                        }
                        _this.find('.rri-number-counter__count-circle').css('stroke-dashoffset', initialOffset - ((i + 1) * (initialOffset / time)));
                        i++;
                    }, 100);
                });
                isEvent = true;
            }
        };

        window.addEventListener('scroll', function(){
            if(!isEvent){
                Visible(element);
            }

        });

        Visible(element);
    }

});
