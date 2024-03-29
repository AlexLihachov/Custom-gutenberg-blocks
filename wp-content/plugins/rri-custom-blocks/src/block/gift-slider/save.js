/**
 * External dependencies
 */
import {withBlockStyles, withUniqueClass} from '../../higher-order';
import {BlockContainer} from '../../components';

/**
 * WordPress dependencies
 */
import {RichText} from '@wordpress/block-editor';
import {compose} from '@wordpress/compose';
import {Fragment} from '@wordpress/element';
import createStyles from "./style";

const save = (props) => {
	const {className, attributes} = props;
	const {slides_data, settings} = attributes;

	return (
		<BlockContainer.Save
			className={className}
			blockProps={props}
			render={() => (
				<Fragment>
					<div className="rri-gift-slider__inner"
						 data-settings={JSON.stringify(settings)}>
						{slides_data.map((slide) => {
							const linkTarget = slide.link.newTab ? '_blank' : '_self';
							const rel = ['noopener', 'noreferrer'];
							const above_title = slide.above_title !== '' ? slide.above_title : 'Above title';
							const name = slide.name !== '' ? slide.name : 'Title';
							const number = slide.number !== '' ? slide.number : 'Number';
							const button_text = slide.link.text !== '' ? slide.link.text : 'Click here';

							if (slide.link.noFollow) {
								rel.push('nofollow')
							}
							return (
								<div className="rri-gift-slide">
									<div className="rri-gift-slide__content">
										<RichText.Content
											tagName="h3"
											className="rri-gift-slide__above-title"
											value={above_title}
										/>
										<RichText.Content
											tagName="h2"
											className="rri-gift-slide__title"
											value={name}
										/>
										<p className="rri-gift-slide__number">{number}</p>
										<a className="rri-gift-slide__cta"
										   href={slide.link.url}
										   target={linkTarget}
										   rel={rel.join(' ') || undefined}
										>{button_text}</a>
										<img className="rri-gift-slide__image"
											 src={slide.image.url}
											 alt={slide.title}/>
									</div>
								</div>
							);
						})}
					</div>
					<div className="rri-gift-arrows">
						<div className="rri-gift-prev"/>
						<div className="rri-gift-next"/>
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
