/**
 * External dependencies
 */
import {cloneDeep, isEqual} from 'lodash';

import {
	ImageUploadPlaceholder,
	BlockContainer,
	AdvancedRangeControl,
	DragImages,
	UrlInputPopover,
	TypographyControlHelper,
	HeadingButtonsControl, ColorPaletteControl
} from '../../components';

import {
	withUniqueClass,
	withSetAttributeHook,
	withTabbedInspector,
	withBlockStyles,
	withClickOpenInspector,
} from '../../higher-order';

import classnames from 'classnames';
import {i18n} from '../../constants';

/**
 * Internal dependencies
 */
import createStyles from './style';

/**
 * WordPress dependencies
 */
import {RichText} from '@wordpress/block-editor';
import {PanelBody, withFocusOutside, ToggleControl} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import {addFilter} from '@wordpress/hooks';
import {Component, Fragment, createRef} from '@wordpress/element';
import {compose} from '@wordpress/compose';
import {withSelect} from '@wordpress/data';

/**
 * Tabs Render
 */

addFilter('stackable.hero-slider.edit.inspector.layout.before', 'stackable/hero-slider', (output, props) => {
	return (
		<Fragment>
			{output}
		</Fragment>
	)
});

addFilter('stackable.hero-slider.edit.inspector.style.before', 'stackable/hero-slider', (output, props) => {
	const {setAttributes} = props;
	const {slides_data, settings} = props.attributes;

	return (
		<Fragment>
			{output}
			<PanelBody title={__('General', i18n)}>

			</PanelBody>
		</Fragment>
	);
});

class Edit extends Component {
	constructor() {
		super(...arguments);
	}

	render() {
		return (
			<h3>Hero slider</h3>
		);
	}
}

export default compose(
	withUniqueClass,
	withSetAttributeHook,
	withTabbedInspector(),
	withBlockStyles(createStyles, {editorMode: true}),
	withSelect((select, {clientId}) => {
		const {getBlock} = select('core/block-editor');
		const block = getBlock(clientId);
		return {
			hasInnerBlocks: !!(block && block.innerBlocks.length),
		}
	}),
	withFocusOutside,
)(Edit);
