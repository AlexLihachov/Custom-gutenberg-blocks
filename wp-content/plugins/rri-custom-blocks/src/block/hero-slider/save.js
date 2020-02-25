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
	const {settings, slides_data} = attributes;

	return (
		<BlockContainer.Save
			className={className}
			blockProps={props}
			render={() => (
				<div className="rri-hero-slider__wrapper" data-settings={JSON.stringify(settings)}>
					<div className="rri-hero-slider__inner">
						{slides_data.map((item) => {
							const {title, copy, button} = item;
							const {buttonSize, align} = item.params;
							const ctaClasses = classnames(['rri-hero-slide__cta', `rri-hero-slide__cta--${buttonSize}`]);
							const slideClasses = classnames(['rri-hero-slide', `rri-hero-slide--${align}`]);
							const rel = [];

							if (button.newTab) {
								rel.push('noopener');
								rel.push('noreferrer')
							}

							if (button.noFollow) {
								rel.push('nofollow')
							}

							return (
								<div className={slideClasses} style={{
									backgroundImage: `url(${item.image.url})`
								}}>
									<div className="rri-hero-slide__content">
										<RichText.Content
											tagName="h2"
											className="rri-hero-slide__title"
											value={title}
										/>
										<RichText.Content
											tagName="p"
											className="rri-hero-slide__copy"
											value={copy}
										/>
										<a href={button.url}
										   className={ctaClasses}
										   target={button.newTab ? '_blank' : '_self'}
										   rel={rel.join(' ') || undefined}>
											<RichText.Content
												tagName="span"
												className="rri-hero-slide__cta-text"
												value={button.text}
											/>
										</a>
									</div>
								</div>
							);
						})}
					</div>
					<div className="rri-hero-slider__arrows">
						<div className="rri-hero-slider__arrow rri-hero-slider__arrow--prev"/>
						<div className="rri-hero-slider__arrow rri-hero-slider__arrow--next"/>
					</div>
				</div>
			)}
		/>
	);
};

export default compose(
	withUniqueClass,
	withBlockStyles(createStyles)
)(save);
