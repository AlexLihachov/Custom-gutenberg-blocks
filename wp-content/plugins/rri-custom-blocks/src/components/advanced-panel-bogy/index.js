// AdvancedPanelBody

/**
 * WordPress dependencies
 */
import {Component, Fragment,} from '@wordpress/element';
import {PanelBody} from '@wordpress/components';
import classnames from "classnames";
import PanelAdvancedSettings from "../panel-advanced-settings";
import {i18n} from "../../constants";
import {__} from '@wordpress/i18n';

class AdvancedPanelBody extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isModified: false
		};
		this.isAlreadyModified = false;
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (false === this.isAlreadyModified) {
			this.setState({
				isModified: true
			});

			this.isAlreadyModified = true;
		}
	}

	render() {
		const {className, children, ...props} = this.props;
		const mainClasses = classnames([
			this.props.className,
			'rri-toggle-panel-body'
		], {
			'panelbody-with-indicator': this.state.isModified
		});

		return (
			<PanelBody className={mainClasses} {...props}>
				{this.props.children}
			</PanelBody>
		);
	}
}

AdvancedPanelBody.defaultProps = {
	id: '',
	className: '',
	title: __('Settings', i18n),
	checked: false,
	onChange: null,
	initialOpen: false,
	hasToggle: true,
	initialAdvanced: false,
	advancedChildren: null,
	toggleOnSetAttributes: [],
	toggleAttributeName: '',
};

export default AdvancedPanelBody;
