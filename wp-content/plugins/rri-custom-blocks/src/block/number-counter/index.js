/**
 * BLOCK: Number counter.
 */

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import schema from './schema';

/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
import {i18n} from '../../constants';

/**
 * External dependencies
 */
import {NumberCounterIcon} from '../../icons';

export const name = 'rri/number-counter';

export const settings = {
    title: __('Number Counter', i18n),
    description: __('Number Counter', i18n),
    icon: NumberCounterIcon,
    category: 'rri-blocks',
    keywords: [
        __('Number Counter', i18n),
    ],
    supports: {
        anchor: true,
        align: ['center', 'wide', 'full'],
        inserter: true,
    },
    attributes: schema,
    edit,
    save,
    
    // Stackable modules.
    modules: {
        'advanced-general': true,
        'advanced-block-spacing': true,
        // Just in premium version
        'advanced-responsive': true,
    },
};
