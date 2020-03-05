/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
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
	}

	render() {
		let output = '';
		let {
			index, isEdit, design, size, text, url, newTab, noFollow, iconToggle, icon, openUrlPopover, className,
			handleClick, handleChange
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
				className
			]);

		/**
		 * Edit html
		 * */

		if (isEdit) {
			output = (
				<div className={itemClasses} onClick={handleClick}>
					<RichText
						tagName="span"
						placeholder={__('Click Here', i18n)}
						className="rri-gift-slide__cta-text"
						value={text}
						onChange={(value) => handleChange(value, index, 'text')}
						keepPlaceholderOnFocus
					/>
					{iconToggle && (
						<span className={icon}/>
					)}
					{openUrlPopover === index && <UrlInputPopover
						value={url}
						newTab={newTab}
						noFollow={noFollow}
						onChange={(value) => handleChange(value, index, 'url')}
						onChangeNewTab={(value) => handleChange(value, index, 'newTab')}
						onChangeNoFollow={(value) => handleChange(value, index, 'noFollow')}
					/>}
				</div>
			);
		} else {

			/**
			 * Save html
			 * */
			text = text !== '' ? text : 'Click here';

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
	index: 0,
	url: '',
	newTab: false,
	noFollow: false,
	text: '',
	design: 'primary',
	size: 'small',
	iconToggle: false,
	icon: '',
	isEdit: false,
	openUrlPopover: false,
	className: '',
	handleClick: () => {
	},
	handleChange: () => {
	}
};

export default Button;
