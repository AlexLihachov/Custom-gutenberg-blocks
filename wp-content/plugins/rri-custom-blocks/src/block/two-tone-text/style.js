/**
 * External dependencies
 */
import {
	createResponsiveStyles,
	createTypographyStyles,
	appendImportant,
	createBackgroundStyles,
	createBackgroundOverlayStyles,
	__getValue,
} from '../../util';
import deepmerge from 'deepmerge';

export const createStyles = (props) => {
	const getValue = __getValue(props.attributes);
	const styles = [];


	// Title left
	styles.push({
		'.first-line': {
			...createTypographyStyles('titleleft%s', 'desktop', props.attributes, {importantSize: true}),
			color: appendImportant(`${getValue('titleleftColor')}`)
		},
		tablet: {
			'.first-line': {
				...createTypographyStyles('titleleft%s', 'tablet', props.attributes, {importantSize: true}),
			}
		},
		mobile: {
			'.first-line': {
				...createTypographyStyles('titleleft%s', 'mobile', props.attributes, {importantSize: true}),
			}
		}
	});

	// Title right
	styles.push({
		'.second-line': {
			...createTypographyStyles('titleright%s', 'desktop', props.attributes, {importantSize: true}),
			color: appendImportant(`${getValue('titlerightColor')}`)
		},
		tablet: {
			'.second-line': {
				...createTypographyStyles('titleright%s', 'tablet', props.attributes, {importantSize: true}),
			}
		},
		mobile: {
			'.second-line': {
				...createTypographyStyles('titleright%s', 'mobile', props.attributes, {importantSize: true}),
			}
		}
	});

	//Block Min-height
	styles.push({
		'.rri-two-tone-text__parallax-src': {
			minHeight: appendImportant(getValue('blockHeight', '%spx'))
		},
		tablet: {
			'.rri-two-tone-text__parallax-src': {
				minHeight: appendImportant(getValue('tabletBlockHeight', '%spx'))
			}
		},
		mobile: {
			'.rri-two-tone-text__parallax-src': {
				minHeight: appendImportant(getValue('mobileBlockHeight', '%spx'))
			}
		}
	});

	// Block width
	styles.push({
		'.rri-two-tone-text__container': {
			maxWidth: appendImportant(getValue('blockWidth', '%spx'))
		},
		tablet: {
			'.rri-two-tone-text__container': {
				maxWidth: appendImportant(getValue('tabletBlockWidth', '%spx'))
			}
		},
		mobile: {
			'.rri-two-tone-text__container': {
				maxWidth: appendImportant(getValue('mobileBlockWidth', '%spx'))
			}
		}
	});

	// Vertical alignment
	styles.push({
		'.rri-two-tone-text__container': {
			alignItems: appendImportant(getValue('blockVerticalAlign'))
		},
		tablet: {
			'.rri-two-tone-text__container': {
				alignItems: appendImportant(getValue('tabletBlockVerticalAlign'))
			},
		},
		mobile: {
			'.rri-two-tone-text__container': {
				alignItems: appendImportant(getValue('mobileBlockVerticalAlign'))
			},
		}
	});

	// Horizontal alignment
	styles.push({
		'.rri-two-tone-text__container': {
			justifyContent: appendImportant(getValue('blockHorizontalAlign'))
		},
		tablet: {
			'.rri-two-tone-text__container': {
				justifyContent: appendImportant(getValue('tabletBlockHorizontalAlign'))
			},
		},
		mobile: {
			'.rri-two-tone-text__container': {
				justifyContent: appendImportant(getValue('mobileBlockHorizontalAlign'))
			},
		}
	});

	return deepmerge.all(styles)

};
export default createStyles;
