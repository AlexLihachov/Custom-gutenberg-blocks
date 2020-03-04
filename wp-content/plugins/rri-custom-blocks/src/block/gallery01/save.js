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
	const {header_data, elem_data} = attributes;

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
								value={header_data.description !=="" ? header_data.description : header_data.placeholder_description}
							/>
						</div>
						<div className="rri-gallery01-grid">
							{elem_data.map((elem, index) => {
								return (
									<div className={index === 0 ? "rri-gallery01-block rri-gallery01-block_big" : "rri-gallery01-block rri-gallery01-block_small"}>
										{header_data.open_link === false && header_data.open_lightbox === false &&
										<img className="rri-gallery01-block__picture" src={elem.url}/>}
										{header_data.open_lightbox === true &&
										<a href={elem.url} data-lightbox={index}>
											<img className="rri-gallery01-block__picture" src={elem.url}/>
										</a>}
										{header_data.open_link === true &&
										<a href={elem.link}>
											<img className="rri-gallery01-block__picture" src={elem.url}/>
										</a>}
										<div className="rri-gallery01-block-info">
											<RichText.Content
												tagName="p"
												className="rri-gallery01-block-info__name"
												value={elem.name !== "" ? elem.name : elem.placeholder_name}
											/>
											<RichText.Content
												tagName="p"
												className="rri-gallery01-block-info__work"
												value={elem.sub_title !== "" ? elem.sub_title : elem.placeholder_sub_title}
											/>
										</div>
										<div className="rri-gallery01-block__more-info">
											<RichText.Content
												tagName="p"
												value={elem.description !== "" ? elem.description : elem.placeholder_description}
											/>
											{header_data.open_link === false || header_data.open_lightbox === false &&
											<div className="rri-gallery01-block__more-info-no"></div>}
											{header_data.open_lightbox === true &&
											<div className="rri-gallery01-block__more-info-plus"></div>}
											{header_data.open_link === true &&
											<div className="rri-gallery01-block__more-info-play"></div>}
										</div>
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
