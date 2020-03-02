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
import {ImageBoxIcon} from '../../icons';

export const name = 'rri/gallery01';

export const settings = {
	title: __('Gallery 01', i18n),
	description: __('Gallery', i18n),
	icon: ImageBoxIcon,
	category: 'rri-blocks',
	keywords: [
		__('Image', i18n),
		__('Gallery', i18n),
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
