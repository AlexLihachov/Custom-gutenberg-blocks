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
			},
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
			},
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
			infinite: true,
			verticalSwiping: true
		}
	},
	// Above Title
	abovetitleTag: {
		type: 'string',
		default: 'h3',
	},
	abovetitleColor: {
		type: 'string',
		default: '#191919'
	},
	abovetitleFontSize: {
		type: 'number',
		default: ''
	},
	abovetitleFontSizeUnit: {
		type: 'string',
		default: ''
	},
	abovetitleFontWeight: {
		type: 'string',
		default: ''
	},
	abovetitleTextTransform: {
		type: 'string',
		default: ''
	},
	abovetitleLineHeight: {
		type: 'number',
		default: ''
	},
	abovetitleLineHeightUnit: {
		type: 'string',
		default: ''
	},
	abovetitleLetterSpacing: {
		type: 'number',
		default: ''
	},
	abovetitleTabletFontSize: {
		type: 'number',
		default: ''
	},
	abovetitleTabletFontSizeUnit: {
		type: 'string',
		default: ''
	},
	abovetitleTabletLineHeight: {
		type: 'number',
		default: ''
	},
	abovetitleTabletLineHeightUnit: {
		type: 'string',
		default: ''
	},
	abovetitleMobileFontSize: {
		type: 'number',
		default: ''
	},
	abovetitleMobileFontSizeUnit: {
		type: 'string',
		default: ''
	},
	abovetitleMobileLineHeight: {
		type: 'number',
		default: ''
	},
	abovetitleMobileLineHeightUnit: {
		type: 'string',
		default: ''
	},
	// Title
	titleTag: {
		type: 'string',
		default: 'h2'
	},
	titleColor: {
		type: 'string',
		default: '#fff'
	},
	titleFontSize: {
		type: 'number',
		default: ''
	},
	titleFontSizeUnit: {
		type: 'string',
		default: ''
	},
	titleFontWeight: {
		type: 'string',
		default: ''
	},
	titleTextTransform: {
		type: 'string',
		default: ''
	},
	titleLineHeight: {
		type: 'number',
		default: ''
	},
	titleLineHeightUnit: {
		type: 'string',
		default: ''
	},
	titleLetterSpacing: {
		type: 'number',
		default: ''
	},
	titleTabletFontSize: {
		type: 'number',
		default: ''
	},
	titleTabletFontSizeUnit: {
		type: 'string',
		default: ''
	},
	titleTabletLineHeight: {
		type: 'number',
		default: ''
	},
	titleTabletLineHeightUnit: {
		type: 'string',
		default: ''
	},
	titleMobileFontSize: {
		type: 'number',
		default: ''
	},
	titleMobileFontSizeUnit: {
		type: 'string',
		default: ''
	},
	titleMobileLineHeight: {
		type: 'number',
		default: ''
	},
	titleMobileLineHeightUnit: {
		type: 'string',
		default: ''
	},
	//Number
	numberColor: {
		type: 'string',
		default: '#191919'
	},
	numberFontSize: {
		type: 'number',
		default: ''
	},
	numberFontSizeUnit: {
		type: 'string',
		default: ''
	},
	numberFontWeight: {
		type: 'string',
		default: ''
	},
	numberTextTransform: {
		type: 'string',
		default: ''
	},
	numberLineHeight: {
		type: 'number',
		default: ''
	},
	numberLineHeightUnit: {
		type: 'string',
		default: ''
	},
	numberLetterSpacing: {
		type: 'number',
		default: ''
	},
	numberTabletFontSize: {
		type: 'number',
		default: ''
	},
	numberTabletFontSizeUnit: {
		type: 'string',
		default: ''
	},
	numberTabletLineHeight: {
		type: 'number',
		default: ''
	},
	numberTabletLineHeightUnit: {
		type: 'string',
		default: ''
	},
	numberMobileFontSize: {
		type: 'number',
		default: ''
	},
	numberMobileFontSizeUnit: {
		type: 'string',
		default: ''
	},
	numberMobileLineHeight: {
		type: 'number',
		default: ''
	},
	numberMobileLineHeightUnit: {
		type: 'string',
		default: ''
	}
};

export default schema;
