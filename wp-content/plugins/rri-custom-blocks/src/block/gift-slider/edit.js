/**
 * External dependencies
 */
import {cloneDeep, isEqual} from 'lodash';

import {
	ImageUploadPlaceholder,
	BlockContainer,
	AdvancedRangeControl,
	DragImages,
	UrlInputPopover
} from '../../components';

import {
	withUniqueClass,
	withSetAttributeHook,
	withTabbedInspector,
	withBlockStyles,
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
	const {slides_data, settings} = props.attributes;

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
				<ToggleControl
					label={__('Infinite Loop?', i18n)}
					checked={settings.infinite}
					onChange={() => {
						const settingsClone = cloneDeep(settings);
						settingsClone.infinite = !settingsClone.infinite;
						setAttributes({
							settings: settingsClone
						});
					}}
				/>
				<ToggleControl
					label={__('Touch Move?', i18n)}
					checked={settings.touchMove}
					onChange={() => {
						const settingsClone = cloneDeep(settings);
						settingsClone.touchMove = !settingsClone.touchMove;
						setAttributes({
							settings: settingsClone
						});
					}}
				/>
				<AdvancedRangeControl
					label={__('Autoplay (second)', i18n)}
					value={(settings.autoplaySpeed / 1000)}
					step={0.3}
					onChange={(value) => {
						const settingsClone = cloneDeep(settings);
						settingsClone.autoplay = value > 0;
						settingsClone.autoplaySpeed = value * 1000;
						setAttributes({
							settings: settingsClone
						});
					}}
					min={0}
					max={4.5}
				/>
			</PanelBody>
			<PanelBody title={__('Ordering', i18n)} initialOpen={false}>
				<DragImages items={slides_data} setAttributes={setAttributes} propName="slides_data"/>
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
		this.toggleSlidesClasses = this.toggleSlidesClasses.bind(this);
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

	animatedSlides(element) {
		element.find('.rri-gift-slide__above-title').addClass('animated');
		element.find('.rri-gift-slide__title').addClass('animated');
		element.find('.rri-gift-slide__number').addClass('animated');
		element.find('.rri-gift-slide__image').addClass('animated');
	}

	removeAnimatedSlides(element) {
		element.find('.rri-gift-slide__above-title').removeClass('animated');
		element.find('.rri-gift-slide__title').removeClass('animated');
		element.find('.rri-gift-slide__number').removeClass('animated');
		element.find('.rri-gift-slide__image').removeClass('animated');
	}

	toggleSlidesClasses(currentSlideIndex, slides) {
		let nextSlideIndex, prevSlideIndex;
		const slideCount = slides.length;

		if (currentSlideIndex + 1 === slideCount) {
			nextSlideIndex = 0;
		} else {
			nextSlideIndex = currentSlideIndex + 1;
		}

		if (currentSlideIndex - 1 < 0) {
			prevSlideIndex = slideCount - 1;
		} else {
			prevSlideIndex = currentSlideIndex - 1;
		}

		jQuery(slides).each(function (index, item) {
			jQuery(item).removeClass('is-prev').removeClass('is-next');

			if (index === prevSlideIndex) {
				jQuery(item).addClass('is-prev');
			} else if (index === nextSlideIndex) {
				jQuery(item).addClass('is-next');
			}
		});
	}

	componentDidMount() {
		const self = this;
		const sliderNode = this.sliderRef.current;
		const settings = Object.assign({}, this.props.attributes.settings, {
			prevArrow: jQuery('.rri-gift-prev'),
			nextArrow: jQuery('.rri-gift-next'),
		});

		jQuery(sliderNode).on('init', function (event, slick) {
			if (slick.slideCount <= 1) {
				return;
			}

			self.toggleSlidesClasses(slick.currentSlide, slick.$slides);
		});

		jQuery(sliderNode).slick(settings);

		jQuery(sliderNode).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
			slick.$slides.each(function (index, item) {
				const slideIndex = jQuery(item).data('slick-index');

				if (slideIndex === currentSlide) {
					self.removeAnimatedSlides(jQuery(item));
				} else if (slideIndex === nextSlide) {
					self.animatedSlides(jQuery(item));
				}
			});
		});

		jQuery(sliderNode).on('afterChange', function (event, slick, currentSlide) {
			self.toggleSlidesClasses(currentSlide, slick.$slides);
		});
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const isAddNewSlides = prevProps.attributes.slides_data.length < this.props.attributes.slides_data.length;
		const isDifferentSettings = !isEqual(prevProps.attributes.settings, this.props.attributes.settings);
		const slideNode = this.sliderRef.current;
		const settings = Object.assign({}, this.props.attributes.settings, {
			prevArrow: jQuery('.rri-gift-prev'),
			nextArrow: jQuery('.rri-gift-next'),
		});

		if (isAddNewSlides || isDifferentSettings) {
			jQuery(slideNode).slick('destroy');
			jQuery(slideNode).slick(settings);

		} else if (this.decreasesSlides) {
			jQuery(slideNode).slick(settings);
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
		const {slides_data} = attributes;
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
												tagName="h3"
												className="rri-gift-slide__above-title"
												value={slide.above_title}
												onChange={(value) => {
													const slider_data_clone = cloneDeep(slides_data);
													slider_data_clone[index].above_title = value;
													setAttributes({
														slides_data: slider_data_clone
													});
												}}
											/>
											<RichText
												tagName="h2"
												className="rri-gift-slide__title"
												value={slide.name}
												onChange={(value) => {
													const slider_data_clone = cloneDeep(slides_data);
													slider_data_clone[index].name = value;
													setAttributes({
														slides_data: slider_data_clone
													});
												}}
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
	withSelect((select, {clientId}) => {
		const {getBlock} = select('core/block-editor');
		const block = getBlock(clientId);
		return {
			hasInnerBlocks: !!(block && block.innerBlocks.length),
		}
	}),
	withFocusOutside,
)(Edit);
