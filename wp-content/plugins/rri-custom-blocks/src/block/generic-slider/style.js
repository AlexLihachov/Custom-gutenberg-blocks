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
		'.rri-generic-slide': {
			minHeight: appendImportant(getValue('blockHeight', '%spx'))
		},
		tablet: {
			'.rri-generic-slide': {
				minHeight: appendImportant(getValue('tabletBlockHeight', '%spx'))
			}
		},
		mobile: {
			'.rri-generic-slide': {
				minHeight: appendImportant(getValue('mobileBlockHeight', '%spx'))
			}
		}
	});

	// Block width
	styles.push({
		'.rri-generic-slide__wrapper': {
			maxWidth: `${getValue('blockWidth') - 30 - 160}px !important`
		},
		tablet: {
			'.rri-generic-slide__wrapper': {
				maxWidth: `${getValue('tabletBlockWidth') - 35}px !important`
			}
		},
		mobile: {
			'.rri-generic-slide__wrapper': {
				maxWidth: `${getValue('mobileBlockWidth') - 35}px !important`
			}
		}
	});

	// Arrows depend on block width
	styles.push({
		'.rri-generic-slider__arrows': {
			maxWidth: `${getValue('blockWidth')}px !important`
		}
	});

	// Vertical alignment
	styles.push({
		'.rri-generic-slide__wrapper': {
			alignItems: appendImportant(getValue('blockVerticalAlign'))
		},
		tablet: {
			'.rri-generic-slide__wrapper': {
				alignItems: appendImportant(getValue('tabletBlockVerticalAlign'))
			},
		},
		mobile: {
			'.rri-generic-slide__wrapper': {
				alignItems: appendImportant(getValue('mobileBlockVerticalAlign'))
			},
		}
	});

	// Horizontal alignment
	styles.push({
		'.rri-generic-slide__wrapper': {
			justifyContent: appendImportant(getValue('blockHorizontalAlign'))
		},
		tablet: {
			'.rri-generic-slide__wrapper': {
				justifyContent: appendImportant(getValue('tabletBlockHorizontalAlign'))
			},
		},
		mobile: {
			'.rri-generic-slide__wrapper': {
				justifyContent: appendImportant(getValue('mobileBlockHorizontalAlign'))
			},
		}
	});

	return deepmerge.all(styles)

};
export default createStyles;
