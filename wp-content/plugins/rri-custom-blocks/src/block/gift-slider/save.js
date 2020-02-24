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
	const {slides_data, settings, abovetitleTag, titleTag} = attributes;

	return (
		<BlockContainer.Save
			className={className}
			blockProps={props}
			render={() => (
				<Fragment>
					<div className="rri-gift-slider__inner"
						 data-settings={JSON.stringify(settings)}>
						{slides_data.map((slide, index) => {
							const linkTarget = slide.link.newTab ? '_blank' : '_self';
							const rel = ['noopener', 'noreferrer'];

							if (slide.link.noFollow) {
								rel.push('nofollow')
							}
							return (
								<div className="rri-gift-slide">
									<div className="rri-gift-slide__content">
										<RichText.Content
											tagName={abovetitleTag}
											className="rri-gift-slide__above-title"
											value={slide.above_title}
										/>
										<RichText.Content
											tagName={titleTag}
											className="rri-gift-slide__title"
											value={slide.name}
										/>
										<p className="rri-gift-slide__number">{slide.number}</p>
										<a className="rri-gift-slide__cta"
										   href={slide.link.url}
										   target={linkTarget}
										   rel={rel.join(' ') || undefined}
										>{slide.link.text}</a>
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
