/**
 * BLOCK: Generic Slider.
 */

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';

/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
import {i18n} from '../../constants';

/**
 * External dependencies
 */
import {SliderIcon} from '../../icons';

export const schema = {
	slidesData: {
		type: 'array',
		default: [
			{
				title: '',
				quote: '',
				author: '',
				image: {
					url: '',
					id: ''
				}
			}
		]
	},

	settings: {
		type: 'object',
		default: {
			infinite: true,
			adaptiveHeight: true,
			autoplay: false,
			autoplaySpeed: 0,
			speed: 300,
			slidesToShow: 1
		}
	}
};

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
