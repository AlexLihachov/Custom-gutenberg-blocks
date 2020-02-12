/**
 * BLOCK: Generic Slider.
 */

/**
 * Internal dependencies
 */
import './design'
import deprecated from './deprecated'
import edit from './edit'
import save from './save'

/**
 * External dependencies
 */
import {
	createBackgroundAttributes,
	createTypographyAttributes,
	createResponsiveAttributes,
	createAllCombinationAttributes,
	createImageAttributes,
	createImageBackgroundAttributes,
} from '../../util';

/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
import {addFilter, applyFilters} from '@wordpress/hooks';
import {i18n} from '../../constants';

export const schema = {
	slides: {
		type: 'number',
		default: 1,
	},

	// Title
	...createAllCombinationAttributes(
		'title%s', {
			type: 'string',
			source: 'html',
			selector: '.rri-generic-slide%d .rri-generic-slide__titles',
			default: __('Title', i18n),
		},
		['1']
	),

	// Quote
	...createAllCombinationAttributes(
		'quote%s', {
			type: 'string',
			source: 'html',
			selector: '.rri-generic-slide%d blockquote',
			default: __('Quote', i18n),
		},
		['1']
	),

	// Author
	...createAllCombinationAttributes(
		'author%s', {
			type: 'string',
			source: 'html',
			selector: '.rri-generic-slide%d .rri-generic-slide__author',
			default: __('Author', i18n),
		},
		['1']
	),

	// Image.
	...createImageAttributes('image%s', {
		exclude: [
			'Url',
			'Id',
			'Alt',
			'BlendMode',
		],
	}),

	...createImageBackgroundAttributes('image%s'),
	imageSize: {
		type: 'string',
		default: 'large',
	},

	...createAllCombinationAttributes(
		'image%s%s', {
			type: 'number',
			default: '',
		},
		['1'],
		['Id', 'FullWidth', 'FullHeight']
	),

	...createAllCombinationAttributes(
		'image%s%s', {
			type: 'string',
			default: '',
		},
		['1'],
		['Url', 'FullUrl']
	),
};

export const name = 'rri/generic-slider';

export const settings = {
	title: __('Generic slider', i18n),
	description: __('Slick generic slider', i18n),
	// icon: 'dashicons-admin-media',
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
	// deprecated,
	edit,
	save,

	// Stackable modules.
	modules: {
		'advanced-general': true,
		'advanced-block-spacing': true,
		// Just in premium version
		'advanced-responsive': true,
	}
};
