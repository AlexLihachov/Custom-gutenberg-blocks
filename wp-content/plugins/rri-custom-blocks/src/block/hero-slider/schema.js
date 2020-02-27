/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
import {i18n} from '../../constants';

export const schema = {
	slides_data: {
		type: 'array',
		default: [
			{
				title: __('Lorem et dolor ipsum', i18n),
				copy: __('Lorem ipsum dolor sit amet, consectetur adipiscing elit aenean vehicula lacus sit amet fringilla.', i18n),
				image: {
					url: 'https://local.test.com/wp-content/uploads/2020/02/Image.png',
					id: ''
				},
				params: {
					align: 'left'
				},
				button: {
					url: '',
					newTab: false,
					noFollow: false,
					text: 'Link',
					design: 'primary',
					size: 'small'
				}
			},
			{
				title: __('Lorem et dolor ipsum 2', i18n),
				copy: __('Lorem ipsum dolor sit amet, consectetur adipiscing elit aenean vehicula lacus sit amet fringilla.', i18n),
				image: {
					url: 'https://local.test.com/wp-content/uploads/2020/02/Image.png',
					id: ''
				},
				params: {
					align: 'left'
				},
				button: {
					url: '',
					newTab: false,
					noFollow: false,
					text: 'Link',
					design: 'primary',
					size: 'small'
				}
			},
			{
				title: __('Lorem et dolor ipsum 3', i18n),
				copy: __('Lorem ipsum dolor sit amet, consectetur adipiscing elit aenean vehicula lacus sit amet fringilla.', i18n),
				image: {
					url: 'https://local.test.com/wp-content/uploads/2020/02/Image.png',
					id: ''
				},
				params: {
					align: 'left'
				},
				button: {
					url: '',
					newTab: false,
					noFollow: false,
					text: 'Link',
					design: 'primary',
					size: 'small'
				}
			}
		],
	},
	settings: {
		type: 'object',
		default: {
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: false,
			autoplaySpeed: 0,
			autoplay: false,
			speed: 300,
			dots: true,
			arrows: true,
			responsive: [
				{
					breakpoint: 768,
					settings: {
						dots: true,
						arrows: false
					}
				}
			]
		}
	},
	hideControls: {
		type: 'boolean',
		default: false
	}
};

export default schema;
