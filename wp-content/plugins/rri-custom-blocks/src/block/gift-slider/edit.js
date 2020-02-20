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

addFilter('stackable.gift-slider.edit.inspector.layout.before', 'stackable/gift-slider', (output, props) => {
	return (
		<Fragment>
			{output}
		</Fragment>
	)
});

addFilter('stackable.gift-slider.edit.inspector.style.before', 'stackable/gift-slider', (output, props) => {
	const {setAttributes} = props;
	const {slides_data, settings, abovetitleTag, titleTag, abovetitleColor, titleColor, numberColor} = props.attributes;

	return (
		<Fragment>
			{output}
			<PanelBody title={__('General', i18n)}>
				<AdvancedRangeControl
					label={__('Number of slides', i18n)}
					value={slides_data.length}
					onChange={(value) => {
						const slider_data_clone = cloneDeep(slides_data);

						if (slides_data.length < value) {
							slider_data_clone.push({
								above_title: __('Above title', i18n),
								name: __('Name', i18n),
								number: __('Number', i18n),
								image: {
									url: '',
									id: ''
								},
								link: {
									url: '',
									newTab: false,
									noFollow: false,
									text: 'Learn more'

								}
							});
						} else {
							slider_data_clone.pop();
						}

						setAttributes({
							slides_data: slider_data_clone
						});
					}}
					min={1}
					max={20}
				/>
			</PanelBody>
			<PanelBody title={__('Ordering', i18n)}>
				<DragImages items={slides_data} setAttributes={setAttributes}/>
			</PanelBody>
			<PanelBody title={__('Above Title', i18n)}>
				<TypographyControlHelper
					attrNameTemplate="abovetitle%s"
					setAttributes={setAttributes}
					blockAttributes={props.attributes}
				/>
				<HeadingButtonsControl
					value={abovetitleTag}
					onChange={value => setAttributes({
						abovetitleTag: value
					})}
				/>
				<ColorPaletteControl
					value={abovetitleColor}
					onChange={value => setAttributes({
						abovetitleColor: value
					})}
					label={__('Above title Color', i18n)}
				/>
			</PanelBody>
			<PanelBody title={__('Title', i18n)}>
				<TypographyControlHelper
					attrNameTemplate="title%s"
					setAttributes={setAttributes}
					blockAttributes={props.attributes}
				/>
				<HeadingButtonsControl
					value={titleTag}
					onChange={value => setAttributes({
						titleTag: value
					})}
				/>
				<ColorPaletteControl
					value={titleColor}
					onChange={value => setAttributes({
						titleColor: value
					})}
					label={__('Title Color', i18n)}
				/>
			</PanelBody>
			<PanelBody title={__('Number', i18n)}>
				<TypographyControlHelper
					attrNameTemplate="number%s"
					setAttributes={setAttributes}
					blockAttributes={props.attributes}
				/>
				<ColorPaletteControl
					value={numberColor}
					onChange={value => setAttributes({
						numberColor: value
					})}
					label={__('Number Color', i18n)}
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
		this.sliderRef = createRef();
		this.decreasesSlides = false;
		this.handleClick = this.handleClick.bind(this);
		this.handleInnerClick = this.handleInnerClick.bind(this);
		this.onChangeUrl = this.onChangeUrl.bind(this);
		this.onChangeNewTab = this.onChangeNewTab.bind(this);
		this.onChangeNoFollow = this.onChangeNoFollow.bind(this);
		this.animatedSlides = this.animatedSlides.bind(this);
		this.removeAnimatedSlides = this.removeAnimatedSlides.bind(this);
	}

	handleClick(ev) {
		this.setState({
			openUrlPopover: true
		});
	}

	handleInnerClick(ev) {
		this.setState({
			openUrlPopover: false
		});
	}

	onChangeUrl(value, index) {
		const {setAttributes, attributes} = this.props;
		const slider_data_clone = cloneDeep(attributes.slides_data);
		slider_data_clone[index].link.url = value;
		setAttributes({
			slides_data: slider_data_clone
		});
	}

	onChangeNewTab(value, index) {
		const {setAttributes, attributes} = this.props;
		const slider_data_clone = cloneDeep(attributes.slides_data);
		slider_data_clone[index].link.newTab = value;
		setAttributes({
			slides_data: slider_data_clone
		});
	}

	onChangeNoFollow(value, index) {
		const {setAttributes, attributes} = this.props;
		const slider_data_clone = cloneDeep(attributes.slides_data);
		slider_data_clone[index].link.noFollow = value;
		setAttributes({
			slides_data: slider_data_clone
		});
	}

	animatedSlides() {
		jQuery('.slick-current .rri-gift-slide__title').addClass('animated');
		jQuery('.slick-current .rri-gift-slide__above-title').addClass('animated');
		jQuery('.slick-current .rri-gift-slide__number').addClass('animated');
		jQuery('.slick-current .rri-gift-slide__image').addClass('animated');
	}

	removeAnimatedSlides() {
		jQuery('.slick-current .rri-gift-slide__title').removeClass('animated');
		jQuery('.slick-current .rri-gift-slide__above-title').removeClass('animated');
		jQuery('.slick-current .rri-gift-slide__number').removeClass('animated');
		jQuery('.slick-current .rri-gift-slide__image').removeClass('animated');
	}

	componentDidMount() {
		const self = this;
		const sliderNode = this.sliderRef.current;

		jQuery(sliderNode).on('init', function (event, slick) {
			self.animatedSlides();
			jQuery('.slick-active').prev().removeClass('is-next').addClass('is-prev');
			jQuery('.slick-active').next().removeClass('is-prev').addClass('is-next');
		});

		jQuery(sliderNode).slick(this.props.attributes.settings);

		jQuery(sliderNode).on('swipe', function (event, slick, currentSlide, direction) {
			self.animatedSlides();
		});

		jQuery('.rri-gift-prev').on('click', function () {
			self.animatedSlides();
		});

		jQuery('.rri-gift-next').on('click', function () {
			self.animatedSlides();
		});

		jQuery(sliderNode).on('afterChange', function (event, slick, currentSlide, nextSlide) {
			jQuery(".slick-active").prev().removeClass('is-next').addClass('is-prev');
			jQuery(".slick-active").next().removeClass('is-prev').addClass('is-next');
		});

		jQuery(sliderNode).on('beforeChange', function () {
			self.removeAnimatedSlides();
		});
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const isAddNewSlides = prevProps.attributes.slides_data.length < this.props.attributes.slides_data.length;
		const isDifferentSettings = !isEqual(prevProps.attributes.settings, this.props.attributes.settings);
		const slideNode = this.sliderRef.current;

		if (isAddNewSlides || isDifferentSettings) {
			jQuery(slideNode).slick('destroy');
			jQuery(slideNode).slick(this.props.attributes.settings);

		} else if (this.decreasesSlides) {
			jQuery(slideNode).slick(this.props.attributes.settings);
			this.decreasesSlides = false;
		}
	}

	getSnapshotBeforeUpdate(prevProps, prevState) {
		const isRemovedSlides = prevProps.attributes.slides_data.length > this.props.attributes.slides_data.length;
		const slideNode = this.sliderRef.current;

		if (isRemovedSlides) {
			jQuery(slideNode).slick('destroy');
			this.decreasesSlides = true;
		}
	}

	render() {
		const {className, setAttributes, attributes} = this.props;
		const {slides_data, abovetitleTag, titleTag} = attributes;
		const mainClasses = classnames([className]);

		return (
			<BlockContainer.Edit
				className={mainClasses}
				blockProps={this.props}
				render={() => (
					<Fragment>
						<div className="rri-gift-slider__inner"
							 ref={this.sliderRef}
							 onMouseDown={this.handleInnerClick}
						>
							{slides_data.map((slide, index) => {
								return (
									<div className="rri-gift-slide">
										<div className="rri-gift-slide__content">
											<RichText
												tagName={abovetitleTag}
												className="rri-gift-slide__above-title"
												value={slide.above_title}
												onChange={(value) => {
													const slider_data_clone = cloneDeep(slides_data);
													slider_data_clone[index].above_title = value;
													setAttributes({
														slides_data: slider_data_clone
													});
												}}
												keepPlaceholderOnFocus
											/>
											<RichText
												tagName={titleTag}
												className="rri-gift-slide__title"
												value={slide.name}
												onChange={(value) => {
													const slider_data_clone = cloneDeep(slides_data);
													slider_data_clone[index].name = value;
													setAttributes({
														slides_data: slider_data_clone
													});
												}}
												keepPlaceholderOnFocus
											/>
											<RichText
												tagName="p"
												className="rri-gift-slide__number"
												value={slide.number}
												onChange={(value) => {
													const slider_data_clone = cloneDeep(slides_data);
													slider_data_clone[index].number = value;
													setAttributes({
														slides_data: slider_data_clone
													});
												}}
												keepPlaceholderOnFocus
											/>
											<div className="rri-gift-slide__cta"
												 onClick={this.handleClick}>
												<RichText
													tagName="span"
													className="rri-gift-slide__cta-text"
													value={slide.link.text}
													onChange={(value) => {
														const slider_data_clone = cloneDeep(slides_data);
														slider_data_clone[index].link.text = value;
														setAttributes({
															slides_data: slider_data_clone
														});
													}}
													keepPlaceholderOnFocus
												/>
												{this.state.openUrlPopover && <UrlInputPopover
													value={slide.link.url}
													newTab={slide.link.newTab}
													noFollow={slide.link.noFollow}
													onChange={value => this.onChangeUrl(value, index)}
													onChangeNewTab={value => this.onChangeNewTab(value, index)}
													onChangeNoFollow={value => this.onChangeNoFollow(value, index)}
												/>}
											</div>
											<ImageUploadPlaceholder
												imageID={slide.image.id}
												imageURL={slide.image.url}
												onRemove={() => {
													const slider_data_clone = cloneDeep(slides_data);
													slider_data_clone[index].image.id = '';
													slider_data_clone[index].image.url = '';
													setAttributes({
														slides_data: slider_data_clone
													});
												}}
												onChange={image => {
													const slider_data_clone = cloneDeep(slides_data);
													slider_data_clone[index].image.id = image.id;
													slider_data_clone[index].image.url = image.url;
													setAttributes({
														slides_data: slider_data_clone
													});
												}}
											/>
										</div>
									</div>
								);
							})}
						</div>
						<div className="rri-gift-arrows">
							<div className="rri-gift-prev"/>
							<div className="rri-gift-next"/>
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
	// withSelect((select, {clientId}) => {
	// 	const {getBlock} = select('core/block-editor');
	// 	const block = getBlock(clientId);
	// 	return {
	// 		hasInnerBlocks: !!(block && block.innerBlocks.length),
	// 	}
	// }),
	// withFocusOutside,
)(Edit);
