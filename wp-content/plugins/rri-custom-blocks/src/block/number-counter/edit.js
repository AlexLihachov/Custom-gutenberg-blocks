/**
 * External dependencies
 */
import {cloneDeep} from 'lodash';

import {
    BlockContainer,
    AdvancedRangeControl,
    UrlInputPopover,
    TypographyControlHelper,
    HeadingButtonsControl,
    ColorPaletteControl,
    BackgroundControlsHelper,
    ImageUploadPlaceholder, PanelAdvancedSettings, DivBackground,
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
import {addFilter} from '@wordpress/hooks';
import {Component, Fragment, createRef} from '@wordpress/element';
import {compose} from '@wordpress/compose';
import {withSelect} from '@wordpress/data';

/**
 * Tabs Render
 */

addFilter('stackable.number-counter.edit.inspector.style.before', 'stackable/number-counter', (output, props) => {
    const {setAttributes}                           = props;
    const {numbers, settings, titleTag, titleColor} = props.attributes;
    return (
        <Fragment>
            {output}
            <PanelBody title = {__('General', i18n)}>
                <AdvancedRangeControl
                    label = {__('Numbers of element', i18n)}
                    value = {numbers.length}
                    onChange = {(value) => {
                        const numbersClone = cloneDeep(numbers);

                        if(numbers.length < value){
                            numbersClone.push({
                                count         : 0,
                                use           : "circle",
                                text          : "",
                                size          : "large",
                                circle_size   : "214",
                                circle_indent : "107",
                                circle_radius : "104",
                                circle_offset : "653",
                                image         : {
                                    url : '',
                                    id  : '',
                                },
                            });
                        } else{
                            numbersClone.pop();
                        }

                        setAttributes({
                            numbers : numbersClone,
                        });
                    }}
                    min = {1}
                    max = {200}
                />

                <ToggleControl
                    label = {__('Background', i18n)}
                    checked = {(settings.bg)}
                    onChange = {() => {
                        const settingsClone = cloneDeep(settings);
                        settingsClone.bg    = !settingsClone.bg;
                        setAttributes({
                            settings : settingsClone
                        });
                    }}
                />


            </PanelBody>

            <PanelAdvancedSettings
                title = {__('Background', i18n)}
                id = "background"
                initialOpen = {false}
            >
                <BackgroundControlsHelper
                    attrNameTemplate = "preview%s"
                    setAttributes = {setAttributes}
                    blockAttributes = {props.attributes}
                />
            </PanelAdvancedSettings>


            {numbers.map((number, index) => {
                return (
                    <PanelBody title = {__(`Number ${index}`, i18n)} initialOpen = {false}>
                        <SelectControl label = {__('Size', i18n)}
                                       options = {[
                                           {value : 'small', label : __('Small', i18n)},
                                           {value : 'large', label : __('Large', i18n)},
                                       ]}
                                       value = {number.size}
                                       onChange = {(value) => {
                                           const numbersClone       = cloneDeep(numbers);
                                           numbersClone[index].size = value;
                                           if(value === "small"){
                                               numbersClone[index].circle_size   = "129";
                                               numbersClone[index].circle_indent = "64";
                                               numbersClone[index].circle_radius = "62";
                                               numbersClone[index].circle_offset = "389";
                                           } else{
                                               numbersClone[index].circle_size   = "214";
                                               numbersClone[index].circle_indent = "107";
                                               numbersClone[index].circle_radius = "104";
                                               numbersClone[index].circle_offset = "653";
                                           }
                                           setAttributes({
                                               numbers : numbersClone,
                                           });
                                       }}
                        />
                        <SelectControl label = {__('Use', i18n)}
                                       options = {[
                                           {value : 'circle', label : __('Circle', i18n)},
                                           {value : 'image', label : __('Image', i18n)},
                                       ]}
                                       value = {number.use}
                                       onChange = {(value) => {
                                           const numbersClone      = cloneDeep(numbers);
                                           numbersClone[index].use = value;
                                           setAttributes({
                                               numbers : numbersClone,
                                           });
                                       }}
                        />

                        <AdvancedRangeControl
                            label = {__('Number value:', i18n)}
                            value = {number.count}
                            onChange = {(value) => {
                                const numbersClone        = cloneDeep(numbers);
                                numbersClone[index].count = value;
                                setAttributes({
                                    numbers : numbersClone,
                                });
                            }}
                            min = {1}
                            max = {100}
                        />

                        <ToggleControl
                            label = {__('Percent', i18n)}
                            checked = {number.percent}
                            onChange = {() => {
                                const numbersClone          = cloneDeep(numbers);
                                numbersClone[index].percent = !numbersClone[index].percent;
                                setAttributes({
                                    numbers : numbersClone
                                });
                            }}
                        />

                        {/*<TypographyControlHelper*/}
                        {/*attrNameTemplate = "title%s"*/}
                        {/*setAttributes = {setAttributes}*/}
                        {/*blockAttributes = {props.attributes}*/}
                        {/*/>*/}
                        {/*<HeadingButtonsControl*/}
                        {/*value = {titleTag}*/}
                        {/*onChange = {value => setAttributes({*/}
                        {/*titleTag : value*/}
                        {/*})}*/}
                        {/*/>*/}
                        {/*<ColorPaletteControl*/}
                        {/*value = {titleColor}*/}
                        {/*onChange = {value => setAttributes({*/}
                        {/*titleColor : value*/}
                        {/*})}*/}
                        {/*label = {__('Title left Color', i18n)}*/}
                        {/*/>*/}

                    </PanelBody>
                );

            })}
        </Fragment>
    );
});

class Edit extends Component{
    constructor(){
        super(...arguments);
    }

    render(){
        const {className, setAttributes, attributes} = this.props;
        const {numbers, settings, titleTag}          = attributes;
        this.NumberRef                               = createRef();
        const mainClasses                            = classnames([className]);
        const bg                                     = settings.bg;
        const bgtrue = bg ? "rri-number-counter__container_white" : "";
        const itemsClasses                           = classnames([
            'rri-number-counter__container',
            `${bgtrue}`,
        ]);


        return (
            <BlockContainer.Edit
                className = {mainClasses}
                blockProps = {this.props}
                render = {() => (
                    <Fragment>
                        <div className = {itemsClasses}>
                            {numbers.map((number, index) => {
                                    const itemClasses =
                                              classnames([
                                                  'rri-number-counter__item',
                                              ]);

                                    const elementClasses =
                                              classnames([
                                                  'rri-number-counter__element',
                                                  `rri-number-counter__element_${number.size}`
                                              ]);
                                    const count          = number.count;
                                    const use            = number.use;
                                    const circle_size    = number.circle_size;
                                    const circle_radius  = number.circle_radius;
                                    const circle_indent  = number.circle_indent;
                                    const percent        = number.percent;
                                    const initialOffset  = number.circle_offset;
                                    const time           = 100;
                                    const dashoffset     = initialOffset - (count * (initialOffset / time));

                                    return (
                                        <div className = {itemClasses}
                                             ref = {this.NumberRef}
                                             key = {index}
                                        >
                                            <div className = {elementClasses}>


                                                {use === "image" && (
                                                    <div className = "rri-number-counter__image-container">
                                                        <ImageUploadPlaceholder
                                                            classNAme = "rri-number-counter__image"
                                                            imageID = {number.image.id}
                                                            imageURL = {number.image.url}

                                                            onRemove = {() => {
                                                                const numbersClone            = cloneDeep(numbers);
                                                                numbersClone[index].image.id  = '';
                                                                numbersClone[index].image.url = '';
                                                                setAttributes({
                                                                    numbers : numbersClone
                                                                });
                                                            }}
                                                            onChange = {image => {
                                                                const numbersClone            = cloneDeep(numbers);
                                                                numbersClone[index].image.id  = image.id;
                                                                numbersClone[index].image.url = image.url;
                                                                setAttributes({
                                                                    numbers : numbersClone
                                                                });
                                                            }}

                                                        />
                                                    </div>
                                                )}


                                                <p className = "rri-number-counter__count">{count}

                                                    {percent && (
                                                        <span> %</span>
                                                    )}
                                                </p>

                                                {use === "circle" && (
                                                    <div className = "rri-number-counter__circle-container">
                                                        <svg className = "rri-number-counter__circle"
                                                             width = {circle_size}
                                                             height = {circle_size}
                                                             xmlns = "http://www.w3.org/2000/svg">
                                                            <circle r = {circle_radius}
                                                                    cy = {circle_indent}
                                                                    cx = {circle_indent}
                                                                    stroke-width = "4"
                                                                    stroke = "#979797"
                                                                    fill = "none" />
                                                        </svg>
                                                        <svg className = "rri-number-counter__circle"
                                                             width = {circle_size}
                                                             height = {circle_size}
                                                             xmlns = "http://www.w3.org/2000/svg">
                                                            <circle className = "rri-number-counter__count-circle"
                                                                    r = {circle_radius}
                                                                    cy = {circle_indent}
                                                                    cx = {circle_indent}
                                                                    stroke-width = "4"
                                                                    stroke = "#14AECF"
                                                                    fill = "none"
                                                                    style = {{strokeDashoffset : dashoffset + "px"}}
                                                            />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                            <RichText
                                                tagName = {'p'}
                                                className = "rri-number-counter__count-title"
                                                value = {number.text}
                                                onChange = {text => {
                                                    const numbersClone       = cloneDeep(numbers);
                                                    numbersClone[index].text = text;
                                                    setAttributes({
                                                        numbers : numbersClone
                                                    });
                                                }}
                                                placeholder = {__('Lorem', i18n)}
                                                keepPlaceholderOnFocus
                                            />
                                        </div>
                                    );
                                },
                            )}
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
        };
    }),
    withFocusOutside,
)(Edit);
