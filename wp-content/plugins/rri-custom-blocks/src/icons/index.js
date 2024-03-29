/**
 * Internal dependencies
 */
import StackableIcon from './images/stackable-icon.svg';
import SVGAccordionIcon from './images/accordion-icon.svg';
import SVGBlockquoteIcon from './images/blockquote-icon.svg';
import SVGBlogPostsIcon from './images/blog-posts-icon.svg';
import SVGButtonIcon from './images/button-icon.svg';
import SVGCardIcon from './images/card-icon.svg';
import SVGContainerIcon from './images/container-icon.svg';
import SVGCountUpIcon from './images/count-up-icon.svg';
import SVGCTAIcon from './images/cta-icon.svg';
import SVGDividerIcon from './images/divider-icon.svg';
import SVGExpandIcon from './images/expand-icon.svg';
import SVGFeatureGridIcon from './images/feature-grid-icon.svg';
import SVGFeatureIcon from './images/feature-icon.svg';
import SVGHeaderIcon from './images/header-icon.svg';
import SVGIconListIcon from './images/icon-list-icon.svg';
import SVGImageBoxIcon from './images/image-box-icon.svg';
import SVGTwoToneIcon from './images/two-tone-icon.svg';
import SVGNotificationIcon from './images/notification-icon.svg';
import SVGNumberBoxIcon from './images/number-box-icon.svg';
import SVGPricingBoxIcon from './images/pricing-box-icon.svg';
import SVGSeparatorIcon from './images/separator-icon.svg';
import SVGSpacerIcon from './images/spacer-icon.svg';
import SVGTeamMemberIcon from './images/team-member-icon.svg';
import SVGTestimonialIcon from './images/testimonial-icon.svg';
import SVGVideoPopupIcon from './images/video-popup-icon.svg';
import SVGUngroupContainerIcon from './images/ungroup-container-icon.svg';
import SVGSliderIcon from './images/slider-icon.svg';
import SVGNumberCounterIcon from './images/number-counter-icon.svg';
import SVGHeroSliderLeftArrow from './images/hero-slider-left-arrow.svg';
import SVGHeroSliderRightArrow from './images/hero-slider-right-arrow.svg';

/**
 * WordPress dependencies
 */
import {cloneElement, render} from '@wordpress/element';
import domReady from '@wordpress/dom-ready';
import {updateCategory} from '@wordpress/blocks';

export const colorizeIcon = SvgIcon => {
	return cloneElement(SvgIcon, {
		className: 'rri-icon-accent',
	})
};

// Add an icon to our block category.
// if (typeof window.wp.blocks !== 'undefined' && typeof window.wp.blocks.updateCategory !== 'undefined') {
// 	updateCategory('stackable', {
// 		icon: colorizeIcon(<StackableIcon className="components-panel__icon" width="20" height="20"/>),
// 	})
// }

export const AccordionIcon = () => {
	return colorizeIcon(<SVGAccordionIcon width="20" height="20"/>)
};

export const BlockquoteIcon = () => {
	return colorizeIcon(<SVGBlockquoteIcon width="20" height="20"/>)
};

export const BlogPostsIcon = () => {
	return colorizeIcon(<SVGBlogPostsIcon width="20" height="20"/>)
};
export const ButtonIcon = () => {
	return colorizeIcon(<SVGButtonIcon width="20" height="20"/>)
};

export const CardIcon = () => {
	return colorizeIcon(<SVGCardIcon width="20" height="20"/>)
};

export const ContainerIcon = () => {
	return colorizeIcon(<SVGContainerIcon width="20" height="20"/>)
};

export const CountUpIcon = () => {
	return colorizeIcon(<SVGCountUpIcon width="20" height="20"/>)
};

export const CTAIcon = () => {
	return colorizeIcon(<SVGCTAIcon width="20" height="20"/>)
};

export const DividerIcon = () => {
	return colorizeIcon(<SVGDividerIcon width="20" height="20"/>)
};

export const ExpandIcon = () => {
	return colorizeIcon(<SVGExpandIcon width="20" height="20"/>)
};

export const FeatureGridIcon = () => {
	return colorizeIcon(<SVGFeatureGridIcon width="20" height="20"/>)
};

export const FeatureIcon = () => {
	return colorizeIcon(<SVGFeatureIcon width="20" height="20"/>)
};

export const HeaderIcon = () => {
	return colorizeIcon(<SVGHeaderIcon width="20" height="20"/>)
};

export const IconListIcon = () => {
	return colorizeIcon(<SVGIconListIcon width="20" height="20"/>)
};

export const ImageBoxIcon = () => {
	return colorizeIcon(<SVGImageBoxIcon width="20" height="20"/>)
};

export const TwoToneIcon = () => {
	return colorizeIcon(<SVGTwoToneIcon width="20" height="20"/>)
};

export const NotificationIcon = () => {
	return colorizeIcon(<SVGNotificationIcon width="20" height="20"/>)
};

export const NumberBoxIcon = () => {
	return colorizeIcon(<SVGNumberBoxIcon width="20" height="20"/>)
};

export const PricingBoxIcon = () => {
	return colorizeIcon(<SVGPricingBoxIcon width="20" height="20"/>)
};

export const SeparatorIcon = () => {
	return colorizeIcon(<SVGSeparatorIcon width="20" height="20"/>)
};

export const SpacerIcon = () => {
	return colorizeIcon(<SVGSpacerIcon width="20" height="20"/>)
};

export const TeamMemberIcon = () => {
	return colorizeIcon(<SVGTeamMemberIcon width="20" height="20"/>)
};

export const TestimonialIcon = () => {
	return colorizeIcon(<SVGTestimonialIcon width="20" height="20"/>)
};

export const VideoPopupIcon = () => {
	return colorizeIcon(<SVGVideoPopupIcon width="20" height="20"/>)
};

export const UngroupContainerIcon = () => {
	return colorizeIcon(<SVGUngroupContainerIcon width="20" height="20"/>)
};

export const SliderIcon = () => {
	return colorizeIcon(<SVGSliderIcon width="20" height="20"/>)
};

export const NumberCounterIcon = () => {
	return colorizeIcon(<SVGNumberCounterIcon width="20" height="20"/>)
};

export const GhostButtonIcon = () => <ButtonIcon/>;

export const HeroSliderLeftArrow = () => <SVGHeroSliderLeftArrow/>;
export const HeroSliderRightArrow = () => <SVGHeroSliderRightArrow/>;
