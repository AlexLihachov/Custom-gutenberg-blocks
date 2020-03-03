/**
 * WordPress dependencies
 */
import {Component} from '@wordpress/element';
import {RichText} from '@wordpress/block-editor';

/**
 * External dependencies
 */
import classnames from 'classnames';
import {i18n} from '../../constants';

import {UrlInputPopover} from '../../components';

class Button extends Component {
	constructor() {
		super(...arguments);
		this.state = {
			openUrlPopover: false
		};
	}

	render() {
		let output = '';
		const {
			isEdit, design, size, text, url, newTab, noFollow, iconToggle, icon,
			onTextChange, onChangeUrl, onChangeNewTab, onChangeNoFollow
		} = this.props;
		const rel = [];

		if (newTab) {
			rel.push('noopener');
			rel.push('noreferrer')
		}
		if (noFollow) {
			rel.push('nofollow')
		}

		const itemClasses =
			classnames([
				'rri-buttons__item',
				`rri-buttons__item_${design}`,
				`rri-buttons__item_${size}`,
			]);

		// Edit Html
		if (isEdit) {
			output = (
				<div className={itemClasses} onClick={() => this.setState({openUrlPopover: true})}>
					<RichText
						tagName="span"
						className="rri-gift-slide__cta-text"
						value={text}
						onChange={(value) => onTextChange(value)}

						keepPlaceholderOnFocus
					/>
					{iconToggle && (
						<span className={icon}/>
					)}
					{this.state.openUrlPopover && <UrlInputPopover
						value={url}
						newTab={newTab}
						noFollow={noFollow}
						onChange={(value) => onChangeUrl(value)}
						onChangeNewTab={(value) => onChangeNewTab(value)}
						onChangeNoFollow={(value) => onChangeNoFollow(value)}
					/>}
				</div>
			);
		} else {
			// Save html
			output = (
				<a className={itemClasses}
				   href={url}
				   target={newTab ? '_blank' : undefined}
				   rel={rel.join(' ') || undefined}
				>
					<RichText.Content
						tagName="span"
						value={text}
					/>
					{iconToggle && (
						<span className={icon}/>
					)}
				</a>
			);
		}

		return output;
	}
}

Button.defaultProps = {
	url: '',
	newTab: false,
	noFollow: false,
	text: '',
	design: 'primary',
	size: 'small',
	iconToggle: false,
	icon: '',
	isEdit: false,
	onTextChange: () => {
	},
	onChangeUrl: () => {
	},
	onChangeNewTab: () => {
	},
	onChangeNoFollow: () => {
	},
};

export default Button;
