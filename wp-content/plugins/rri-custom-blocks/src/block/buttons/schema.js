/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
import {i18n} from '../../constants';

export const schema = {
    buttons : {
        type    : 'object',
        default : {
            buttons  : __('Link', i18n),
            link       : {
                url      : '',
                newTab   : false,
                noFollow : false,
                text     : 'Link'
            }
        }
    },

// Buttons

    buttonColor                : {
        type    : 'string',
        default :
            '#000'
    }

};


export default schema;
