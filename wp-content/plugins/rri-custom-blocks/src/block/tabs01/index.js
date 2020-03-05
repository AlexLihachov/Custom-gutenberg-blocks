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
import {ContainerIcon} from '../../icons';

export const name = 'rri/tabs01';

export const settings = {
	title: __('Tabs 01', i18n),
	description: __('Tabs', i18n),
	icon: ContainerIcon,
	category: 'rri-blocks',
	keywords: [
		__('Tabs', i18n),
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
