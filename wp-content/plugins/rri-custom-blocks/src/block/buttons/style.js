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
		'.rri-buttons': {
			...createTypographyStyles('buttons%s', 'desktop', props.attributes, {importantSize: true}),
			color: appendImportant(`${getValue('butonsColor')}`)
		},
		tablet: {
			'.rri-buttons': {
				...createTypographyStyles('buttons%s', 'tablet', props.attributes, {importantSize: true}),
			}
		},
		mobile: {
			'.rri-buttons': {
				...createTypographyStyles('buttons%s', 'mobile', props.attributes, {importantSize: true}),
			}
		}
	});


	return deepmerge.all(styles)

};
export default createStyles;
