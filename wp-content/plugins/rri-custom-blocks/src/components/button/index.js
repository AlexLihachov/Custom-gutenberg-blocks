/**
 * WordPress dependencies
 */
import {Component} from '@wordpress/element';

/**
 * External dependencies
 */
import classnames from 'classnames';
import {i18n} from '../../constants';

class Button extends Component {
	constructor() {
		super(...arguments);
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
};

export default Button;
