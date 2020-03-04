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

addFilter('stackable.gallery01.edit.inspector.layout.before', 'stackable/gallery01', (output, props) => {
	return (
		<Fragment>
			{output}
		</Fragment>
	)
});

addFilter('stackable.gallery01.edit.inspector.style.before', 'stackable/gallery01', (output, props) => {
	const {setAttributes} = props;
	const {elem_data, header_data} = props.attributes;
	return (
		<Fragment>
			{output}
			<PanelBody title={__('General', i18n)}>
				<AdvancedRangeControl
					label={__('Number of elements', i18n)}
					value={elem_data.length}
					onChange={(value) => {
						const elem_data_clone = cloneDeep(elem_data);

						if (elem_data.length < value) {
							elem_data_clone.push({
								name: "",
								sub_title: "",
								description: "",
								placeholder_name: __('John Smith', i18n),
								placeholder_sub_title: __('Company Name, CEO', i18n),
								placeholder_description: __('“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla auctor enim in nisl dapibus pulvinar fusce luctus dolor…”', i18n),
								link: '',
								linkNewTab: false,
								url: `${window.rriData.srcUrl}/src/block/gallery01/images/2.png`,
								id: ''
							});
						} else {
							elem_data_clone.pop();
						}

						setAttributes({
							elem_data: elem_data_clone
						});
					}}
					min={5}
					max={200}
				/>

				<ToggleControl
					label={__('Open in lightbox', i18n)}
					checked={header_data.open_lightbox}
					onChange={() => {
						const header_data_clone = cloneDeep(header_data);
						if (header_data_clone.open_lightbox === false) {
							header_data_clone.open_lightbox = true;
							header_data_clone.open_link = false;
						} else {
							header_data_clone.open_lightbox = false;
						}
						setAttributes({
							header_data: header_data_clone
						});
					}}
				/>

				<ToggleControl
					label={__('Link to page', i18n)}
					checked={header_data.open_link}
					onChange={() => {
						const header_data_clone = cloneDeep(header_data);
						if (header_data_clone.open_link === false) {
							header_data_clone.open_link = true;
							header_data_clone.open_lightbox = false;
						} else {
							header_data_clone.open_link = false;
						}
						setAttributes({
							header_data: header_data_clone
						});
					}}
				/>
			</PanelBody>
		</Fragment>
	);
});

class Edit extends Component {
	constructor() {
		super(...arguments);
		this.state = {
			openUrlPopover: false
		};
		this.onChangeUrl = this.onChangeUrl.bind(this);
		this.handleFocusOutside = this.handleFocusOutside.bind(this)
	}

	handleFocusOutside() {
		this.setState({
			openUrlPopover: null,
		})
	}

	onChangeUrl(value, index) {
		const {setAttributes, attributes} = this.props;
		const elem_data_clone = cloneDeep(attributes.elem_data);
		elem_data_clone[index].link = value;
		setAttributes({
			elem_data: elem_data_clone
		});

		console.log(attributes.elem_data)
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
								className="rri-gallery01__title"s
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
									placeholder={header_data.placeholder_description}
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

											<ImageUploadPlaceholder
												imageID={elem.id}
												className="rri-gallery01-block__picture"
												imageURL={elem.url}
												onRemove={() => {
													const elem_data_clone = cloneDeep(elem_data);
													elem_data_clone[index].id = '';
													elem_data_clone[index].url = '';
													setAttributes({
														elem_data: elem_data_clone
													});
												}}
												onChange={image => {
													const elem_data_clone = cloneDeep(elem_data);
													elem_data_clone[index].id = image.id;
													elem_data_clone[index].url = image.url;
													setAttributes({
														elem_data: elem_data_clone
													});
												}}
											/>
											<div className="rri-gallery01-block-info">
												<RichText
													tagName="p"
													className="rri-gallery01-block-info__name"
													placeholder={elem.placeholder_name}
													value={elem.name}
													onChange={(value) => {
														const elem_data_clone = cloneDeep(elem_data);
														elem_data_clone[index].name = value;
														setAttributes({
															elem_data: elem_data_clone
														});
													}}
												/>
												<RichText
													tagName="p"
													className="rri-gallery01-block-info__work"
													placeholder={elem.placeholder_sub_title}
													value={elem.sub_title}
													onChange={(value) => {
														const elem_data_clone = cloneDeep(elem_data);
														elem_data_clone[index].sub_title = value;
														setAttributes({
															elem_data: elem_data_clone
														});
													}}
												/>
											</div>
											<div className="rri-gallery01-block__more-info">
												<RichText
													tagName="p"
													placeholder={elem.placeholder_description}
													value={elem.description}
													onChange={(value) => {
														const elem_data_clone = cloneDeep(elem_data);
														elem_data_clone[index].description = value;
														setAttributes({
															elem_data: elem_data_clone
														});
													}}
												/>
												{header_data.open_link === false || header_data.open_lightbox === false  && <div className="rri-gallery01-block__more-info-no"></div>}
												{header_data.open_lightbox === true  && <div className="rri-gallery01-block__more-info-plus"></div>}
												{header_data.open_link === true  && <div className="rri-gallery01-block__more-info-play" onClick={() => this.setState({openUrlPopover: index})}></div>}
											</div>

										{header_data.open_link === true ?
										this.state.openUrlPopover === index && <UrlInputPopover
											value={elem.link}
											newTab={elem.linkNewTab}
											onChange={value => this.onChangeUrl(value, index)}
										/>: null}
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
