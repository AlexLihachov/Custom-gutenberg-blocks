/**
 * BLOCK: Buttons.
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
import {ButtonIcon} from '../../icons';

export const name = 'rri/buttons';

export const settings = {
    title       : __('Buttons', i18n),
    description : __('Buttons', i18n),
    icon        : ButtonIcon,
    category    : 'rri-blocks',
    keywords    : [
        __('Buttons', i18n)
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
        // 'advanced-responsive'    : true,
    }
};
