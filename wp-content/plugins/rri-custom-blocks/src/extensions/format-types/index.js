/**
 * External dependencies
 */
import {ColorPaletteControl} from '../../components';
import {whiteIfDarkBlackIfLight} from '../../util';
import {i18n} from '../../constants';

/**
 * WordPress dependencies
 */
import {IconButton, ToggleControl, Toolbar, withFocusOutside, Popover,} from '@wordpress/components';
import {applyFormat, registerFormatType, removeFormat,} from '@wordpress/rich-text';
import {BlockControls} from '@wordpress/block-editor';
import {__} from '@wordpress/i18n';
import {Component} from '@wordpress/element';
import {compose} from '@wordpress/compose';
import domReady from '@wordpress/dom-ready';
import {dispatch, select} from '@wordpress/data';

const createApplyFormat = (textValue, color, hasBgHighlight) => {
	if (!color) {
		return removeFormat(
			textValue,
			'rri/highlight',
		)
	}

	if (!hasBgHighlight) {
		return applyFormat(
			textValue,
			{
				type: 'rri/highlight',
				attributes: {
					style: `color: ${color};`,
				},
			}
		)
	}

	return applyFormat(
		textValue,
		{
			type: 'rri/highlight',
			attributes: {
				style: `color: ${whiteIfDarkBlackIfLight('', color)}; background-color: ${color};`,
			},
		}
	)
};

class HighlightButton extends Component {
	constructor() {
		super(...arguments);
		this.state = {
			isOpen: false,
		};
		this.handleFocusOutside = this.handleFocusOutside.bind(this);
	}

	handleFocusOutside() {
		this.setState({
			isOpen: false,
		});
	}

	render() {
		const {
			activeAttributes, isActive, onChange, value,
		} = this.props;

		let currentColor = '';
		let hasBgHighlight = false;
		if (isActive) {
			const bgColor = activeAttributes.style.match(/background-color:\s*([#\d\w]+)/);
			if (bgColor) {
				hasBgHighlight = true;
				currentColor = bgColor[1];
			} else {
				const color = activeAttributes.style.match(/color:\s*([#\d\w]+)/);
				if (color) {
					currentColor = color[1];
				}
			}
		}

		return (
			<BlockControls>
				<Toolbar className="rri-components-toolbar">
					<IconButton
						className="components-button components-icon-button components-toolbar__control"
						icon="editor-textcolor"
						aria-haspopup="true"
						tooltip={__('Color & Highlight', i18n)}
						onClick={() => this.setState({isOpen: !this.state.isOpen})}
					>
                        <span className="components-rri-highlight-color__indicator"
							  style={{backgroundColor: currentColor}}/>
					</IconButton>
					{this.state.isOpen &&
					<Popover
						position="bottom center"
						className="components-rri-highlight__popover"
						focusOnMount="container"
					>
						<div className="components-rri-highlight__inner">
							<div className="rri-highlight-format__color-picker">
								<ColorPaletteControl
									value={currentColor}
									label={__('Text Color', i18n)}
									onChange={color => {
										onChange(createApplyFormat(value, color, hasBgHighlight), {withoutHistory: true})
									}}
								/>
							</div>
							<ToggleControl
								label={__('Highlight Text', i18n)}
								checked={hasBgHighlight}
								onChange={hasBgHighlight => {
									onChange(createApplyFormat(value, currentColor ? currentColor : '#8c33da', hasBgHighlight))
								}}
							/>
						</div>
					</Popover>
					}
				</Toolbar>
			</BlockControls>
		)
	}
}

registerFormatType(
	'rri/highlight', {
		title: __('Highlight Text', i18n),
		tagName: 'span',
		className: 'rri-highlight',
		edit: compose(
			withFocusOutside,
		)(HighlightButton),
		attributes: {
			style: 'style',
		},
	}
);

domReady(() => {
	// Turn off EditorsKit features to prevent duplicates.
	if (!select('core/edit-post').isFeatureActive('disableEditorsKitColorsFormats')) {
		dispatch('core/edit-post').toggleFeature('disableEditorsKitColorsFormats')
	}
	if (!select('core/edit-post').isFeatureActive('disableEditorsKitHighlightFormats')) {
		dispatch('core/edit-post').toggleFeature('disableEditorsKitHighlightFormats')
	}
});


