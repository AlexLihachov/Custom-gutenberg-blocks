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
				above_title: __('Above title', i18n),
				name: __('Name', i18n),
				number: __('Number', i18n),
				image: {
					url: '',
					id: ''
				},
				link: {
					url: '',
					newTab: false,
					noFollow: false,
					text: 'Learn more'

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
			autoplaySpeed: 0,
			autoplay: false
		}
	}
};

export default schema;
