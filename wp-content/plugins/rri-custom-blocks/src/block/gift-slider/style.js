/**
 * External dependencies
 */
import {appendImportant, __getValue, createTypographyStyles} from '../../util';
import deepmerge from 'deepmerge';

export const createStyles = (props) => {
	const getValue = __getValue(props.attributes);
	const styles = [];

	return deepmerge.all(styles)
};

export default createStyles;
