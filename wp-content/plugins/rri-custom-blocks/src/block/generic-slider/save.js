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
	const {slidesData, settings} = attributes;

	return (
		<BlockContainer.Save
			className={className}
			blockProps={props}
			data-settings={JSON.stringify(settings)}
			render={() => (
				<Fragment>
					<div className="rri-generic-slider__inner">
						{slidesData.map((slide, index) => {
							const itemClasses = classnames([
								'rri-generic-slide',
								`rri-generic-slide${index}`,
							]);
							const title = slide.title;
							const quote = slide.quote;
							const author = slide.author;
							const imageUrl = slide.image.url;
							return (
								<div
									className={itemClasses}
									key={index}
									style={{
										backgroundImage: `url(${imageUrl})`
									}}>
									<div className="rri-generic-slide__wrapper">
										<div className="rri-generic-slide__copy">
											<RichText.Content
												tagName="h5"
												className="rri-generic-slide__titles"
												value={title}
											/>
											<RichText.Content
												tagName="blockquote"
												className="rri-generic-slide__quote"
												value={quote}
											/>
											<RichText.Content
												tagName="h5"
												className="rri-generic-slide__author"
												value={author}
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
