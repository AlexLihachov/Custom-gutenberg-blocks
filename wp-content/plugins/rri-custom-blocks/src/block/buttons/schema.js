/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
import {i18n} from '../../constants';
import {
    createAllCombinationAttributes,
    createBackgroundAttributes,
    createImageAttributes,
    createImageBackgroundAttributes, createResponsiveAttributes, createTypographyAttributes
} from "../../util";

export const schema = {
    buttons : {
        type    : 'array',
        default : [
            {
                url      : '',
                newTab   : false,
                noFollow : false,
                text     : 'Link',
                design   : 'primary',
                size     : 'small'
            }
        ]
    },

};


export default schema;
