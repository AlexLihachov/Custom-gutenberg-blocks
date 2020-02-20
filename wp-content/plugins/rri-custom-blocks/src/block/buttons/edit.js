/**
 * External dependencies
 */
import {cloneDeep, isEqual} from 'lodash';

import {
    BlockContainer,
    UrlInputPopover, TypographyControlHelper, HeadingButtonsControl, ColorPaletteControl
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
import {PanelBody, withFocusOutside, ToggleControl} from '@wordpress/components'
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
    const {setAttributes}                                                          = props;
    const {buttonColor} = props.attributes;

    return (
        <Fragment>
            {output}
            <PanelBody title = {__('Title right', i18n)}>
                <ColorPaletteControl
                    value = {buttonColor}
                    onChange = {value => setAttributes({
                        buttonColor : value
                    })}
                    label = {__('Title right Color', i18n)}
                />
            </PanelBody>
        </Fragment>
    );
});

class Edit extends Component{
    constructor(){
        super(...arguments);
        this.state            = {
            openUrlPopover : false
        };
        this.scrollRef        = createRef();
        this.handleClick      = this.handleClick.bind(this);
        this.handleInnerClick = this.handleInnerClick.bind(this);
        this.onChangeUrl      = this.onChangeUrl.bind(this);
        this.onChangeNewTab   = this.onChangeNewTab.bind(this);
        this.onChangeNoFollow = this.onChangeNoFollow.bind(this);
    }

    handleClick(){
        this.setState({
            openUrlPopover : true
        });
    }

    handleInnerClick(){
        this.setState({
            openUrlPopover : false
        });
    }

    onChangeUrl(value){
        const {setAttributes, attributes} = this.props;
        const buttonsClone                = cloneDeep(attributes.buttons);
        buttonsClone.link.url             = value;
        setAttributes({
            buttons : buttonsClone
        });
    }

    onChangeNewTab(value){
        const {setAttributes, attributes} = this.props;
        const buttonsClone                = cloneDeep(attributes.buttons);
        buttonsClone.link.newTab          = value;
        setAttributes({
            buttons : buttonsClone
        });
    }

    onChangeNoFollow(value){
        const {setAttributes, attributes} = this.props;
        const buttonsClone                = cloneDeep(attributes.buttons);
        buttonsClone.link.noFollow        = value;
        setAttributes({
            buttons : buttonsClone
        });
    }

    render(){
        const {className, setAttributes, attributes} = this.props;
        const {buttons} = attributes;
        const mainClasses                            = classnames([className]);
        return (
            <BlockContainer.Edit
                className = {mainClasses}
                blockProps = {this.props}
                render = {() => (
                    <Fragment>
                        <div className = "rri-buttons__container"
                             onMouseDown = {this.handleInnerClick}
                             role = "button">

                                <div className = "rri-buttons__link"
                                     onClick = {this.handleClick}>
                                    <RichText
                                        tagName = "span"
                                        value = {buttons.link.text}
                                        onChange = {text => {
                                            const buttonsDataClone     = cloneDeep(buttons);
                                            buttonsDataClone.link.text = text;
                                            setAttributes({
                                                buttons : buttonsDataClone
                                            });
                                        }}
                                        placeholder = {__('URL', i18n)}
                                        keepPlaceholderOnFocus
                                    />
                                    {this.state.openUrlPopover && <UrlInputPopover
                                        value = {buttons.link.url}
                                        newTab = {buttons.link.newTab}
                                        noFollow = {buttons.link.noFollow}
                                        onChange = {value => this.onChangeUrl(value)}
                                        onChangeNewTab = {value => this.onChangeNewTab(value)}
                                        onChangeNoFollow = {value => this.onChangeNoFollow(value)}
                                    />}
                                </div>
                        </div>
                    </Fragment>
                )} />
        );
    }
}


export default compose(
    withUniqueClass,
    withSetAttributeHook,
    withTabbedInspector(),
    withBlockStyles(createStyles, {editorMode : true}),
    withSelect((select, {clientId}) => {
        const {getBlock} = select('core/block-editor');
        const block      = getBlock(clientId);
        return {
            hasInnerBlocks : !!(block && block.innerBlocks.length),
        }
    }),
    withFocusOutside,
)(Edit);
