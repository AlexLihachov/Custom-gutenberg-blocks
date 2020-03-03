/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
import {i18n} from '../../constants';

export const schema = {
	header_data: {
		type: 'object',
		default:
			{
				title: __('Title', i18n),
				description: __('Description', i18n),
				load_more: __('Load more', i18n),
				open_lightbox: false,
				open_link: false,

			}

	},

	elem_data: {
		type: 'array',
		default: [
			{
				name: __('Name', i18n),
				sub_title: __('Company Name', i18n),
				description: __('Description', i18n),
				link: '',
				linkNewTab: false,
				url: '',
				id: ''
			},
			{
				name: __('Name', i18n),
				sub_title: __('Company Name', i18n),
				description: __('Description', i18n),
				link: '',
				linkNewTab: false,
				url: '',
				id: ''
			},
			{
				name: __('Name', i18n),
				sub_title: __('Company Name', i18n),
				description: __('Description', i18n),
				link: '',
				linkNewTab: false,
				url: '',
				id: ''
			},
			{
				name: __('Name', i18n),
				sub_title: __('Company Name', i18n),
				description: __('Description', i18n),
				link: '',
				linkNewTab: false,
				url: '',
				id: ''
			},
			{
				name: __('Name', i18n),
				sub_title: __('Company Name', i18n),
				description: __('Description', i18n),
				link: '',
				linkNewTab: false,
				url: '',
				id: ''
			},
			{
				name: __('Name', i18n),
				sub_title: __('Company Name', i18n),
				description: __('Description', i18n),
				link: '',
				linkNewTab: false,
				url: '',
				id: ''
			},
			{
				name: __('Name', i18n),
				sub_title: __('Company Name', i18n),
				description: __('Description', i18n),
				link: '',
				linkNewTab: false,
				url: '',
				id: ''
			},
			{
				name: __('Name', i18n),
				sub_title: __('Company Name', i18n),
				description: __('Description', i18n),
				link: '',
				linkNewTab: false,
				url: '',
				id: ''
			},
			{
				name: __('Name', i18n),
				sub_title: __('Company Name', i18n),
				description: __('Description', i18n),
				link: '',
				linkNewTab: false,
				url: '',
				id: ''
			}
		],
	}


};

export default schema;
