/**
 * External dependencies
 */
import {cloneDeep} from 'lodash';

import {
    BlockContainer,
    UrlInputPopover,
    AdvancedRangeControl,
} from '../../components';

import {
    withUniqueClass,
    withSetAttributeHook,
    withTabbedInspector,
    withBlockStyles,
} from '../../higher-order';

import classnames from 'classnames';
import {i18n} from '../../constants';

/**
 * Internal dependencies
 */
import createStyles from './style';

/**
 * WordPress dependencies
 */
import {RichText} from '@wordpress/block-editor';
import {PanelBody, SelectControl, withFocusOutside, ToggleControl} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import {addFilter, applyFilters} from '@wordpress/hooks';
import {Component, Fragment, createRef} from '@wordpress/element';
import {compose} from '@wordpress/compose';
import {withSelect} from '@wordpress/data';

/**
 * Tabs Render
 */

addFilter('stackable.buttons.edit.inspector.style.before', 'stackable/buttons', (output, props) => {
    const {setAttributes} = props;
    const {buttons} = props.attributes;
    
    return (
        <Fragment>
            {output}
            <PanelBody title={__('General', i18n)}>
                <AdvancedRangeControl
                    label={__('Number of buttons', i18n)}
                    value={buttons.length}
                    onChange={(value) => {
                        const button_data_clone = cloneDeep(buttons);
                        
                        if (buttons.length < value) {
                            button_data_clone.push({
                                url: '',
                                newTab: false,
                                noFollow: false,
                                text: 'Link',
                                design: 'primary',
                                size: 'small',
                            });
                        } else {
                            button_data_clone.pop();
                        }
                        
                        setAttributes({
                            buttons: button_data_clone,
                        });
                    }}
                    min={1}
                    max={2}
                />
            </PanelBody>
            
            {buttons.map((button, index) => {
                return (
                    <PanelBody title={__(`Button ${index}`, i18n)} initialOpen={false}>
                        <SelectControl label={__('Design', i18n)}
                                       options={[
                                           {value: 'primary', label: __('Primary', i18n)},
                                           {value: 'secondary', label: __('Secondary', i18n)},
                                       ]}
                                       value={button.design}
                                       onChange={(value) => {
                                           const buttonsClone = cloneDeep(buttons);
                                           buttonsClone[index].design = value;
                                           setAttributes({
                                               buttons: buttonsClone,
                                           });
                                       }}
                        />
                        <SelectControl label={__('Size', i18n)}
                                       options={[
                                           {value: 'small', label: __('Small', i18n)},
                                           {value: 'medium', label: __('Medium', i18n)},
                                           {value: 'large', label: __('Large', i18n)},
                                       ]}
                                       value={button.size}
                                       onChange={(value) => {
                                           const buttonsClone = cloneDeep(buttons);
                                           buttonsClone[index].size = value;
                                           setAttributes({
                                               buttons: buttonsClone,
                                           });
                                       }}
                        />
                    </PanelBody>
                );
            })}
        
        </Fragment>
    );
});


class Edit extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            openUrlPopover: null,
        };
        this.handleFocusOutside = this.handleFocusOutside.bind(this)
    }
    
    onChangeUrl = (value, index) => {
        const {setAttributes, attributes} = this.props;
        const buttonsClone = cloneDeep(attributes.buttons);
        buttonsClone[index].url = value;
        setAttributes({
            buttons: buttonsClone,
        });
    };
    
    onChangeNewTab = (value, index) => {
        const {setAttributes, attributes} = this.props;
        const buttonsClone = cloneDeep(attributes.buttons);
        buttonsClone[index].newTab = value;
        setAttributes({
            buttons: buttonsClone,
        });
    };
    
    onChangeNoFollow = (value, index) => {
        const {setAttributes, attributes} = this.props;
        const buttonsClone = cloneDeep(attributes.buttons);
        buttonsClone[index].noFollow = value;
        setAttributes({
            buttons: buttonsClone,
        });
    };
    
    handleFocusOutside () {
        this.setState({
            openUrlPopover: null,
        })
    };
    
    render() {
        const {className, setAttributes, attributes} = this.props;
        const {buttons} = attributes;
        const mainClasses = classnames([className]);
        
        return (
            <BlockContainer.Edit
                className={mainClasses}
                blockProps={this.props}
                render={() => (
                    <Fragment>
                        <div className="rri-buttons__container"
                             role="button"
                        >
                            {buttons.map((button, index) => {
                                    const {
                                        buttons,
                                    } = attributes;
                                    const itemClasses =
                                        classnames([
                                            'rri-buttons__item',
                                            `rri-buttons__item_${button.design}`,
                                            `rri-buttons__item_${button.size}`,
                                        ]);
                                    
                                    return (
                                        <div className={itemClasses}
                                             key={index}
                                             onClick={() => this.setState({openUrlPopover: index})} >
                                            <RichText
                                                tagName="span"
                                                className="rri-gift-slide__cta-text"
                                                value={button.text}
                                                onChange={(value) => {
                                                    const buttonsClone = cloneDeep(buttons);
                                                    buttonsClone[index].text = value;
                                                    setAttributes({
                                                        buttons: buttonsClone,
                                                    });
                                                }}
                                                keepPlaceholderOnFocus
                                            />
                                            {this.state.openUrlPopover === index && <UrlInputPopover
                                                value={button.url}
                                                newTab={button.newTab}
                                                noFollow={button.noFollow}
                                                onChange={value => this.onChangeUrl(value, index)}
                                                onChangeNewTab={value => this.onChangeNewTab(value, index)}
                                                onChangeNoFollow={value => this.onChangeNoFollow(value, index)}
                                            />}
                                        </div>
                                    );
                                }
                            )}
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
        };
    }),
    withFocusOutside,
)(Edit);
