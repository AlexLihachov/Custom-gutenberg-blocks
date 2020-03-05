/**
 * BLOCK: Generic Slider.
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
import {SliderIcon} from '../../icons';

export const name = 'rri/generic-slider';

export const settings = {
	title: __('Generic slider', i18n),
	description: __('Slick generic slider', i18n),
	icon: SliderIcon,
	category: 'rri-blocks',
	keywords: [
		__('Slider', i18n),
		__('Slick', i18n),
		__('RRI', i18n)
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
		// 'advanced-responsive': true,
	}
};
