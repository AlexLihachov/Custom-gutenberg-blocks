/**
 * External dependencies
 */
import {withBlockStyles, withUniqueClass} from '../../higher-order';
import {BlockContainer} from '../../components';
import classnames from 'classnames';
import {range} from 'lodash';

/**
 * WordPress dependencies
 */
import {applyFilters} from '@wordpress/hooks';
import {RichText} from '@wordpress/block-editor';
import {compose} from '@wordpress/compose';
import {Fragment, Component, createRef} from '@wordpress/element';
import createStyles from "./style";

class Save extends Component {
	render() {
		const {className, attributes} = this.props;
		const {
			slides
		} = attributes;

		return (
			<BlockContainer.Save
				className={className}
				blockProps={this.props}
				render={() => (
					<Fragment>
						<div className="rri-generic-slider__inner">
							{range(1, slides + 1).map((i) => {
								const itemClasses = classnames([
									'rri-generic-slide',
									`rri-generic-slide${i}`,
								]);
								const title = attributes[`title${i}`];
								const quote = attributes[`quote${i}`];
								const author = attributes[`author${i}`];

								return (
									<div
										className={itemClasses}
										key={i}
										style={{
											backgroundImage: `url(${attributes[`image${i}Url`]})`
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
	}
}

export default compose(
	withUniqueClass,
	withBlockStyles(createStyles)
)(Save);
