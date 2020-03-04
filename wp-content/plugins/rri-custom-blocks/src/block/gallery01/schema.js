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
				title: __('Lorem ipsum dolor sit amet', i18n),
				placeholder_title: __('Lorem ipsum dolor sit amet', i18n),
				description: "",
				placeholder_description: __('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla auctor enim in nisl dapibus pulvinar fusce luctus dolor vel purus volutpat rutrum. Phasellus vel eros vestibulum, efficitur odio.', i18n),
				load_more: __('Load more', i18n),
				open_lightbox: false,
				open_link: false,

			}

	},

	elem_data: {
		type: 'array',
		default: [
			{
				name: "",
				sub_title: "",
				description: "",
				placeholder_name: __('John Smith', i18n),
				placeholder_sub_title: __('Company Name, CEO', i18n),
				placeholder_description: __('“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla auctor enim in nisl dapibus pulvinar fusce luctus dolor…”', i18n),
				link: '',
				linkNewTab: false,
				url: `${window.rriData.srcUrl}/src/block/gallery01/images/1.jpg`,
				id: ''
			},
			{
				name: "",
				sub_title: "",
				description: "",
				placeholder_name: __('John Smith', i18n),
				placeholder_sub_title: __('Company Name, CEO', i18n),
				placeholder_description: __('“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla auctor enim in nisl dapibus pulvinar fusce luctus dolor…”', i18n),
				link: '',
				linkNewTab: false,
				url: `${window.rriData.srcUrl}/src/block/gallery01/images/2.png`,
				id: ''
			},
			{
				name: "",
				sub_title: "",
				description: "",
				placeholder_name: __('John Smith', i18n),
				placeholder_sub_title: __('Company Name, CEO', i18n),
				placeholder_description: __('“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla auctor enim in nisl dapibus pulvinar fusce luctus dolor…”', i18n),
				link: '',
				linkNewTab: false,
				url: `${window.rriData.srcUrl}/src/block/gallery01/images/4.jpg`,
				id: ''
			},
			{
				name: "",
				sub_title: "",
				description: "",
				placeholder_name: __('Jane Smith', i18n),
				placeholder_sub_title: __('Company Name, CEO', i18n),
				placeholder_description: __('“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla auctor enim in nisl dapibus pulvinar fusce luctus dolor…”', i18n),
				link: '',
				linkNewTab: false,
				url: `${window.rriData.srcUrl}/src/block/gallery01/images/3.png`,
				id: ''
			},
			{
				name: "",
				sub_title: "",
				description: "",
				placeholder_name: __('Jane Smith', i18n),
				placeholder_sub_title: __('Company Name, CEO', i18n),
				placeholder_description: __('“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla auctor enim in nisl dapibus pulvinar fusce luctus dolor…”', i18n),
				link: '',
				linkNewTab: false,
				url: `${window.rriData.srcUrl}/src/block/gallery01/images/5.jpg`,
				id: ''
			},
			{
				name: "",
				sub_title: "",
				description: "",
				placeholder_name: __('John Smith', i18n),
				placeholder_sub_title: __('Company Name, CEO', i18n),
				placeholder_description: __('“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla auctor enim in nisl dapibus pulvinar fusce luctus dolor…”', i18n),
				link: '',
				linkNewTab: false,
				url: `${window.rriData.srcUrl}/src/block/gallery01/images/6.jpg`,
				id: ''
			},
			{
				name: "",
				sub_title: "",
				description: "",
				placeholder_name: __('John Smith', i18n),
				placeholder_sub_title: __('Company Name, CEO', i18n),
				placeholder_description: __('“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla auctor enim in nisl dapibus pulvinar fusce luctus dolor…”', i18n),
				link: '',
				linkNewTab: false,
				url: `${window.rriData.srcUrl}/src/block/gallery01/images/7.jpg`,
				id: ''
			},
			{
				name: "",
				sub_title: "",
				description: "",
				placeholder_name: __('John Smith', i18n),
				placeholder_sub_title: __('Company Name, CEO', i18n),
				placeholder_description: __('“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla auctor enim in nisl dapibus pulvinar fusce luctus dolor…”', i18n),
				link: '',
				linkNewTab: false,
				url: `${window.rriData.srcUrl}/src/block/gallery01/images/8.jpg`,
				id: ''
			},
			{
				name: "",
				sub_title: "",
				description: "",
				placeholder_name: __('John Smith', i18n),
				placeholder_sub_title: __('Company Name, CEO', i18n),
				placeholder_description: __('“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla auctor enim in nisl dapibus pulvinar fusce luctus dolor…”', i18n),
				link: '',
				linkNewTab: false,
				url: `${window.rriData.srcUrl}/src/block/gallery01/images/9.jpg`,
				id: ''
			}
		],
	}


};

export default schema;
