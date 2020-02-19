/**
 * External dependencies
 */
import {appendImportant, __getValue} from '../../util';
import deepmerge from 'deepmerge';

export const createStyles = (props) => {
	const getValue = __getValue(props.attributes);
	const styles = [];

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
			'.rri-two-tone-text__containerr': {
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
