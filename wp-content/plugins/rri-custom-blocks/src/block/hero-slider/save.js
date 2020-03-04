/**
 * External dependencies
 */
import {withBlockStyles, withUniqueClass} from '../../higher-order';
import {BlockContainer} from '../../components';
import classnames from 'classnames';
import {HeroSliderLeftArrow, HeroSliderRightArrow} from '../../icons';
import {Button} from "../../components";

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
							const {button} = item;
							const {align} = item.params;
							const title = item.title !== '' ? item.title : 'Title';
							const copy = item.copy !== '' ? item.copy : 'Copy';
							const button_text = button.text !== '' ? button.text : 'Click here';
							const slideClasses = classnames(['rri-hero-slide', `rri-hero-slide--${align}`]);


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
											<Button {...button} className="rri-hero-slide__cta" />
										</div>
									</div>
								</div>
							);
						})}
					</div>
					<div className="rri-hero-slider__arrow rri-hero-slider__arrow--prev">
						<HeroSliderLeftArrow/>
					</div>
					<div className="rri-hero-slider__arrow rri-hero-slider__arrow--next">
						<HeroSliderRightArrow/>
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
