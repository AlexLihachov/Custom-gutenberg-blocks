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
	const {header_data, elem_data } = attributes;

	return (
		<BlockContainer.Save
			className={className}
			blockProps={props}
			render={() => (
				<Fragment>
					<div className="rri-gallery01">
						<RichText.Content
							tagName="p"
							className="rri-gallery01__title"
							value={header_data.title}
						/>
						<div className="rri-gallery01__subtext">
							<RichText.Content
								tagName="p"
								value={header_data.description}
							/>
						</div>
						<div className="rri-gallery01-grid">
							{elem_data.map((elem, index) => {
								return (
									<div className={index === 0 ? "rri-gallery01-block rri-gallery01-block_big" : "rri-gallery01-block rri-gallery01-block_small"}>
										<a href="">
											<img className="rri-gallery01-block__picture" src="img/Image.png" alt=""/>
											<div className="rri-gallery01-block-info">
												<p className="rri-gallery01-block-info__name">John Smith</p>
												<p className="rri-gallery01-block-info__work">Company Name, CEO</p>
											</div>
											<div className="rri-gallery01-block__more-info">
												<p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
													auctor enim in nisl dapibus pulvinar fusce luctus dolor…”</p>
												<img src="img/Plus.png" alt=""/>
											</div>
										</a>
									</div>
								)
							})}
						</div>
						<RichText.Content
							tagName="button"
							className="rri-gallery01__load-more"
							value={header_data.load_more}
						/>

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
