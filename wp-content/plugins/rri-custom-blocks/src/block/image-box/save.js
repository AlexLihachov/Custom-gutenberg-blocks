/**
 * External dependencies
 */
import {withBlockStyles, withUniqueClass} from '../../higher-order';
import {BlockContainer} from '../../components';
import classnames from 'classnames';
import {range} from 'lodash';

/**
 * Internal dependencies
 */
import SVGArrow from './images/arrow.svg';
import createStyles from './style';
import {showOptions} from './util';

/**
 * WordPress dependencies
 */
import {applyFilters} from '@wordpress/hooks';
import {RichText} from '@wordpress/block-editor';
import {compose} from '@wordpress/compose';
import {Fragment} from '@wordpress/element';

const save = props => {
	const {className, attributes} = props;
	const {
		columns = 2,
		contentAlign = '',
		design = 'basic',
		titleTag = '',
		shadow = '',
		showOverlay = false,
		showOverlayHover = true,
		showSubtitle = true,
		showTitle = true,
		showDescription = true,
		showArrow = false,
		imageHoverEffect = '',
	} = attributes;

	const mainClasses = classnames([
		className,
		'rri-image-box--v4',
		`rri-image-box--columns-${columns}`,
		`rri-image-box--design-${design}`,
	], applyFilters('stackable.image-box.mainclasses', {
		[`rri-image-box--effect-${imageHoverEffect}`]: imageHoverEffect,
		'rri-image-box--with-arrow': showArrow,
		[`rri-image-box--align-${contentAlign}`]: contentAlign,
	}, props));

	const show = showOptions(props);

	return (
		<BlockContainer.Save className={mainClasses} blockProps={props} render={() => (
			<Fragment>
				{range(1, columns + 1).map(i => {
					const subtitle = attributes[`subtitle${i}`];
					const title = attributes[`title${i}`];
					const description = attributes[`description${i}`];

					const itemClasses = classnames([
						'rri-image-box__item',
						`rri-image-box__item${i}`,
						'rri-image-box__box',
					], applyFilters('stackable.image-box.itemclasses', {
						[`rri--shadow-${shadow}`]: show.columnBackground && shadow !== '',
					}, props, i));

					const rel = [];
					if (attributes[`link${i}NewTab`]) {
						rel.push('noopener');
						rel.push('noreferrer')
					}
					if (attributes[`link${i}NoFollow`]) {
						rel.push('nofollow')
					}

					return (
						<div
							className={itemClasses}
							key={i}
						>
							{attributes[`image${i}Url`] &&
							<div className="rri-image-box__box rri-image-box__image-wrapper">
								<div className="rri-image-box__box rri-image-box__image"></div>
							</div>
							}
							{showOverlay &&
							<div className="rri-image-box__box rri-image-box__overlay"></div>
							}
							{showOverlayHover &&
							<div className="rri-image-box__box rri-image-box__overlay-hover"></div>
							}
							<div className="rri-image-box__content">
								{(showSubtitle || showTitle) &&
								<div className="rri-image-box__header">
									{showSubtitle && !RichText.isEmpty(subtitle) &&
									<RichText.Content
										tagName="div"
										className="rri-image-box__subtitle"
										value={subtitle}
									/>
									}
									{showTitle && !RichText.isEmpty(title) &&
									<RichText.Content
										tagName={titleTag || 'h4'}
										className="rri-image-box__title"
										value={title}
									/>
									}
								</div>
								}
								{showDescription && !RichText.isEmpty(description) &&
								<RichText.Content
									tagName="p"
									className="rri-image-box__description"
									value={description}
								/>
								}
							</div>
							{showArrow &&
							<div className="rri-image-box__arrow">
								<SVGArrow/>
							</div>
							}
							{attributes[`link${i}Url`] &&
							<a
								className="rri-image-box__overlay-link"
								href={attributes[`link${i}Url`]}
								target={attributes[`link${i}NewTab`] ? '_blank' : undefined}
								rel={rel.join(' ') || undefined}
								title={attributes[`title${i}`]}
								aria-label={attributes[`title${i}`]}
							>{null}</a>
							}
						</div>
					)
				})}
			</Fragment>
		)}/>
	)
};

export default compose(
	withUniqueClass,
	withBlockStyles(createStyles),
)(save);
