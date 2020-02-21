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


	return deepmerge.all(styles)

};
export default createStyles;
