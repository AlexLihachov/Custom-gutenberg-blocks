/**
 * External dependencies
 */
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';

import {
	DesignPanelBody,
	ImageUploadPlaceholder,
	ProControlButton,
	ContentAlignControl,
	BlockContainer,
	ColorPaletteControl,
	BackgroundControlsHelper,
	PanelAdvancedSettings,
	TypographyControlHelper,
	ResponsiveControl,
	AlignButtonsControl,
	HeadingButtonsControl,
	PanelSpacingBody,
	AdvancedRangeControl,
	ImageBackgroundControlsHelper,
	AdvancedToolbarControl,
	UrlInputPopover
} from '../../components';

import {
	createTypographyAttributeNames,
	createBackgroundAttributeNames,
	createResponsiveAttributeNames,
	cacheImageData,
	getImageUrlFromCache,
} from '../../util';

import {
	withUniqueClass,
	withSetAttributeHook,
	withGoogleFont,
	withTabbedInspector,
	withContentAlignReseter,
	withBlockStyles,
	withClickOpenInspector,
} from '../../higher-order';

import classnames from 'classnames';
import {i18n} from '../../constants'
import {range} from 'lodash';

/**
 * Internal dependencies
 */
import createStyles from './style'

/**
 * WordPress dependencies
 */
import {RichText} from '@wordpress/block-editor'
import {
	PanelBody,
	SelectControl,
	withFocusOutside,
} from '@wordpress/components'
import {__} from '@wordpress/i18n'
import {addFilter, applyFilters} from '@wordpress/hooks'
import {Component, Fragment, createRef} from '@wordpress/element'
import {compose} from '@wordpress/compose'
import {withSelect} from '@wordpress/data'

/**
 * Tab Style
 */

class Drag extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
		};

		this.onSortEnd = this.onSortEnd.bind(this);
	}

	onSortEnd({oldIndex, newIndex}) {
		this.setState(({items}) => ({
			items: arrayMove(items, oldIndex, newIndex),
		}));
	}

	render() {
		const SortableItem = SortableElement(({value}) => <li>{value}</li>);

		const SortableList = SortableContainer(({items}) => {
			return (
				<ul>
					{items.map((value, index) => (
						<SortableItem key={`item-${value}`} index={index} value={value}/>
					))}
				</ul>
			);
		});

		return <SortableList items={this.state.items} onSortEnd={this.onSortEnd}/>;
	}
}

addFilter('stackable.generic-slider.edit.inspector.layout.before', 'stackable/generic-slider', (output, props) => {
	return (
		<Fragment>
			{output}
		</Fragment>
	)
});

addFilter('stackable.generic-slider.edit.inspector.style.before', 'stackable/generic-slider', (output, props) => {
	const {setAttributes} = props;

	const {
		slides,
	} = props.attributes;

	return (
		<Fragment>
			{output}
			<PanelBody title={__('General', i18n)}>
				<AdvancedRangeControl
					label={__('Number of slides', i18n)}
					value={slides}
					onChange={slides => setAttributes({slides})}
					min={1}
					max={20}
					className="rri--help-tip-general-columns"
				/>
			</PanelBody>
			<PanelBody title={__('Ordering', i18n)}>
				<Drag/>
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
		this.slickSettings = {
			adaptiveHeight: true
		}
		this.decreasesSlides = false;
	}

	handleFocusOutside() {
		this.setState({
			selectedBox: null,
		})
	}

	componentDidMount() {
		// Init slider
		jQuery(this.sliderRef.current).slick(this.slickSettings);
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		// re-init slider on adding new slides
		if (prevProps.attributes.slides < this.props.attributes.slides) {
			jQuery(this.sliderRef.current).slick('destroy');
			jQuery(this.sliderRef.current).slick(this.slickSettings);

			//
		} else if (this.decreasesSlides) {
			jQuery(this.sliderRef.current).slick(this.slickSettings);
			this.decreasesSlides = false;
		}
	}

	getSnapshotBeforeUpdate(prevProps, prevState) {
		if (prevProps.attributes.slides > this.props.attributes.slides) {
			jQuery(this.sliderRef.current).slick('destroy');
			this.decreasesSlides = true;
		}
	}

	render() {
		const {
			className,
			setAttributes,
			attributes,
		} = this.props;

		const {
			slides,
			uniqueClass
		} = attributes;

		const mainClasses = classnames([
			className
		]);

		return (
			<BlockContainer.Edit
				className={mainClasses}
				blockProps={this.props}

				render={() => (
					<Fragment>
						<div className="rri-generic-slider__inner" ref={this.sliderRef}>
							{range(1, slides + 1).map((i) => {
								const itemClasses = classnames([
									'rri-generic-slide',
									`rri-generic-slide${i}`,
								]);

								return (
									<div className={itemClasses}
										 key={i}
										 onMouseDown={() => {
											 this.setState({selectedBox: i});
										 }}
										 role="button"
										 tabIndex="0">
										<div className="rri-generic-slide__wrapper">
											<ImageUploadPlaceholder
												imageID={attributes[`image${i}Id`]}
												imageURL={attributes[`image${i}Url`]}
												onRemove={() => {
													setAttributes({
														[`image${i}Id`]: '',
														[`image${i}Url`]: '',
														[`image${i}FullWidth`]: '',
														[`image${i}FullHeight`]: '',
														[`image${i}FullUrl`]: '',
													})
												}}
												onChange={image => {
													setAttributes({
														[`image${i}Id`]: image.id,
														[`image${i}Url`]: image.url,
														[`image${i}FullWidth`]: image.sizes.full.width,
														[`image${i}FullHeight`]: image.sizes.full.height,
														[`image${i}FullUrl`]: image.sizes.full.url,
													})
												}}
											/>
											<div className="rri-generic-slide__copy">
												<RichText
													tagName="h5"
													className="rri-generic-slide__titles"
													value={attributes[`title${i}`]}
													onChange={title => setAttributes({[`title${i}`]: title})}
													placeholder={__('Title', i18n)}
													keepPlaceholderOnFocus
												/>
												<RichText
													tagName="blockquote"
													className="rri-generic-slide__quote"
													value={attributes[`quote${i}`]}
													onChange={quote => setAttributes({[`quote${i}`]: quote})}
													placeholder={__('Quote', i18n)}
													keepPlaceholderOnFocus
												/>

												<RichText
													tagName="h5"
													className="rri-generic-slide__author"
													value={attributes[`author${i}`]}
													onChange={author => setAttributes({[`author${i}`]: author})}
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
		const {
			getBlock,
		} = select('core/block-editor');

		const block = getBlock(clientId);

		return {
			hasInnerBlocks: !!(block && block.innerBlocks.length),
		}
	}),
	withFocusOutside,
)(Edit);
