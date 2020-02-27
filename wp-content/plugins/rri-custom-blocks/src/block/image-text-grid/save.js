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
import {compose} from '@wordpress/compose';
import {Fragment} from '@wordpress/element';
import createStyles from "./style";

const save = (props) => {
	const {className, attributes} = props;
	const {row_data, settings, descriptionTag, subtitleTag} = attributes;

	return (
		<BlockContainer.Save
			className={className}
			blockProps={props}
			render={() => (
				<Fragment>

					<div className="rri-image-text-grid">
						{row_data.map((row, index) => {
							return (
								<div className={"rri-grid-row " + row.reverse}>
									<div className={"rri-grid-block rri-grid-block_slider elem" + row.sliders.length}>
										<div className="rri-grid-block__slider">
											{row.sliders.map((slider, index) => {
												return (
													<div>
														<img className="rri-gift-slide__image"
															 src={slider.url}/>
														<RichText.Content
															tagName="p"
															className="rri-grid-block__name"
															value={slider.name}
														/>
													</div>
												);
											})}

										</div>
									</div>
									<div className="rri-grid-block rri-grid-block_more-info">
										<div className="rri-grid-block__more-info">
											<RichText.Content
												tagName="h4"
												className="rri-grid-block__sub-title"
												value={row.sub_title}
											/>
											<RichText.Content
												tagName="p"
												className="rri-grid-block__text"
												value={row.description}
											/>
										</div>
									</div>
								</div>
							);
						})}
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
