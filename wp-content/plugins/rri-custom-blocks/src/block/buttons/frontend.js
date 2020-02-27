/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';

domReady(() => {

    jQuery(window).resize(function(){
        jQuery('.rri-buttons__item-container').each(function(){
            const width              = jQuery(this).parent().width();
            const widthChild         = jQuery(this).width();
            const widthChildSiblings = jQuery(this).siblings().width();
            const widthSum           = widthChild + widthChildSiblings + 20;
            if(width < widthSum){
                jQuery(this).next().css({
                    "margin-left" : "0",
                    "margin-top"  : "20px"
                });
            }else {
                jQuery(this).next().css({
                    "margin-left" : "20px",
                    "margin-top"  : "0"
                });
            }

        });
    });

});
