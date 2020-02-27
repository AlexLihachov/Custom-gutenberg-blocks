/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
import {i18n} from '../../constants';

export const schema = {
	row_data: {
		type: 'array',
		default: [
			{
				sub_title: __('Sub title', i18n),
				description: __('Description', i18n),
				reverse: '',
				sliders: [
					{
						name: __('Name Sliders', i18n),
						url: '',
						id: ''
					}
				]
			},
			{
				sub_title: __('Sub title', i18n),
				description: __('Description', i18n),
				name: __('Name Sliders', i18n),
				reverse: 'reverse',
				sliders: [
					{
						name: __('Name Sliders', i18n),
						url: '',
						id: ''
					}
				]

			},
			{
				sub_title: __('Sub title', i18n),
				description: __('Description', i18n),
				name: __('Name Sliders', i18n),
				reverse: '',
				sliders: [
					{
						name: __('Name Sliders', i18n),
						url: '',
						id: ''
					},
					{
						name: __('Name Sliders', i18n),
						url: '',
						id: ''
					}
				]
			}
		],

	},
	settings: {
		type: 'object',
		default: {
			arrows: true,
			dots: true,
			responsive: [
				{
					breakpoint: 768,
					settings: {
						arrows: false
					}
				}
			]
		}
	}

};

export default schema;
