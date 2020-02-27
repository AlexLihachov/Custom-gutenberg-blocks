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
	HeadingButtonsControl,
	ColorPaletteControl
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
import {PanelBody, withFocusOutside, ToggleControl, SelectControl} from '@wordpress/components';
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
									title: __('Lorem et dolor ipsum', i18n),
									copy: __('Lorem ipsum dolor sit amet, consectetur adipiscing elit aenean vehicula lacus sit amet fringilla.', i18n),
									image: {
										url: 'https://local.test.com/wp-content/uploads/2020/02/Image.png',
										id: ''
									},
									params: {
										align: 'left'
									},
									button: {
										url: '',
										newTab: false,
										noFollow: false,
										text: 'Link',
										design: 'primary',
										size: 'small'
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
										   {value: 'secondary', label: __('Secondary', i18n)}
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
										   {value: 'large', label: __('Large', i18n)}
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
		this.sliderRef = createRef();
		this.decreasesSlides = false;
	}

	componentDidMount() {
		const $slider = jQuery(this.sliderRef.current);
		const settings = Object.assign({}, this.props.attributes.settings, {
			prevArrow: $slider.find('.rri-hero-slider__arrow--prev'),
			nextArrow: $slider.find('.rri-hero-slider__arrow--next'),
		});
		$slider.find('.rri-hero-slider__inner').slick(settings);
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
		const isDifferentSettings = !isEqual(prevProps.attributes.settings, this.props.attributes.settings);
		const settings = Object.assign({}, this.props.attributes.settings, {
			prevArrow: $slider.find('.rri-hero-slider__arrow--prev'),
			nextArrow: $slider.find('.rri-hero-slider__arrow--next'),
		});

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
		const {slides_data} = attributes;
		const mainClasses = classnames([className]);

		return (
			<BlockContainer.Edit
				className={mainClasses}
				blockProps={this.props}
				render={() => (
					<div className="rri-hero-slider__wrapper" ref={this.sliderRef}>
						<div className="rri-hero-slider__inner">
							{slides_data.map((item, index) => {
								const {title, copy, button} = item;
								const {align} = item.params;
								const slideClasses = classnames(['rri-hero-slide', `rri-hero-slide--${align}`]);
								const ctaClasses = classnames([
									'rri-hero-slide__cta',
									`rri-hero-slide__cta--${button.size}`,
									`rri-hero-slide__cta--${button.design}`
								]);

								return (
									<div className={slideClasses}
										 style={{
											 backgroundImage: `url(${item.image.url})`
										 }}>
										<div className="rri-hero-slide__wrapper">
											<div className="rri-hero-slide__content">
												<RichText
													tagName="h2"
													className="rri-hero-slide__title"
													value={title}
													onChange={(value) => {
														const slider_data_clone = cloneDeep(slides_data);
														slider_data_clone[index].title = value;
														setAttributes({
															slides_data: slider_data_clone
														});
													}}
												/>
												<RichText
													tagName='p'
													className="rri-hero-slide__copy"
													value={copy}
													onChange={(value) => {
														const slider_data_clone = cloneDeep(slides_data);
														slider_data_clone[index].copy = value;
														setAttributes({
															slides_data: slider_data_clone
														});
													}}
												/>
												<div className={ctaClasses}>
													<RichText
														tagName="span"
														className="rri-hero-slide__cta-text"
														value={button.text}
														onChange={(value) => {
															const slider_data_clone = cloneDeep(slides_data);
															slider_data_clone[index].button.text = value;
															setAttributes({
																slides_data: slider_data_clone
															});
														}}
													/>
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</div>
						<div className="rri-hero-slider__arrows">
							<div className="rri-hero-slider__arrow rri-hero-slider__arrow--prev"/>
							<div className="rri-hero-slider__arrow rri-hero-slider__arrow--next"/>
						</div>
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
	// withSelect((select, {clientId}) => {
	// 	const {getBlock} = select('core/block-editor');
	// 	const block = getBlock(clientId);
	// 	return {
	// 		hasInnerBlocks: !!(block && block.innerBlocks.length),
	// 	}
	// }),
	withFocusOutside,
)(Edit);
