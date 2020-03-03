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
				above_title: '',
				name: '',
				number: '',
				image: {
					url: '',
					id: ''
				},
				link: {
					url: '',
					newTab: false,
					noFollow: false,
					text: ''

				}
			}
		]
	},
	settings: {
		type: 'object',
		default: {
			vertical: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: false,
			verticalSwiping: true,
			touchMove: true,
			pauseOnFocus: false,
			pauseOnHover: false,
			autoplaySpeed: 0,
			autoplay: false,
			accessibility: false
		}
	}
};

export default schema;
