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
import {PanelBody, withFocusOutside, ToggleControl, SelectControl} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import {addFilter} from '@wordpress/hooks';
import {Component, Fragment, createRef} from '@wordpress/element';
import {compose} from '@wordpress/compose';

/**
 * Tabs Render
 */

addFilter('stackable.generic-slider.edit.inspector.layout.before', 'stackable/generic-slider', (output, props) => {
	return (
		<Fragment>
			{output}
		</Fragment>
	)
});

addFilter('stackable.generic-slider.edit.inspector.style.before', 'stackable/generic-slider', (output, props) => {
	const {setAttributes} = props;
	const {slidesData, settings} = props.attributes;

	return (
		<Fragment>
			{output}
			<PanelBody title={__('General', i18n)}>
				<AdvancedRangeControl
					label={__('Number of slides', i18n)}
					value={slidesData.length}
					onChange={(value) => {
						const sliderDataClone = cloneDeep(slidesData);

						if (slidesData.length < value) {
							sliderDataClone.push({
								title: '',
								quote: '',
								author: '',
								image: {
									url: '',
									id: ''
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
							});
						} else {
							sliderDataClone.pop();
						}

						setAttributes({
							slidesData: sliderDataClone
						});
					}}
					min={1}
					max={20}
				/>
				<AdvancedRangeControl
					label={__('Slides to show', i18n)}
					value={settings.slidesToShow}
					onChange={(value) => {
						const settingsClone = cloneDeep(settings);
						settingsClone.slidesToShow = value;
						setAttributes({
							settings: settingsClone
						});
					}}
					min={0}
					max={6}
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
				<AdvancedRangeControl
					label={__('Speed (second)', i18n)}
					value={(settings.speed / 1000)}
					step={0.3}
					onChange={(value) => {
						const settingsClone = cloneDeep(settings);
						settingsClone.speed = value * 1000;
						setAttributes({
							settings: settingsClone
						});
					}}
					min={0}
					max={4.5}
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
					label={__('Adaptive Height', i18n)}
					checked={settings.adaptiveHeight}
					onChange={() => {
						const settingsClone = cloneDeep(settings);
						settingsClone.adaptiveHeight = !settingsClone.adaptiveHeight;
						setAttributes({
							settings: settingsClone
						});
					}}
				/>
			</PanelBody>
			{slidesData.map((item, index) => {
				const {button} = item;
				return (
					<PanelBody title={__(`Slide ${index + 1}`, i18n)} initialOpen={false}>
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
										   const slidesDataClone = cloneDeep(slidesData);
										   slidesDataClone[index].button.design = value;
										   setAttributes({
											   slidesData: slidesDataClone
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
										   const slidesDataClone = cloneDeep(slidesData);
										   slidesDataClone[index].button.size = value;
										   setAttributes({
											   slidesData: slidesDataClone
										   });
									   }}
						/>
						<ToggleControl
							label={__('Icon', i18n)}
							checked={button.iconToggle}
							onChange={() => {
								const slidesDataClone = cloneDeep(slidesData);
								slidesDataClone[index].button.iconToggle = !slidesDataClone[index].button.iconToggle;
								setAttributes({
									slidesData: slidesDataClone
								});
							}}
						/>
						{button.iconToggle && (
							<IconControlRRI
								label={__('Icon', i18n)}
								value={button.icon}
								onChange={(value) => {
									const slidesDataClone = cloneDeep(slidesData);
									slidesDataClone[index].button.icon = value;
									setAttributes({
										slidesData: slidesDataClone
									});
								}}
							/>
						)}
					</PanelBody>
				);
			})}
			<PanelBody title={__('Ordering', i18n)} initialOpen={false}>
				<DragImages items={slidesData} setAttributes={setAttributes} propName="slidesData"/>
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
	}

	handleFocusOutside() {
		this.setState({
			openUrlPopover: null
		});
	}

	handleButtonChange(value, index, type) {
		const {attributes, setAttributes} = this.props;
		const slidesDataClone = cloneDeep(attributes.slidesData);
		slidesDataClone[index].button[type] = value;
		setAttributes({
			slidesData: slidesDataClone
		});
	}

	componentDidMount() {
		const $slider = jQuery(this.sliderRef.current);
		const settings = Object.assign({}, this.props.attributes.settings, {
			prevArrow: $slider.find('.rri-generic-slider__arrow--left'),
			nextArrow: $slider.find('.rri-generic-slider__arrow--right'),
		});

		$slider.find('.rri-generic-slider__inner').slick(settings);
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const $slider = jQuery(this.sliderRef.current);
		const isAddNewSlides = prevProps.attributes.slidesData.length < this.props.attributes.slidesData.length;
		const isDifferentSettings = !isEqual(prevProps.attributes.settings, this.props.attributes.settings);
		const settings = Object.assign({}, this.props.attributes.settings, {
			prevArrow: $slider.find('.rri-generic-slider__arrow--left'),
			nextArrow: $slider.find('.rri-generic-slider__arrow--right'),
		});

		if (isAddNewSlides || isDifferentSettings) {
			$slider.find('.rri-generic-slider__inner').slick('destroy');
			$slider.find('.rri-generic-slider__inner').slick(settings);

		} else if (this.decreasesSlides) {
			$slider.find('.rri-generic-slider__inner').slick(settings);
			this.decreasesSlides = false;
		}
	}

	getSnapshotBeforeUpdate(prevProps, prevState) {
		const isRemovedSlides = prevProps.attributes.slidesData.length > this.props.attributes.slidesData.length;
		const $slider = jQuery(this.sliderRef.current);

		if (isRemovedSlides) {
			$slider.find('.rri-generic-slider__inner').slick('destroy');
			this.decreasesSlides = true;
		}
	}

	render() {
		const {className, setAttributes, attributes} = this.props;
		const {slidesData} = attributes;
		const mainClasses = classnames([className]);

		return (
			<BlockContainer.Edit
				className={mainClasses}
				blockProps={this.props}
				render={() => (
					<div ref={this.sliderRef}>
						<div className="rri-generic-slider__inner">
							{slidesData.map((slide, index) => {
								const {button, image} = slide;

								return (
									<div className="rri-generic-slide">
										<div className="rri-generic-slide__wrapper">
											<ImageUploadPlaceholder
												imageID={image.id}
												imageURL={image.url}
												onRemove={() => {
													const sliderDataClone = cloneDeep(slidesData);
													sliderDataClone[index].image.id = '';
													sliderDataClone[index].image.url = '';
													setAttributes({
														slidesData: sliderDataClone
													});
												}}
												onChange={image => {
													const sliderDataClone = cloneDeep(slidesData);
													sliderDataClone[index].image.id = image.id;
													sliderDataClone[index].image.url = image.url;
													setAttributes({
														slidesData: sliderDataClone
													});
												}}
											/>
											<div className="rri-generic-slide__copy">
												<RichText
													tagName="h5"
													className="rri-generic-slide__titles"
													value={slide.title}
													onChange={title => {
														const sliderDataClone = cloneDeep(slidesData);
														sliderDataClone[index].title = title;
														setAttributes({
															slidesData: sliderDataClone
														});
													}}
													placeholder={__('Title', i18n)}
													keepPlaceholderOnFocus
												/>
												<RichText
													tagName="blockquote"
													className="rri-generic-slide__quote"
													value={slide.quote}
													onChange={quote => {
														const sliderDataClone = cloneDeep(slidesData);
														sliderDataClone[index].quote = quote;
														setAttributes({
															slidesData: sliderDataClone
														});
													}}
													placeholder={__('Quote', i18n)}
													keepPlaceholderOnFocus
												/>

												<RichText
													tagName="h5"
													className="rri-generic-slide__author"
													value={slide.author}
													onChange={author => {
														const sliderDataClone = cloneDeep(slidesData);
														sliderDataClone[index].author = author;
														setAttributes({
															slidesData: sliderDataClone
														});
													}}
													placeholder={__('Author', i18n)}
													keepPlaceholderOnFocus
												/>
												<div className="rri-generic-slide__cta">
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
						<div className="rri-generic-slider__arrows">
							<div className="rri-generic-slider__arrow rri-generic-slider__arrow--left"/>
							<div className="rri-generic-slider__arrow rri-generic-slider__arrow--right"/>
						</div>
					</div>
				)}/>
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
