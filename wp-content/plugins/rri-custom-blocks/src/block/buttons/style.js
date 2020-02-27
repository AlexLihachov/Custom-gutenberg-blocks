/**
 * External dependencies
 */
import {
	appendImportant,
	__getValue,
} from '../../util';
import deepmerge from 'deepmerge';

export const createStyles = (props) => {
	const getValue = __getValue(props.attributes);
	const styles = [];

	//Block Min-height
	styles.push({
		'.rri-buttons': {
			minHeight: appendImportant(getValue('blockHeight', '%spx'))
		},
		tablet: {
			'.rri-buttons': {
				minHeight: appendImportant(getValue('tabletBlockHeight', '%spx'))
			}
		},
		mobile: {
			'.rri-buttons': {
				minHeight: appendImportant(getValue('mobileBlockHeight', '%spx'))
			}
		}
	});

	// Block width
	styles.push({
		'.rri-buttons': {
			maxWidth: appendImportant(getValue('blockWidth', '%spx'))
		},
		tablet: {
			'.rri-buttons': {
				maxWidth: appendImportant(getValue('tabletBlockWidth', '%spx'))
			}
		},
		mobile: {
			'.rri-buttons': {
				maxWidth: appendImportant(getValue('mobileBlockWidth', '%spx'))
			}
		}
	});

	// Vertical alignment
	styles.push({
		'.rri-buttons': {
			alignItems: appendImportant(getValue('blockVerticalAlign'))
		},
		tablet: {
			'.rri-buttons': {
				alignItems: appendImportant(getValue('tabletBlockVerticalAlign'))
			},
		},
		mobile: {
			'.rri-buttons': {
				alignItems: appendImportant(getValue('mobileBlockVerticalAlign'))
			},
		}
	});

	// Horizontal alignment
	styles.push({
		'.rri-buttons': {
			justifyContent: appendImportant(getValue('blockHorizontalAlign'))
		},
		tablet: {
			'.rri-buttons': {
				justifyContent: appendImportant(getValue('tabletBlockHorizontalAlign'))
			},
		},
		mobile: {
			'.rri-buttons': {
				justifyContent: appendImportant(getValue('mobileBlockHorizontalAlign'))
			},
		}
	});

	return deepmerge.all(styles)

};
export default createStyles;
