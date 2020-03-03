/**
 * External dependencies
 */
import {createBackgroundStyleSet, __getValue} from '../../util';
import {hex_to_rgba} from "./util";
import deepmerge from 'deepmerge';

/**
 * Internal dependencies
 */
import {showOptions} from './util';

export const createStyles = props => {
	const getValue = __getValue(props.attributes);

	const show = showOptions(props);

	const {} = props.attributes;

	const styles = [];

	if (show.containerWidth) {
		styles.push({
			'.rri-video-popup__wrapper': {
				maxWidth: getValue('width') !== '' ? getValue('width', '%spx') : undefined,
			},
			tablet: {
				'.rri-video-popup__wrapper': {
					maxWidth: getValue('tabletWidth') !== '' ? getValue('tabletWidth', '%spx') : undefined,
				},
			},
			mobile: {
				'.rri-video-popup__wrapper': {
					maxWidth: getValue('mobileWidth') !== '' ? getValue('mobileWidth', '%spx') : undefined,
				},
			},
		})
	}

	styles.push({
		'.rri-video-popup__wrapper': {
			height: getValue('height') !== '' ? getValue('height', '%spx !important') : undefined,
			borderRadius: show.borderRadius ? (getValue('borderRadius') !== '' ? getValue('borderRadius', '%spx') : undefined) : undefined,
		},
		'.rri-video-popup__play-button i': {
			color: getValue('playButtonColor') !== '' ? getValue('playButtonColor', '%s !important') : undefined,
			fontSize: getValue('playButtonSize') !== '' ? getValue('playButtonSize', '%spx') : undefined,
			opacity: getValue('playButtonOpacity') !== '' ? getValue('playButtonOpacity') : undefined,
			borderColor: getValue('playButtonColor') ? hex_to_rgba(getValue('playButtonColor'), 0.4) : undefined
		},
		tablet: {
			'.rri-video-popup__wrapper': {
				height: getValue('tabletHeight') !== '' ? getValue('tabletHeight', '%spx !important') : undefined,
			},
			'.rri-video-popup__play-button i': {
				fontSize: getValue('tabletPlayButtonSize') !== '' ? getValue('tabletPlayButtonSize', '%spx') : undefined
			},
		},
		mobile: {
			'.rri-video-popup__wrapper': {
				height: getValue('mobileHeight') !== '' ? getValue('mobileHeight', '%spx !important') : undefined,
			},
			'.rri-video-popup__play-button i': {
				fontSize: getValue('mobilePlayButtonSize') !== '' ? getValue('mobilePlayButtonSize', '%spx') : undefined
			},
		},
	});

	styles.push({
		...createBackgroundStyleSet('preview%s', 'rri-video-popup__wrapper', props.attributes),
	});

	const {
		previewBackgroundTintStrength = '',
		previewBackgroundColor = '',
	} = props.attributes;

	if (previewBackgroundTintStrength || previewBackgroundColor) {
		styles.push({
			'.rri-video-popup__wrapper:hover:before': {
				opacity: previewBackgroundColor && previewBackgroundTintStrength === '' ? 0.2 :
					previewBackgroundTintStrength >= 5 ? (previewBackgroundTintStrength / 10) - 0.3 :
						(previewBackgroundTintStrength / 10) + 0.3,

			},
		})
	}

	return deepmerge.all(styles)
};

export default createStyles;
