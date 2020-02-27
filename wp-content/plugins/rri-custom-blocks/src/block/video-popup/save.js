/**
 * External dependencies
 */
import {withBlockStyles, withUniqueClass} from '../../higher-order';
import {BlockContainer, DivBackground} from '../../components';

/**
 * Internal dependencies
 */
import createStyles from './style';
import {getPlayButton} from './util';

/**
 * WordPress dependencies
 */
import {applyFilters} from '@wordpress/hooks';
import classnames from 'classnames';
import {compose} from '@wordpress/compose';
import {Fragment} from '@wordpress/element';

const save = props => {
	const {className} = props;
	const {
		videoID,
		playButtonType,
		shadow = '',
	} = props.attributes;

	const mainClasses = classnames([
		className,
		'rri-video-popup--v3',
	], applyFilters('stackable.video-popup.mainclasses', {}, props));

	const boxClasses = classnames([
		'rri-video-popup__wrapper',
	], applyFilters('stackable.video-popup.boxclasses', {
		[`rri--shadow-${shadow}`]: shadow !== '',
	}, props));

	return (
		<BlockContainer.Save className={mainClasses} blockProps={props} render={() => (
			<Fragment>
				<DivBackground
					className={boxClasses}
					backgroundAttrName="preview%s"
					blockProps={props}
					data-video={videoID}
				>
					{ /* eslint-disable-next-line */}
					<a href="#" className="rri-video-popup__overlay"/>
					<span className="rri-video-popup__play-button">
						<i className="icon icon-Play-2"/>
						{/* Currently use icon from theme */}
						{/*{getPlayButton(playButtonType)}*/}
					</span>
				</DivBackground>
			</Fragment>
		)}/>
	)
};

export default compose(
	withUniqueClass,
	withBlockStyles(createStyles),
)(save);
