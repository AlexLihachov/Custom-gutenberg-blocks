/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
import {i18n} from '../../constants';

export const schema = {
	twoTone: {
		type: 'object',
		default: {
			titleleft: __('Title left', i18n),
			titleright: __('Title right', i18n),
			image: {
				url: '',
				id: ''
			},
			link: {
				url: '',
				newTab: false,
				noFollow: false,
				text: 'Link'
			}
		}
	},

	settings: {
		type: 'object',
		default: {
			speed: 2000,
		}
	},


	titleleftTag: {
		type: 'string',
		default:
			'h3',
	}
	,
	titleleftColor: {
		type: 'string',
		default:
			'#000'
	}
	,
	titleleftFontSize: {
		type: 'number',
		default:
			''
	}
	,
	titleleftFontSizeUnit: {
		type: 'string',
		default:
			''
	}
	,
	titleleftFontWeight: {
		type: 'string',
		default:
			''
	}
	,
	titleleftTextTransform: {
		type: 'string',
		default:
			''
	}
	,
	titleleftLineHeight: {
		type: 'number',
		default:
			''
	}
	,
	titleleftLineHeightUnit: {
		type: 'string',
		default:
			''
	}
	,
	titleleftLetterSpacing: {
		type: 'number',
		default:
			''
	}
	,
	titleleftTabletFontSize: {
		type: 'number',
		default:
			''
	}
	,
	titleleftTabletFontSizeUnit: {
		type: 'string',
		default:
			''
	}
	,
	titleleftTabletLineHeight: {
		type: 'number',
		default:
			''
	}
	,
	titleleftTabletLineHeightUnit: {
		type: 'string',
		default:
			''
	}
	,
	titleleftMobileFontSize: {
		type: 'number',
		default:
			''
	}
	,
	titleleftMobileFontSizeUnit: {
		type: 'string',
		default:
			''
	}
	,
	titleleftMobileLineHeight: {
		type: 'number',
		default:
			''
	}
	,
	titleleftMobileLineHeightUnit: {
		type: 'string',
		default:
			''
	}
	,

	titlerightTag: {
		type: 'string',
		default:
			'h3'
	}
	,
	titlerightColor: {
		type: 'string',
		default:
			'#000'
	}
	,
	titlerightFontSize: {
		type: 'number',
		default:
			''
	}
	,
	titlerightFontSizeUnit: {
		type: 'string',
		default:
			''
	}
	,
	titlerightFontWeight: {
		type: 'string',
		default:
			''
	}
	,
	titlerightTextTransform: {
		type: 'string',
		default:
			''
	}
	,
	titlerightLineHeight: {
		type: 'number',
		default:
			''
	}
	,
	titlerightLineHeightUnit: {
		type: 'string',
		default:
			''
	}
	,
	titlerightLetterSpacing: {
		type: 'number',
		default:
			''
	}
	,
	titlerightTabletFontSize: {
		type: 'number',
		default:
			''
	}
	,
	titlerightTabletFontSizeUnit: {
		type: 'string',
		default:
			''
	}
	,
	titlerightTabletLineHeight: {
		type: 'number',
		default:
			''
	}
	,
	titlerightTabletLineHeightUnit: {
		type: 'string',
		default:
			''
	}
	,
	titlerightMobileFontSize: {
		type: 'number',
		default:
			''
	}
	,
	titlerightMobileFontSizeUnit: {
		type: 'string',
		default:
			''
	}
	,
	titlerightMobileLineHeight: {
		type: 'number',
		default:
			''
	}
	,
	titlerightMobileLineHeightUnit: {
		type: 'string',
		default:
			''
	}
};


export default schema;
