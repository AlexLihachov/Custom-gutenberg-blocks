/**
 * Internal dependencies
 */
import {separators, shadows} from './separators'

/**
 * External dependencies
 */
import classnames from 'classnames'

const Separator = props => {
	const SeparatorComp = separators[props.design]
	const ShadowComp = shadows[props.design]

	const mainClasses = classnames([
		props.className,
		'rri-separator-wrapper',
	])

	return (
		<div className={mainClasses}>
			{props.shadow && (
				<ShadowComp
					className="rri-separator__shadow"
					preserveAspectRatio="none"
					aria-hidden="true"
				/>
			)}
			<SeparatorComp
				className="rri-separator__layer-1"
				preserveAspectRatio="none"
				aria-hidden="true"
			/>
			{props.children}
		</div>
	)
}

Separator.defaultProps = {
	className: '',
	design: 'wave-1',
	shadow: false,
}

Separator.Save = props => <Separator {...props} />

export default Separator
