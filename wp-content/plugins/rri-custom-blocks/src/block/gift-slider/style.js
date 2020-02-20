/**
 * External dependencies
 */
import {appendImportant, __getValue} from '../../util';
import deepmerge from 'deepmerge';

export const createStyles = (props) => {
	const getValue = __getValue(props.attributes);
	const styles = [];

	// Above title
	styles.push({
		'.rri-gift-slide__above-title': {
			fontSize: appendImportant(`${getValue('abovetitleFontSize')}${getValue('abovetitleFontSizeUnit')}`),
			fontWeight: appendImportant(`${getValue('abovetitleFontWeight')}`),
			textTransform: appendImportant(`${getValue('abovetitleTextTransform')}`),
			lineHeight: appendImportant(`${getValue('abovetitleLineHeight')}${getValue('abovetitleLineHeightUnit')}`),
			letterSpacing: appendImportant(`${getValue('abovetitleLetterSpacing')}px`),
			color: appendImportant(`${getValue('abovetitleColor')}`)
		},
		tablet: {
			'.rri-gift-slide__above-title': {
				fontSize: appendImportant(`${getValue('abovetitleTabletFontSize')}${getValue('abovetitleTabletFontSizeUnit')}`),
				lineHeight: appendImportant(`${getValue('abovetitleTabletLineHeight')}${getValue('abovetitleTabletLineHeightUnit')}`)
			}
		},
		mobile: {
			'.rri-gift-slide__above-title': {
				fontSize: appendImportant(`${getValue('abovetitleMobileFontSize')}${getValue('abovetitleMobileFontSizeUnit')}`),
				lineHeight: appendImportant(`${getValue('abovetitleMobileLineHeight')}${getValue('abovetitleMobileLineHeightUnit')}`)
			}
		}
	});

	// Title
	styles.push({
		'.rri-gift-slide__title': {
			fontSize: appendImportant(`${getValue('titleFontSize')}${getValue('titleFontSizeUnit')}`),
			fontWeight: appendImportant(`${getValue('titleFontWeight')}`),
			textTransform: appendImportant(`${getValue('titleTextTransform')}`),
			lineHeight: appendImportant(`${getValue('titleLineHeight')}${getValue('titleLineHeightUnit')}`),
			letterSpacing: appendImportant(`${getValue('titleLetterSpacing')}px`),
			color: appendImportant(`${getValue('titleColor')}`)
		},
		tablet: {
			'.rri-gift-slide__title': {
				fontSize: appendImportant(`${getValue('titleTabletFontSize')}${getValue('titleTabletFontSizeUnit')}`),
				lineHeight: appendImportant(`${getValue('titleTabletLineHeight')}${getValue('titleTabletLineHeightUnit')}`)
			}
		},
		mobile: {
			'.rri-gift-slide__title': {
				fontSize: appendImportant(`${getValue('titleMobileFontSize')}${getValue('titleMobileFontSizeUnit')}`),
				lineHeight: appendImportant(`${getValue('titleMobileLineHeight')}${getValue('titleMobileLineHeightUnit')}`)
			}
		}
	});

	// Number
	styles.push({
		'.rri-gift-slide__number': {
			fontSize: appendImportant(`${getValue('numberFontSize')}${getValue('numberFontSizeUnit')}`),
			fontWeight: appendImportant(`${getValue('numberFontWeight')}`),
			textTransform: appendImportant(`${getValue('numberTextTransform')}`),
			lineHeight: appendImportant(`${getValue('numberLineHeight')}${getValue('numberLineHeightUnit')}`),
			letterSpacing: appendImportant(`${getValue('numberLetterSpacing')}px`),
			color: appendImportant(`${getValue('numberColor')}`)
		},
		tablet: {
			'.rri-gift-slide__number': {
				fontSize: appendImportant(`${getValue('numberTabletFontSize')}${getValue('numberTabletFontSizeUnit')}`),
				lineHeight: appendImportant(`${getValue('numberTabletLineHeight')}${getValue('numberTabletLineHeightUnit')}`)
			}
		},
		mobile: {
			'.rri-gift-slide__number': {
				fontSize: appendImportant(`${getValue('numberMobileFontSize')}${getValue('numberMobileFontSizeUnit')}`),
				lineHeight: appendImportant(`${getValue('numberMobileLineHeight')}${getValue('numberMobileLineHeightUnit')}`)
			}
		}
	});

	return deepmerge.all(styles)
};

export default createStyles;
