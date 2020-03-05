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
import {InnerBlocks} from '@wordpress/block-editor';
import {PanelBody, withFocusOutside, ToggleControl} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import {addFilter} from '@wordpress/hooks';
import {Component, Fragment, createRef} from '@wordpress/element';
import {compose} from '@wordpress/compose';
import {withSelect} from '@wordpress/data';
import {descriptionPlaceholder} from "../../util";

/**
 * Tabs Render
 */

addFilter('stackable.tabs01.edit.inspector.layout.before', 'stackable/tabs01', (output, props) => {
	return (
		<Fragment>
			{output}
		</Fragment>
	)
});

addFilter('stackable.tabs01.edit.inspector.style.before', 'stackable/tabs01', (output, props) => {
	const {setAttributes} = props;
	const {tabs_data} = props.attributes;
	return (
		<Fragment>
			{output}
			<PanelBody title={__('General', i18n)}>
				<AdvancedRangeControl
					label={__('Number of tabs', i18n)}
					value={tabs_data.length}
					onChange={(value) => {
						const tabs_data_clone = cloneDeep(tabs_data);

						if (tabs_data.length < value) {
							tabs_data_clone.push({
								name: __('New', i18n),
							});
						} else {
							tabs_data_clone.pop();
						}

						setAttributes({
							tabs_data: tabs_data_clone
						});
					}}
					min={2}
					max={5}
				/>
			</PanelBody>
		</Fragment>
	);
});


class Edit extends Component {
	constructor() {
		super(...arguments);
	}
	

	render() {
		const {setAttributes, attributes} = this.props;
		const {tabs_data} = attributes;
		return (
			<BlockContainer.Edit
				blockProps={this.props}
				render={() => (
					<Fragment>
						<div className="rri-tabs01">
							<div className="tabs">
								<div className="tabs__header">
									{tabs_data.map((tab, index) => {
										return (
											<RichText
										tagName="p"
										className={index === 0 ? "tabs__tab active" : "tabs__tab"}
										value={tab.name}
										onChange={(value) => {
											const tabs_data_clone = cloneDeep(tabs_data);
											tabs_data_clone[index].name = value;
											setAttributes({
												tabs_data: tabs_data_clone
											});
										}}
										/>
									)
									})}
								</div>
								{tabs_data.map((tab, index) => {
									return (
								<div data-id={index} className={index === 0 ? `tabs__content tabs__content_${index} visible` : `tabs__content tabs__content_${index}`}>
									<InnerBlocks/>
								</div>
									)
								})}

							</div>
						</div>
					</Fragment>
				)}/>
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
