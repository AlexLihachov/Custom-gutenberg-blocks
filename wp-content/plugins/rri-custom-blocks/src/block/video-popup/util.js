/**
 * Internal dependencies
 */
import SVGCircleIcon from './images/play-circle.svg';
import SVGNormalIcon from './images/play-normal.svg';
import SVGOutlineIcon from './images/play-outline.svg';

/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
import {applyFilters} from '@wordpress/hooks';

/**
 * External dependencies
 */
import {i18n} from '../../constants';

// const playButton = {
// 	normal: <SVGNormalIcon className="rri-play-button-normal" width="30" height="30"/>,
// 	circle: <SVGCircleIcon className="rri-play-button-cirle" width="50" height="50"/>,
// 	outline: <SVGOutlineIcon className="rri-play-button-outline" width="50" height="50"/>,
// };

const playButton = {
	normal: <i className="icon icon-Play-2"/>,
	circle: <i className="icon icon-Play-1"/>
};

export const playButtonTypes = [
	{value: 'normal', label: __('Normal Play Button', i18n)},
	{value: 'circle', label: __('Play Button with Circle', i18n)}
];

export const getPlayButton = name => {
	return playButton[name]
};

export const showOptions = blockProps => {
	const {
		showBlockBackground = false,
		blockInnerWidth = '',
		align = '',
	} = blockProps.attributes

	const previewIsFullWidth = (!showBlockBackground && align === 'full') || (showBlockBackground && blockInnerWidth === 'full')

	return applyFilters('stackable.video-popup.show', {
		containerWidth: !previewIsFullWidth,
		borderRadius: !previewIsFullWidth,
	}, blockProps)
};


export const hex_to_rgba = (hex, opacity) => {
	let c;

	if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
		c = hex.substring(1).split('');
		if (c.length === 3) {
			c = [c[0], c[0], c[1], c[1], c[2], c[2]];
		}
		c = '0x' + c.join('');
		return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',')}, ${opacity})`;
	} else {
		throw new Error('Bad Hex');
	}
};

