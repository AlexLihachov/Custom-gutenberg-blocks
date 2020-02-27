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
	const {row_data} = props.attributes;
	return (
		<Fragment>
			{output}
			<PanelBody title={__('General', i18n)}>
				<AdvancedRangeControl
					label={__('Number of row', i18n)}
					value={row_data.length}
					onChange={(value) => {
						const row_data_clone = cloneDeep(row_data);

						if (row_data.length < value) {
							row_data_clone.push({
								sub_title: __('Sub title', i18n),
								description: __('Description', i18n),
								name: __('Name Sliders', i18n),
								reverse: '',
								sliders: [
									{
										name: __('Name Sliders', i18n),
										url: '',
										id: ''
									}
								]
							});
						} else {
							row_data_clone.pop();
						}

						setAttributes({
							row_data: row_data_clone
						});
					}}
					min={1}
					max={9}
				/>
			</PanelBody>
			{row_data.map((row, index) => {
				return (
					<PanelBody title={__('Row', i18n) + " " + index}>

						<ToggleControl
							label={__('Reverse', i18n)}
							checked={row.reverse}
							onChange={() => {
								const reverseClone = cloneDeep(row_data);
								if (reverseClone[index].reverse === '') {
									reverseClone[index].reverse = 'reverse';
								} else {
									reverseClone[index].reverse = '';
								}
								setAttributes({
									row_data: reverseClone
								});
							}}
						/>

						<AdvancedRangeControl
							label={__('Number of sliders', i18n)}
							value={row.sliders.length}
							onChange={(value) => {
								const row_data_clone = cloneDeep(row_data);
								if (row.sliders.length < value) {
									row_data_clone[index].sliders.push(
										{
											name: __('Name Sliders', i18n),
											url: '',
											id: ''
										});
								} else {
									row_data_clone[index].sliders.pop();
								}

								setAttributes({
									row_data: row_data_clone
								});
							}}
							min={1}
							max={9}
						/>
					</PanelBody>
				)
			})}
		</Fragment>
	);
});

class Edit extends Component {
	constructor() {
		super(...arguments);
		this.sliderRef = createRef();
		this.decreasesSlides = false;
	}

	componentDidMount() {
		const container = this.sliderRef.current;

		const slider = jQuery(container).find(".rri-grid-block__slider");
		jQuery(slider).map((element, index) => {

			if (jQuery(slider[element]).hasClass("slick-slider")) {
				jQuery(slider[element]).slick('unslick');
				jQuery(slider[element]).slick({
					dots: true,
					responsive: [
						{
							breakpoint: 768,
							settings: {
								arrows: false
							}
						}
					]
				});
			} else {
				jQuery(slider[element]).slick({
					dots: true,
					responsive: [
						{
							breakpoint: 768,
							settings: {
								arrows: false
							}
						}
					]
				});
			}

		})
	}

	getSnapshotBeforeUpdate(prevProps, prevState) {
		const isRemovedRow = prevProps.attributes.row_data.length > this.props.attributes.row_data.length;
		const container = this.sliderRef.current;

		const slider = jQuery(container).find(".rri-grid-block__slider");
		prevProps.attributes.row_data.map((row, index) => {
			if (isRemovedRow || prevProps.attributes.row_data[index].sliders.length > this.props.attributes.row_data[index].sliders.length) {
				jQuery(slider).map((element, index) => {
					if (jQuery(slider[element]).hasClass("slick-slider")) {
						jQuery(slider[element]).slick('unslick');

					}
				})
				this.decreasesSlides = true;
			}

		})


	}

	componentDidUpdate(prevProps, prevState) {
		const isRemovedRow = prevProps.attributes.row_data.length < this.props.attributes.row_data.length;
		const container = this.sliderRef.current;

		const slider = jQuery(container).find(".rri-grid-block__slider");
		prevProps.attributes.row_data.map((row, index) => {
			if (isRemovedRow || !isEqual(prevProps.attributes.row_data.length, this.props.attributes.row_data.length) || prevProps.attributes.row_data[index].sliders.length < this.props.attributes.row_data[index].sliders.length || !isEqual(prevProps.attributes.row_data[index].sliders.length, this.props.attributes.row_data[index].sliders.length)) {
				jQuery(slider).map((element, index) => {

					if (jQuery(slider[element]).hasClass("slick-slider")) {
						jQuery(slider[element]).slick('unslick');
						jQuery(slider[element]).slick({
							dots: true,
							responsive: [
								{
									breakpoint: 768,
									settings: {
										arrows: false
									}
								}
							]
						});
					} else {
						jQuery(slider[element]).slick({
							dots: true,
							responsive: [
								{
									breakpoint: 768,
									settings: {
										arrows: false
									}
								}
							]
						});
					}

				})
			}

		})
	}

	render() {
		const {setAttributes, attributes} = this.props;
		const {row_data} = attributes;
		return (
			<BlockContainer.Edit
				blockProps={this.props}
				render={() => (
					<Fragment>

						<div ref={this.sliderRef} className="rri-image-text-grid">
							{row_data.map((row, index) => {
								return (
									<div className={"rri-grid-row " + row.reverse}>
										<div
											className={"rri-grid-block rri-grid-block_slider elem" + row.sliders.length}>
											<div className="rri-grid-block__slider">
												{row.sliders.map((slider, indexSlide) => {
													return (
														<div>
															<ImageUploadPlaceholder
																imageID={slider.id}
																imageURL={slider.url}
																onRemove={() => {
																	const row_data_clone = cloneDeep(row_data);
																	row_data_clone[index].sliders[indexSlide].id = '';
																	row_data_clone[index].sliders[indexSlide].url = '';
																	setAttributes({
																		row_data: row_data_clone
																	});
																}}
																onChange={image => {
																	const row_data_clone = cloneDeep(row_data);
																	row_data_clone[index].sliders[indexSlide].id = image.id;
																	row_data_clone[index].sliders[indexSlide].url = image.url;
																	setAttributes({
																		row_data: row_data_clone
																	});
																}}
															/>
															<RichText
																tagName="p"
																className="rri-grid-block__name"
																value={slider.name}
																onChange={(value) => {
																	const row_data_clone = cloneDeep(row_data);
																	row_data_clone[index].sliders[indexSlide].name = value;
																	setAttributes({
																		row_data: row_data_clone
																	});
																}}
															/>
														</div>
													);
												})}
											</div>
										</div>
										<div className="rri-grid-block rri-grid-block_more-info">
											<div className="rri-grid-block__more-info">
												<RichText
													tagName="h4"
													className="rri-grid-block__sub-title"
													value={row.sub_title}
													onChange={(value) => {
														const row_data_clone = cloneDeep(row_data);
														row_data_clone[index].sub_title = value;
														setAttributes({
															row_data: row_data_clone
														});
													}}
												/>
												<RichText
													tagName="p"
													className="rri-grid-block__text"
													value={row.description}
													onChange={(value) => {
														const row_data_clone = cloneDeep(row_data);
														row_data_clone[index].description = value;
														setAttributes({
															row_data: row_data_clone
														});
													}}
												/>
											</div>
										</div>
									</div>
								);
							})}
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
