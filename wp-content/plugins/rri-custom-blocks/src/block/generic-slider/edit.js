/**
 * External dependencies
 */
import {cloneDeep, isEqual} from 'lodash';

import {
	ImageUploadPlaceholder,
	BlockContainer,
	AdvancedRangeControl,
	DragImages
} from '../../components';

import {
	withUniqueClass,
	withSetAttributeHook,
	withTabbedInspector,
	withBlockStyles,
	withClickOpenInspector,
} from '../../higher-order';

import classnames from 'classnames';
import {i18n} from '../../constants'

/**
 * Internal dependencies
 */
import createStyles from './style'

/**
 * WordPress dependencies
 */
import {RichText} from '@wordpress/block-editor'
import {PanelBody, withFocusOutside, ToggleControl} from '@wordpress/components'
import {__} from '@wordpress/i18n'
import {addFilter} from '@wordpress/hooks'
import {Component, Fragment, createRef} from '@wordpress/element'
import {compose} from '@wordpress/compose'
import {withSelect} from '@wordpress/data'

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
								title: __('Title', i18n),
								quote: __('Quote', i18n),
								author: __('Author', i18n),
								image: {
									url: '',
									id: ''
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
			<PanelBody title={__('Ordering', i18n)}>
				<DragImages items={slidesData} setAttributes={setAttributes}/>
			</PanelBody>
		</Fragment>
	);
});

class Edit extends Component {
	constructor() {
		super(...arguments);
		this.state = {
			selectedBox: null,
		};
		this.sliderRef = createRef();
		this.handleFocusOutside = this.handleFocusOutside.bind(this);
		this.decreasesSlides = false;
	}

	handleFocusOutside() {
		this.setState({
			selectedBox: null,
		});
	}

	componentDidMount() {
		jQuery(this.sliderRef.current).slick(this.props.attributes.settings);
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const isAddNewSlides = prevProps.attributes.slidesData.length < this.props.attributes.slidesData.length;
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
		const isRemovedSlides = prevProps.attributes.slidesData.length > this.props.attributes.slidesData.length;
		const slideNode = this.sliderRef.current;

		if (isRemovedSlides) {
			jQuery(slideNode).slick('destroy');
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
					<Fragment>
						<div className="rri-generic-slider__inner" ref={this.sliderRef}>
							{slidesData.map((slide, index) => {
								const itemClasses = classnames([
									'rri-generic-slide',
									`rri-generic-slide${index}`,
								]);

								return (
									<div className={itemClasses}
										 key={index}
										 onMouseDown={() => {
											 this.setState({selectedBox: index});
										 }}
										 role="button"
										 tabIndex="0">
										<div className="rri-generic-slide__wrapper">
											<ImageUploadPlaceholder
												imageID={slide.image.id}
												imageURL={slide.image.url}
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
	withClickOpenInspector([
		['.rri-generic-slide__titles', 'title'],
		['.rri-generic-slide__quote', 'quote'],
		['.rri-generic-slide__author', 'author'],
	]),
	withSelect((select, {clientId}) => {
		const {getBlock} = select('core/block-editor');
		const block = getBlock(clientId);
		return {
			hasInnerBlocks: !!(block && block.innerBlocks.length),
		}
	}),
	withFocusOutside,
)(Edit);
