/**
 * External dependencies
 */
import classnames from 'classnames';

const InspectorPanelControls = props => {
	const mainClasses = classnames([
		'rri-inspector-panel-controls',
		`rri-panel-${props.tab}`,
	]);

	return (
		<div className={mainClasses}>
			{props.children}
		</div>
	)
};

InspectorPanelControls.defaultProps = {
	tab: 'layout',
};

export default InspectorPanelControls;
