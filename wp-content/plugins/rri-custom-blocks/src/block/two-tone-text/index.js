/**
 * BLOCK: Two-Tone Text.
 */

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import schema from "./schema";

/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
import {i18n} from '../../constants';

/**
 * External dependencies
 */
import {TwoToneIcon} from '../../icons';

export const name = 'rri/two-tone-text';

export const settings = {
    title       : __('Two-Tone Text', i18n),
    description : __('There is an image in the middle, text on either side of the image that moves on scroll, and that changes color as the text hovers over the image', i18n),
    icon        : TwoToneIcon,
    category    : 'rri-blocks',
    keywords    : [
        __('Two-Tone Text', i18n)
    ],
    supports    : {
        anchor   : true,
        align    : ['center', 'wide', 'full'],
        inserter : true,
    },
    attributes  : schema,
    edit,
    save,

    // Stackable modules.
    modules : {
        'advanced-general'       : true,
        'advanced-block-spacing' : true,
        // Just in premium version
        'advanced-responsive'    : true,
    }
};
