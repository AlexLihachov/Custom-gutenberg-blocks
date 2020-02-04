/**
 * Internal dependencies
 */
import createStyles from './style';
import {showOptions} from './util';

/**
 * External dependencies
 */
import classnames from 'classnames';
import {BlockContainer, DivBackground} from '../../components';
import {withBlockStyles, withUniqueClass} from '../../higher-order';

/**
 * WordPress dependencies
 */
import {applyFilters} from '@wordpress/hooks';
import {InnerBlocks} from '@wordpress/block-editor';
import {Fragment} from '@wordpress/element';
import {compose} from '@wordpress/compose';

const save = props => {
	const {className} = props;
	const {
		design = '',
		shadow = '',
		contentWidth = 100,
		restrictContentWidth = false,
		uniqueClass = '',
	} = props.attributes;

	const show = showOptions(props);

	const mainClasses = classnames([
		className,
		'rri-container--v2',
		`rri-container--design-${design}`,
	], applyFilters('stackable.container.mainclasses', {
		'rri-container--width-small': contentWidth <= 50,
	}, props));

	const wrapperClasses = classnames([
		'rri-container__wrapper',
		`${uniqueClass}-wrapper`,
	], applyFilters('stackable.container.wrapperClasses', {
		[`rri--shadow-${shadow}`]: shadow !== '',
		'rri--restrict-content-width': show.restrictContent && restrictContentWidth,
	}, props));

	const contentWrapperClasses = classnames([
		'rri-container__content-wrapper',
		`${uniqueClass}-content-wrapper`,
	], {
		'rri-content-wrapper': show.restrictContent && restrictContentWidth, // We need this for .rri--restrict-content-width to work.
	});

	return (
		<BlockContainer.Save className={mainClasses} blockProps={props} render={() => (
			<Fragment>
				<DivBackground
					className={wrapperClasses}
					backgroundAttrName="column%s"
					blockProps={props}
					showBackground={show.columnBackground}
				>
					{applyFilters('stackable.container.save.wrapper.output', null, props)}
					<div className="rri-container__side">
						<div className={contentWrapperClasses}>
							<InnerBlocks.Content/>
						</div>
					</div>
				</DivBackground>
			</Fragment>
		)}/>
	)
};

export default compose(
	withUniqueClass,
	withBlockStyles(createStyles),
)(save);
