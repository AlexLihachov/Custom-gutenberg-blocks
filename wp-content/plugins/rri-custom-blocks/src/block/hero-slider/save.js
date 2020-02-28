/**
 * External dependencies
 */
import {withBlockStyles, withUniqueClass} from '../../higher-order';
import {BlockContainer} from '../../components';
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {RichText, InnerBlocks} from '@wordpress/block-editor';
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
							const {align} = item.params;
							const slideClasses = classnames(['rri-hero-slide', `rri-hero-slide--${align}`]);
							const ctaClasses = classnames([
								'rri-hero-slide__cta',
								`rri-hero-slide__cta--${button.size}`,
								`rri-hero-slide__cta--${button.design}`
							]);

							return (
								<div className={slideClasses} style={{
									backgroundImage: `url(${item.image.url})`
								}}>
									<div className="rri-hero-slide__wrapper">
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
											<div className={ctaClasses}>
												<RichText.Content
													tagName="span"
													className="rri-hero-slide__cta-text"
													value={button.text}
												/>
											</div>
										</div>
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
