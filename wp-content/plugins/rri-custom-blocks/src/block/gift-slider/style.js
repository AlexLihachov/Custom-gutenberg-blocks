/**
 * External dependencies
 */
import {appendImportant, __getValue, createTypographyStyles} from '../../util';
import deepmerge from 'deepmerge';

export const createStyles = (props) => {
	const getValue = __getValue(props.attributes);
	const styles = [];

	// Above title
	styles.push({
		'.rri-gift-slide__above-title': {
			...createTypographyStyles('abovetitle%s', 'desktop', props.attributes, {importantSize: true}),
			color: appendImportant(`${getValue('abovetitleColor')}`)
		},
		tablet: {
			'.rri-gift-slide__above-title': {
				...createTypographyStyles('abovetitle%s', 'tablet', props.attributes, {importantSize: true}),
			}
		},
		mobile: {
			'.rri-gift-slide__above-title': {
				...createTypographyStyles('abovetitle%s', 'mobile', props.attributes, {importantSize: true}),
			}
		}
	});

	// Title
	styles.push({
		'.rri-gift-slide__title': {
			...createTypographyStyles('title%s', 'desktop', props.attributes, {importantSize: true}),
			color: appendImportant(`${getValue('titleColor')}`)
		},
		tablet: {
			'.rri-gift-slide__title': {
				...createTypographyStyles('title%s', 'tablet', props.attributes, {importantSize: true}),
			}
		},
		mobile: {
			'.rri-gift-slide__title': {
				...createTypographyStyles('title%s', 'mobile', props.attributes, {importantSize: true}),
			}
		}
	});

	// Number
	styles.push({
		'.rri-gift-slide__number': {
			...createTypographyStyles('number%s', 'desktop', props.attributes, {importantSize: true}),
			color: appendImportant(`${getValue('numberColor')}`)
		},
		tablet: {
			'.rri-gift-slide__number': {
				...createTypographyStyles('number%s', 'tablet', props.attributes, {importantSize: true}),
			}
		},
		mobile: {
			'.rri-gift-slide__number': {
				...createTypographyStyles('number%s', 'mobile', props.attributes, {importantSize: true}),
			}
		}
	});

	return deepmerge.all(styles)
};

export default createStyles;
