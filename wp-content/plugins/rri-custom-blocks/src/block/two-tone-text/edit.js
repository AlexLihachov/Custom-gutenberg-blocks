/**
 * External dependencies
 */
import {cloneDeep} from 'lodash';

import {
	ImageUploadPlaceholder,
	BlockContainer,
	AdvancedRangeControl,
	UrlInputPopover
} from '../../components';

import {
	withUniqueClass,
	withSetAttributeHook,
	withTabbedInspector,
	withBlockStyles,
} from '../../higher-order';

import classnames from 'classnames';
import {i18n} from '../../constants'

/**
 * Internal dependencies
 */
import createStyles from './style'

/**
 * WordPress dependencies
 */
import {RichText} from '@wordpress/block-editor'
import {PanelBody, withFocusOutside} from '@wordpress/components'
import {__} from '@wordpress/i18n'
import {addFilter} from '@wordpress/hooks'
import {Component, Fragment, createRef} from '@wordpress/element'
import {compose} from '@wordpress/compose'
import {withSelect} from '@wordpress/data'

/**
 * Tabs Render
 */

addFilter('stackable.two-tone-text.edit.inspector.layout.before', 'stackable/two-tone-text', (output, props) => {
	return (
		<Fragment>
			{output}
		</Fragment>
	)
});

addFilter('stackable.two-tone-text.edit.inspector.style.before', 'stackable/two-tone-text', (output, props) => {
	const {setAttributes} = props;
	const {settings} = props.attributes;

	return (
		<Fragment>
			{output}
			<PanelBody title={__('General', i18n)}>
				<AdvancedRangeControl
					label={__('Speed', i18n)}
					value={(settings.speed / 1000)}
					step={0.1}
					onChange={(value) => {
						const settingsClone = cloneDeep(settings);
						settingsClone.speed = value * 1000;
						setAttributes({
							settings: settingsClone
						});
					}}
					min={0}
					max={4}
				/>
			</PanelBody>
		</Fragment>
	);
});

class Edit extends Component {
	constructor() {
		super(...arguments);
		this.state = {
			openUrlPopover: false
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleInnerClick = this.handleInnerClick.bind(this);
		this.onChangeUrl = this.onChangeUrl.bind(this);
		this.onChangeNewTab = this.onChangeNewTab.bind(this);
		this.onChangeNoFollow = this.onChangeNoFollow.bind(this);
	}

	handleClick() {
		this.setState({
			openUrlPopover: true
		});
	}

	handleInnerClick() {
		this.setState({
			openUrlPopover: false
		});
	}

	onChangeUrl(value) {
		const {setAttributes, attributes} = this.props;
		const twoToneClone = cloneDeep(attributes.twoTone);
		twoToneClone.link.url = value;
		setAttributes({
			twoTone: twoToneClone
		});
	}

	onChangeNewTab(value) {
		const {setAttributes, attributes} = this.props;
		const twoToneClone = cloneDeep(attributes.twoTone);
		twoToneClone.link.newTab = value;
		setAttributes({
			twoTone: twoToneClone
		});
	}

	onChangeNoFollow(value) {
		const {setAttributes, attributes} = this.props;
		const twoToneClone = cloneDeep(attributes.twoTone);
		twoToneClone.link.noFollow = value;
		setAttributes({
			twoTone: twoToneClone
		});
	}

	render() {
		const {className, setAttributes, attributes} = this.props;
		const {twoTone} = attributes;
		const mainClasses = classnames([className]);
		return (
			<BlockContainer.Edit
				className={mainClasses}
				blockProps={this.props}
				render={() => (
					<Fragment>
						<div className="rri-two-tone-text__container"
							 onMouseDown={this.handleInnerClick}
							 role="button">
							<ImageUploadPlaceholder
								classNAme="rri-two-tone-text__parallax-src"
								imageID={twoTone.image.id}
								imageURL={twoTone.image.url}
								onRemove={() => {
									const twoToneDataClone = cloneDeep(twoTone);
									twoTone.image.id = '';
									twoTone.image.url = '';
									setAttributes({
										twoTone: twoToneDataClone
									});
								}}
								onChange={image => {
									const twoToneDataClone = cloneDeep(twoTone);
									twoToneDataClone.image.id = image.id;
									twoToneDataClone.image.url = image.url;
									setAttributes({
										twoTone: twoToneDataClone
									});
								}}
							/>
							<div className="rri-two-tone-text__grid-text">
								<RichText
									tagName="h3"
									className="rri-two-tone-text__edit-text first-line"
									value={twoTone.title}
									onChange={title => {
										const twoToneDataClone = cloneDeep(twoTone);
										twoToneDataClone.title = title;
										setAttributes({
											twoTone: twoToneDataClone
										});
									}}
									placeholder={__('Title First', i18n)}
									keepPlaceholderOnFocus
								/>

								<RichText
									tagName="h3"
									className="rri-two-tone-text__edit-text second-line"
									value={twoTone.title_second}
									onChange={title_second => {
										const twoToneDataClone = cloneDeep(twoTone);
										twoToneDataClone.title_second = title_second;
										setAttributes({
											twoTone: twoToneDataClone
										});
									}}
									placeholder={__('Title Second', i18n)}
									keepPlaceholderOnFocus
								/>

								<div className="rri-two-tone-text__edit-text rri-two-tone-text__btn "
									 onClick={this.handleClick}>
									<RichText
										tagName="span"
										value={twoTone.link.text}
										onChange={text => {
											const twoToneDataClone = cloneDeep(twoTone);
											twoToneDataClone.link.text = text;
											setAttributes({
												twoTone: twoToneDataClone
											});
										}}
										placeholder={__('URL', i18n)}
										keepPlaceholderOnFocus
									/>
									{this.state.openUrlPopover && <UrlInputPopover
										value={twoTone.link.url}
										newTab={twoTone.link.newTab}
										noFollow={twoTone.link.noFollow}
										onChange={value => this.onChangeUrl(value)}
										onChangeNewTab={value => this.onChangeNewTab(value)}
										onChangeNoFollow={value => this.onChangeNoFollow(value)}
									/>}
								</div>
							</div>
						</div>
					</Fragment>
				)}/>
		);
	}
}


export default compose(
	withUniqueClass,
	withSetAttributeHook,
	withTabbedInspector(),
	withBlockStyles(createStyles, {editorMode: true}),
	withSelect((select, {clientId}) => {
		const {getBlock} = select('core/block-editor');
		const block = getBlock(clientId);
		return {
			hasInnerBlocks: !!(block && block.innerBlocks.length),
		}
	}),
	withFocusOutside,
)(Edit);
