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

addFilter('stackable.image-text-grid.edit.inspector.layout.before', 'stackable/image-text-grid', (output, props) => {
	return (
		<Fragment>
			{output}
		</Fragment>
	)
});

addFilter('stackable.image-text-grid.edit.inspector.style.before', 'stackable/image-text-grid', (output, props) => {
	const {setAttributes} = props;
	const {elem_data, header_data} = props.attributes;
	return (
		<Fragment>
			{output}
		</Fragment>
	);
});

class Edit extends Component {
	constructor() {
		super(...arguments);
		this.sliderRef = createRef();
	}

	componentDidMount() {

	}

	getSnapshotBeforeUpdate(prevProps, prevState) {


	}

	componentDidUpdate(prevProps, prevState) {
	}

	render() {
		const {setAttributes, attributes} = this.props;
		const {header_data, elem_data} = attributes;
		return (
			<BlockContainer.Edit
				blockProps={this.props}
				render={() => (
					<Fragment>
						<div className="rri-gallery01">
							<RichText
								tagName="p"
								className="rri-gallery01__title"
								value={header_data.title}
								onChange={(value) => {
									const header_data_clone = cloneDeep(header_data);
									header_data_clone.title = value;
									setAttributes({
										header_data: header_data_clone
									});
								}}
							/>
							<div className="rri-gallery01__subtext">
								<RichText
									tagName="p"
									value={header_data.description}
									onChange={(value) => {
										const header_data_clone = cloneDeep(header_data);
										header_data_clone.description = value;
										setAttributes({
											header_data: header_data_clone
										});
									}}
								/>
							</div>
							<div className="rri-gallery01-grid">
								{elem_data.map((elem, index) => {
								return (
									<div className={index === 0 ? "rri-gallery01-block rri-gallery01-block_big" : "rri-gallery01-block rri-gallery01-block_small"}>
										<a href="">
											<img className="rri-gallery01-block__picture" src="img/Image.png" alt=""/>
											<div className="rri-gallery01-block-info">
												<p className="rri-gallery01-block-info__name">John Smith</p>
												<p className="rri-gallery01-block-info__work">Company Name, CEO</p>
											</div>
											<div className="rri-gallery01-block__more-info">
												<p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
													auctor enim in nisl dapibus pulvinar fusce luctus dolor…”</p>
												<img src="img/Plus.png" alt=""/>
											</div>
										</a>
									</div>
								)
								})}

							</div>

							<RichText
								tagName="button"
								className="rri-gallery01__load-more"
								value={header_data.load_more}
								onChange={(value) => {
									const header_data_clone = cloneDeep(header_data);
									header_data_clone.load_more = value;
									setAttributes({
										header_data: header_data_clone
									});
								}}
							/>

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
