/**
 * BLOCK: Gift Slider.
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
import {SliderIcon} from '../../icons';

export const name = 'rri/image-text-grid';

export const settings = {
	title: __('Image Text Grid', i18n),
	description: __('Image Text Grid', i18n),
	icon: SliderIcon,
	category: 'rri-blocks',
	keywords: [
		__('Image', i18n),
		__('Text', i18n),
		__('Grid', i18n),
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
	modules: {
		'advanced-general': true,
		'advanced-block-spacing': true,
	}
};
