/**
 * BLOCK: Video Popup Block.
 */

/**
 * External dependencies
 */
import {VideoPopupIcon} from '../../icons';
import {createBackgroundAttributes, createResponsiveAttributes} from '../../util';

/**
 * Internal dependencies
 */
import './design';
import deprecated from './deprecated';
import edit from './edit';
import save from './save';

/**
 * WordPress dependencies
 */
import {applyFilters} from '@wordpress/hooks';
import {__} from '@wordpress/i18n';
import {i18n} from '../../constants';

export const schema = {
	videoLink: {
		type: 'string',
	},
	videoID: {
		type: 'string',
		source: 'attribute',
		selector: '[data-video]',
		attribute: 'data-video',
	},

	...createResponsiveAttributes( '%sWidth', {
		type: 'number',
		default: '',
	} ),
	...createResponsiveAttributes( '%sHeight', {
		type: 'number',
		default: '',
	} ),
	borderRadius: {
		type: 'number',
		default: '',
	},
	shadow: {
		type: 'number',
		default: '',
	},

	playButtonType: {
		type: 'string',
		default: 'normal',
	},
	playButtonColor: {
		type: 'string',
	},
	playButtonSize: {
		type: 'number',
		default: '',
	},
	playButtonOpacity: {
		type: 'number',
		default: '',
	},

	...createBackgroundAttributes( 'preview%s' ),
	previewBackgroundColor: {
		type: 'string',
		default: '#000000',
	},

	previewBackgroundMediaUrl: {
		type: 'string',
		default: `${window.rriData.srcUrl}/src/block/video-popup/images/Video-popup-placeholder.jpg`
	},

	hoverEffect: {
		type: 'string',
		default: '',
	},
};

export const name = 'rri/video-popup';

export const settings = {
	title: __( 'Video Popup', i18n ),
	description: __( 'Display a large thumbnail that your users can click to play a video full-screen. Great for introductory or tutorial videos.', i18n ),
	icon: VideoPopupIcon,
	category: 'rri-blocks',
	keywords: [
		__( 'Video Popup', i18n )
	],
	attributes: schema,
	supports: {
		anchor: true,
		align: [ 'center', 'wide', 'full' ],
		inserter: true,
	},

	deprecated,
	edit,
	save,

	// Stackable modules.
	modules: {
		'advanced-general': true,
		'advanced-block-spacing': true,
		// Just in premium version
		// 'advanced-column-spacing': true,
		// 'advanced-responsive': true,
		'block-background': true,
		'block-separators': true,
		'block-title': true,
		// 'content-align': true,
		'block-designs': true,
		// Hide as premium feature
		// 'custom-css': {
		// 	default: applyFilters( 'stackable.video-popup.custom-css.default', '' ),
		// },
	},
};
