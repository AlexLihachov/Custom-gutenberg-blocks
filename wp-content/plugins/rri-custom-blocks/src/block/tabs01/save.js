/**
 * External dependencies
 */
import {withBlockStyles, withUniqueClass} from '../../higher-order';
import {BlockContainer} from '../../components';
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {RichText} from '@wordpress/block-editor';
import {InnerBlocks} from '@wordpress/block-editor';
import {compose} from '@wordpress/compose';
import {Fragment} from '@wordpress/element';
import createStyles from "./style";



const save = (props) => {
	const {className, attributes} = props;
	const {tabs_data} = attributes;

	return (
		<BlockContainer.Save
			className={className}
			blockProps={props}
			render={() => (
				<Fragment>
					<div className="rri-tabs01">
						<div className="tabs">
							<div className="tabs__header">
								{tabs_data.map((tab, index) => {
									return (
										<button className={index === 0 ? "tabs__tab active" : "tabs__tab"} data-activate-id={index}>{tab.name}</button>
									)
								})}
							</div>
							{tabs_data.map((tab, index) => {
								return (
									<div data-id={index} className={index === 0 ? `tabs__content tabs__content_${index} visible` : `tabs__content tabs__content_${index}`}>
										{ index === 0 ?	<InnerBlocks.Content/> :null }
									</div>
								)
							})}
						</div>
					</div>
				</Fragment>
			)}
		/>
	);
};


export default compose(
	withUniqueClass,
	withBlockStyles(createStyles)
)(save);
