/**
 * External dependencies
 */
import {cloneDeep, isEqual} from 'lodash';

import {
	ImageUploadPlaceholder,
	BlockContainer,
	AdvancedRangeControl,
	DragImages,
	Button,
	IconControlRRI
} from '../../components';

import {
	withUniqueClass,
	withSetAttributeHook,
	withTabbedInspector,
	withBlockStyles
} from '../../higher-order';

import classnames from 'classnames';
import {i18n} from '../../constants';

import {HeroSliderLeftArrow, HeroSliderRightArrow} from '../../icons';

/**
 * Internal dependencies
 */
import createStyles from './style';

/**
 * WordPress dependencies
 */
import {RichText} from '@wordpress/block-editor';
import {PanelBody, withFocusOutside, ToggleControl, SelectControl} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import {addFilter} from '@wordpress/hooks';
import {Component, Fragment, createRef} from '@wordpress/element';
import {compose} from '@wordpress/compose';

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
	const {slides_data, settings, hideControls} = props.attributes;

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
							slider_data_clone.push(
								{
									title: '',
									copy: '',
									image: {
										url: `${window.rriData.srcUrl}/src/block/hero-slider/images/hero-slider-placeholder-1.png`,
										id: ''
									},
									params: {
										align: 'left'
									},
									button: {
										url: '',
										newTab: false,
										noFollow: false,
										text: '',
										design: 'primary',
										size: 'medium',
										iconToggle: false,
									}
								}
							);
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
					label={__('Hide Controls?', i18n)}
					checked={hideControls}
					onChange={() => {
						const settingsClone = cloneDeep(settings);
						const hideControlsClone = !hideControls;

						settingsClone.dots = !hideControlsClone;
						settingsClone.arrows = !hideControlsClone;
						settingsClone.responsive[0].settings.dots = !hideControlsClone;

						setAttributes({
							hideControls: hideControlsClone,
							settings: settingsClone
						});
					}}
				/>
			</PanelBody>

			{slides_data.map((item, index) => {
				const {button} = item;
				const {align} = item.params;

				return (
					<PanelBody title={__(`Slide ${index + 1}`, i18n)} initialOpen={false}>
						<SelectControl label={__('Align Text', i18n)}
									   options={[
										   {value: 'left', label: __('Left', i18n)},
										   {value: 'center', label: __('Center', i18n)},
										   {value: 'right', label: __('Right', i18n)}
									   ]}
									   value={align}
									   onChange={(value) => {
										   const slides_data_clone = cloneDeep(slides_data);
										   slides_data_clone[index].params.align = value;
										   setAttributes({
											   slides_data: slides_data_clone
										   });
									   }}
						/>
						<SelectControl label={__('Design', i18n)}
									   options={[
										   {value: 'primary', label: __('Primary', i18n)},
										   {value: 'secondary', label: __('Secondary', i18n)},
										   {value: 'transparent_dark', label: __('Transparent Dark', i18n)},
										   {value: 'transparent_light', label: __('Transparent Light', i18n)},
										   {value: 'transparent_over', label: __('Transparent over image', i18n)},
									   ]}
									   value={button.design}
									   onChange={(value) => {
										   const slides_data_clone = cloneDeep(slides_data);
										   slides_data_clone[index].button.design = value;
										   setAttributes({
											   slides_data: slides_data_clone
										   });
									   }}
						/>
						<SelectControl label={__('Size', i18n)}
									   options={[
										   {value: 'small', label: __('Small', i18n)},
										   {value: 'medium', label: __('Medium', i18n)},
										   {value: 'large', label: __('Large', i18n)},
									   ]}
									   value={button.size}
									   onChange={(value) => {
										   const slides_data_clone = cloneDeep(slides_data);
										   slides_data_clone[index].button.size = value;
										   setAttributes({
											   slides_data: slides_data_clone
										   });
									   }}
						/>
						<ToggleControl
							label={__('Icon', i18n)}
							checked={button.iconToggle}
							onChange={() => {
								const slides_data_clone = cloneDeep(slides_data);
								slides_data_clone[index].button.iconToggle = !slides_data_clone[index].button.iconToggle;
								setAttributes({
									slides_data: slides_data_clone
								});
							}}
						/>
						{button.iconToggle && (
							<IconControlRRI
								label={__('Icon', i18n)}
								value={button.icon}
								onChange={(value) => {
									const slides_data_clone = cloneDeep(slides_data);
									slides_data_clone[index].button.icon = value;
									setAttributes({
										slides_data: slides_data_clone
									});
								}}
							/>
						)}
					</PanelBody>
				);
			})}
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
			openUrlPopover: null
		};
		this.sliderRef = createRef();
		this.decreasesSlides = false;
		this.handleFocusOutside = this.handleFocusOutside.bind(this);
		this.handleButtonChange = this.handleButtonChange.bind(this);
		this.addAnimations = this.addAnimations.bind(this);
		this.removeAnimations = this.removeAnimations.bind(this);
	}

	handleFocusOutside() {
		this.setState({
			openUrlPopover: null
		});
	}

	addAnimations($slider) {
		$slider.find('.slick-current .rri-hero-slide__bg').addClass('animated');
		$slider.find('.slick-current .rri-hero-slide__title').addClass('animated');
		$slider.find('.slick-current .rri-hero-slide__copy').addClass('animated');
		$slider.find('.slick-current .rri-hero-slide__cta').addClass('animated');
	}

	removeAnimations($slider) {
		$slider.find('.slick-current .rri-hero-slide__bg').removeClass('animated');
		$slider.find('.slick-current .rri-hero-slide__title').removeClass('animated');
		$slider.find('.slick-current .rri-hero-slide__copy').removeClass('animated');
		$slider.find('.slick-current .rri-hero-slide__cta').removeClass('animated');
	}

	handleButtonChange(value, index, type) {
		const {attributes, setAttributes} = this.props;
		const slides_data_clone = cloneDeep(attributes.slides_data);
		slides_data_clone[index].button[type] = value;
		setAttributes({
			slides_data: slides_data_clone
		});
	}

	componentDidMount() {
		const self = this;
		const $slider = jQuery(this.sliderRef.current);
		const settings = Object.assign({}, this.props.attributes.settings, {
			prevArrow: $slider.find('.rri-hero-slider__arrow--prev'),
			nextArrow: $slider.find('.rri-hero-slider__arrow--next'),
		});

		// Init handler
		$slider.find('.rri-hero-slider__inner').on('init', function () {
			self.addAnimations($slider);
		});

		// Setup
		$slider.find('.rri-hero-slider__inner').slick(settings);

		// Change handlers
		$slider.find('.rri-hero-slider__inner').on('beforeChange', function (event, slick, currentSlide) {
			self.removeAnimations($slider);

		});

		$slider.find('.rri-hero-slider__inner').on('afterChange', function (event, slick, currentSlide) {
			self.addAnimations($slider);
		});
	}

	getSnapshotBeforeUpdate(prevProps, prevState) {
		const isRemovedSlides = prevProps.attributes.slides_data.length > this.props.attributes.slides_data.length;
		const $slider = jQuery(this.sliderRef.current);

		if (isRemovedSlides) {
			$slider.find('.rri-hero-slider__inner').slick('destroy');
			this.decreasesSlides = true;
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const $slider = jQuery(this.sliderRef.current);
		const isAddNewSlides = prevProps.attributes.slides_data.length < this.props.attributes.slides_data.length;
		const settings = Object.assign({}, this.props.attributes.settings, {
			prevArrow: $slider.find('.rri-hero-slider__arrow--prev'),
			nextArrow: $slider.find('.rri-hero-slider__arrow--next'),
		});
		let isDifferentSettings = false;

		// Check is changes settings
		if (!isEqual(prevProps.attributes.settings, this.props.attributes.settings)) {
			isDifferentSettings = true;
		} else if (isAddNewSlides === false && this.decreasesSlides === false) {
			for (let i = 0; i < prevProps.attributes.slides_data.length; i++) {
				if (!isEqual(prevProps.attributes.slides_data[i].params, this.props.attributes.slides_data[i].params)) {
					isDifferentSettings = true;
					break;
				}
			}
		}

		if (isAddNewSlides || isDifferentSettings) {
			$slider.find('.rri-hero-slider__inner').slick('destroy');
			$slider.find('.rri-hero-slider__inner').slick(settings);
		} else if (this.decreasesSlides) {
			$slider.find('.rri-hero-slider__inner').slick(settings);
			this.decreasesSlides = false;
		}
	}

	render() {
		const {className, setAttributes, attributes} = this.props;
		const {slides_data, hideControls} = attributes;
		const mainClasses = classnames([className]);

		return (
			<BlockContainer.Edit
				className={mainClasses}
				blockProps={this.props}
				render={() => (
					<div className="rri-hero-slider__wrapper" ref={this.sliderRef}>
						<div className="rri-hero-slider__inner">
							{slides_data.map((item, index) => {
								const {title, copy, button, image} = item;
								const {align} = item.params;
								const slideClasses = classnames(['rri-hero-slide', `rri-hero-slide--${align}`]);

								return (
									<div className={slideClasses}>
										<ImageUploadPlaceholder
											imageID={image.id}
											imageURL={image.url}
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
										<div className="rri-hero-slide__wrapper">
											<div className="rri-hero-slide__content">
												<div className="rri-hero-slide__title">
													<RichText
														tagName="h2"
														placeholder={__('Title', i18n)}
														value={title}
														onChange={(value) => {
															const slider_data_clone = cloneDeep(slides_data);
															slider_data_clone[index].title = value;
															setAttributes({
																slides_data: slider_data_clone
															});
														}}
														keepPlaceholderOnFocus
													/>
												</div>
												<div className="rri-hero-slide__copy">
													<RichText
														tagName='p'
														placeholder={__('Copy', i18n)}
														value={copy}
														onChange={(value) => {
															const slider_data_clone = cloneDeep(slides_data);
															slider_data_clone[index].copy = value;
															setAttributes({
																slides_data: slider_data_clone
															});
														}}
														keepPlaceholderOnFocus
													/>
												</div>
												<div className="rri-hero-slide__cta">
													<Button
														{...button}
														index={index}
														isEdit={true}
														openUrlPopover={this.state.openUrlPopover}
														handleClick={() => this.setState({openUrlPopover: index})}
														handleChange={this.handleButtonChange}
													/>
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</div>
						{hideControls === false && (
							<Fragment>
								<div className="rri-hero-slider__arrow rri-hero-slider__arrow--prev">
									<HeroSliderLeftArrow/>
								</div>
								<div className="rri-hero-slider__arrow rri-hero-slider__arrow--next">
									<HeroSliderRightArrow/>
								</div>
							</Fragment>
						)}
					</div>
				)}
			/>
		);
	}
}

export default compose(
	withUniqueClass,
	withSetAttributeHook,
	withTabbedInspector(),
	withBlockStyles(createStyles, {editorMode: true}),
	withFocusOutside,
)(Edit);
