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
				title: '',
				copy: '',
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
					text: '',
					design: 'primary',
					size: 'small',
					iconToggle: false,
				}
			},
			{
				title: '',
				copy: '',
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
					text: '',
					design: 'primary',
					size: 'small',
					iconToggle: false,
				}
			},
			{
				title: '',
				copy: '',
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
					text: '',
					design: 'primary',
					size: 'small',
					iconToggle: false,
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
			pauseOnFocus: false,
			pauseOnHover: false,
			accessibility: false,
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
