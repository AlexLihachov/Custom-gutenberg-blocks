(function (blocks, i18n, element, hooks) {
    var __ = i18n.__;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.TextControl;
    var SelectControl = wp.components.SelectControl;
    var ColorPalette = wp.blockEditor.ColorPalette;
    var MediaUpload = wp.blockEditor.MediaUpload;
    var MediaUploadCheck = wp.blockEditor.MediaUploadCheck;
    var RangeControl = wp.components.RangeControl;
    var ToggleControl = wp.components.ToggleControl;
    var RichText = wp.blockEditor.RichText;

    var _sections = {
        size: ['width', 'width_type', 'height', 'height_type'],
        space: ['margin_top', 'margin_right', 'margin_bottom', 'margin_left', 'padding_top', 'padding_right', 'padding_bottom', 'padding_left', 'z_index'],
        background: ['background_color', 'background_image', 'background_video_url', 'background_parallax'],
        block_layout: ['center_align', 'right_align'],
        text_settings: ['header_color', 'text_color'],
        button_settings: ['button_text', 'button_link']
    };

    function checkDirty(_control, props) {
        var _dirtyClass = '';
        if (_sections[_control] != null) {
            for (let i = 0; i < _sections[_control].length; i++) {
                _key = _sections[_control][i];
                if (props.attributes[_key] != null && props.attributes[_key] != '' && props.attributes[_key] != _banner_block.attributes[_key].default) {
                    _dirtyClass = 'dirty';
                    break;
                }
            }
        }
        return _dirtyClass;
    }

    function resetControls(_control, props) {
        if (_sections[_control] != null) {
            _sections[_control].forEach(function (_key) {
                _temp = {};
                _temp[_key] = ((_banner_block.attributes[_key].type == 'number') ? Number(_banner_block.attributes[_key].default) : _banner_block.attributes[_key].default);

                props.setAttributes(_temp);
            });
        }
    }

    /*Highlight button*/
    var AccentTextButton = function (props) {
        return wp.element.createElement(
            wp.blockEditor.RichTextToolbarButton,
            {
                icon: 'admin-appearance',
                title: 'Accent text',
                onClick: function (e) {
                    props.onChange(
                        wp.richText.toggleFormat(props.value, {
                            type: 'rri/text-highlight'
                        })
                    );
                }
            }
        );
    };

    wp.richText.registerFormatType(
        'rri/text-highlight', {
            title: 'Accent text',
            tagName: 'span',
            className: 'rri-accent-highlighted',
            edit: AccentTextButton,
        }
    );

    var _banner_block = blocks.registerBlockType('rri/rri-banner-block', {
        title: __('RRI Image Banner', 'rri'),
        icon: {
            src: 'format-image',
        },
        category: 'rri-blocks',
        attributes: {
            title_text: {
                type: 'string',
                default: null,
                // source: 'html',
                selector: 'h1'
            },
            text: {
                type: 'string',
                default: null,
                // source: 'html',
                selector: 'p'
            },
            header_color: {
                type: 'string',
                default: '#fff'
            },
            text_color: {
                type: 'string',
                default: '#fff'
            },
            right_align: {
                type: 'boolean',
                default: false
            },
            center_align: {
                type: 'boolean',
                default: false
            },
            button_text: {
                type: 'string',
                default: 'large button',
            },
            button_link: {
                type: 'string',
                default: '#',
            },
            width: {
                type: 'number',
                default: null
            },
            width_type: {
                type: 'string',
                default: 'px'
            },
            height: {
                type: 'number',
                default: null
            },
            height_type: {
                type: 'string',
                default: 'px'
            },
            margin_top: {
                type: 'number',
                default: 0
            },
            margin_right: {
                type: 'number',
                default: 0
            },
            margin_bottom: {
                type: 'number',
                default: 0
            },
            margin_left: {
                type: 'number',
                default: 0
            },
            padding_top: {
                type: 'number',
                default: 132
            },
            padding_right: {
                type: 'number',
                default: 0
            },
            padding_bottom: {
                type: 'number',
                default: 191
            },
            padding_left: {
                type: 'number',
                default: 0
            },
            z_index: {
                type: 'number',
                default: null
            },
            element_style: {
                type: 'string',
                default: null
            },
            background_color: {
                type: 'string',
                default: '#6d6d6d'
            },
            background_image: {
                type: 'object',
                default: {}
            },
            background_video_url: {
                type: 'string',
                default: ''
            },
            background_parallax: {
                type: 'boolean',
                default: false
            }
        },
        supports: {
            align: true,
            anchor: true,
            html: false
        },
        edit: function (props) {
            var sizeInspector = element.createElement(InspectorControls, null,
                element.createElement(PanelBody, {
                        title: __('Size', 'rri'),
                        initialOpen: false,
                        className: checkDirty('size', props),
                    },
                    element.createElement('div', {className: 'size-selector'},
                        element.createElement('label', null, __('Width', 'rri')),
                        element.createElement(TextControl, {
                            name: 'width',
                            type: 'number',
                            value: props.attributes.width,
                            required: 'required',
                            onChange: function (val) {
                                props.setAttributes({width: Number(val)});
                            },
                        }),
                        element.createElement(SelectControl, {
                            name: 'width_type',
                            value: props.attributes.width_type,
                            onChange: function (val) {
                                props.setAttributes({width_type: val});
                            },
                            options: [
                                {value: 'px', label: __('px', 'rri')},
                                {value: 'per', label: __('%', 'rri')}
                            ]
                        }),
                    ),
                    element.createElement('div', {className: 'size-selector'},
                        element.createElement('label', null, __('Height', 'rri')),
                        element.createElement(TextControl, {
                            name: 'height',
                            type: 'number',
                            value: props.attributes.height,
                            required: 'required',
                            onChange: function (val) {
                                props.setAttributes({height: Number(val)});
                            }
                        }),
                        element.createElement(SelectControl, {
                            name: 'height_type',
                            value: props.attributes.height_type,
                            onChange: function (val) {
                                props.setAttributes({height_type: val});
                            },
                            options: [
                                {value: 'px', label: __('px', 'rri')},
                                {value: 'per', label: __('%', 'rri')}
                            ]
                        })
                    ),
                    element.createElement('button', {
                        className: 'components-button is-button is-default is-small',
                        onClick: function () {
                            resetControls('size', props);
                        }
                    }, __('Reset', 'rri'))
                )
            );

            var spacingInspector = element.createElement(InspectorControls, null,
                element.createElement(PanelBody, {
                        title: __('Spacing', 'rri'),
                        initialOpen: false,
                        className: checkDirty('space', props),
                    },
                    element.createElement('div', {className: 'spacing-selector'},
                        element.createElement('h2', null, __('Margin (px)', 'rri')),
                        element.createElement(RangeControl, {
                            label: element.createElement('img', {src: rri_blocks.image_url + 'Top.svg', width: '20px'}),
                            value: props.attributes.margin_top,
                            min: -200,
                            max: 200,
                            onChange: function (val) {
                                props.setAttributes({margin_top: Number(val)});
                            }
                        }),
                        element.createElement(RangeControl, {
                            label: element.createElement('img', {
                                src: rri_blocks.image_url + 'Right.svg',
                                width: '20px'
                            }),
                            value: props.attributes.margin_right,
                            min: -200,
                            max: 200,
                            onChange: function (val) {
                                props.setAttributes({margin_right: Number(val)});
                            }
                        }),
                        element.createElement(RangeControl, {
                            label: element.createElement('img', {
                                src: rri_blocks.image_url + 'Bottom.svg',
                                width: '20px'
                            }),
                            value: props.attributes.margin_bottom,
                            min: -200,
                            max: 200,
                            onChange: function (val) {
                                props.setAttributes({margin_bottom: Number(val)});
                            }
                        }),
                        element.createElement(RangeControl, {
                            label: element.createElement('img', {
                                src: rri_blocks.image_url + 'Left.svg',
                                width: '20px'
                            }),
                            value: props.attributes.margin_left,
                            min: -200,
                            max: 200,
                            onChange: function (val) {
                                props.setAttributes({margin_left: Number(val)});
                            }
                        })
                    ),
                    element.createElement('div', {className: 'spacing-selector'},
                        element.createElement('h2', null, __('Padding (px)', 'rri')),
                        element.createElement(RangeControl, {
                            label: element.createElement('img', {src: rri_blocks.image_url + 'Top.svg', width: '20px'}),
                            value: props.attributes.padding_top,
                            min: 0,
                            max: 200,
                            onChange: function (val) {
                                props.setAttributes({padding_top: Number(val)});
                            }
                        }),
                        element.createElement(RangeControl, {
                            label: element.createElement('img', {
                                src: rri_blocks.image_url + 'Right.svg',
                                width: '20px'
                            }),
                            value: props.attributes.padding_right,
                            min: 0,
                            max: 200,
                            onChange: function (val) {
                                props.setAttributes({padding_right: Number(val)});
                            }
                        }),
                        element.createElement(RangeControl, {
                            label: element.createElement('img', {
                                src: rri_blocks.image_url + 'Bottom.svg',
                                width: '20px'
                            }),
                            value: props.attributes.padding_bottom,
                            min: 0,
                            max: 200,
                            onChange: function (val) {
                                props.setAttributes({padding_bottom: Number(val)});
                            }
                        }),
                        element.createElement(RangeControl, {
                            label: element.createElement('img', {
                                src: rri_blocks.image_url + 'Left.svg',
                                width: '20px'
                            }),
                            value: props.attributes.padding_left,
                            min: 0,
                            max: 200,
                            onChange: function (val) {
                                props.setAttributes({padding_left: Number(val)});
                            }
                        })
                    ),
                    element.createElement('div', null,
                        element.createElement('h2', null, __('Z-Index', 'rri')),
                        element.createElement(TextControl, {
                            name: 'z_index',
                            type: 'number',
                            value: props.attributes.z_index,
                            onChange: function (val) {
                                props.setAttributes({z_index: Number(val)});
                            }
                        })
                    ),
                    element.createElement('button', {
                        className: 'components-button is-button is-default is-small',
                        onClick: function () {
                            resetControls('space', props);
                        }
                    }, __('Reset', 'rri'))
                )
            );

            var backgroundInspector = element.createElement(InspectorControls, null,
                element.createElement(PanelBody, {
                        title: __('Background Settings', 'rri'),
                        initialOpen: false,
                        className: checkDirty('background', props),
                    },
                    element.createElement('div', null,
                        element.createElement('h2', null,
                            __('Background Color', 'rri'),
                            element.createElement('div', {
                                    style: {
                                        height: '20px',
                                        width: '40px',
                                        backgroundColor: props.attributes.background_color,
                                        display: 'inline-block',
                                        margin: '0 0 0 5px',
                                        verticalAlign: 'bottom'
                                    }
                                }
                            )),
                        element.createElement(ColorPalette, {
                            value: props.attributes.background_color,
                            onChange: function (val) {
                                props.setAttributes({background_color: val});
                            }
                        })
                    ),
                    element.createElement(MediaUploadCheck, null,
                        element.createElement('h2', null, __('Background Image', 'rri')),
                        element.createElement(MediaUpload, {
                            allowedTypes: ['image'],
                            value: ((props.attributes.background_image != null && props.attributes.background_image.id != null) ? props.attributes.background_image.id : ''),
                            onSelect: function (val) {
                                props.setAttributes({background_image: val});
                            },
                            render: function (obj) {
                                if (props.attributes.background_image.id != null) {
                                    return element.createElement('div', null,
                                        element.createElement('img', {
                                            src: props.attributes.background_image.url
                                        }),
                                        element.createElement('button', {
                                            onClick: obj.open,
                                            className: 'editor-post-featured-image__toggle'
                                        }, __('Replace Image', 'rri')),
                                        element.createElement('a', {
                                            href: '#',
                                            onClick: function () {
                                                props.setAttributes({background_image: {}});
                                                return false;
                                            }
                                        }, __('Remove Image', 'rri'))
                                    );
                                } else {
                                    return element.createElement('button', {
                                        onClick: obj.open,
                                        className: 'editor-post-featured-image__toggle'
                                    }, __('Open Media Library', 'rri'))
                                }
                            }
                        })
                    ),
                    element.createElement('div', {style: {marginTop: 20},},
                        element.createElement(ToggleControl, {
                            name: 'background_parallax',
                            label: __('Parallax Background', 'rri'),
                            checked: props.attributes.background_parallax,
                            onChange: function (val) {
                                props.setAttributes({background_parallax: val});
                            },
                        })
                    ),
                    element.createElement('button', {
                        className: 'components-button is-button is-default is-small',
                        onClick: function () {
                            resetControls('background', props);
                        }
                    }, __('Reset', 'rri'))
                )
            );

            var textSettings = element.createElement(InspectorControls, null,
                element.createElement(PanelBody, {
                        title: __('Text settings', 'rri'),
                        initialOpen: false,
                        name: 'text_settings',
                        className: checkDirty('text_settings', props),
                    },
                    element.createElement('label', null, __('Header text color', 'rri')),
                    element.createElement(ColorPalette, {
                        value: props.attributes.header_color,
                        onChange: function (val) {
                            props.setAttributes({header_color: val});
                        }
                    }),
                    element.createElement('label', null, __('Body text color', 'rri')),
                    element.createElement(ColorPalette, {
                        value: props.attributes.text_color,
                        onChange: function (val) {
                            props.setAttributes({text_color: val});
                        }
                    }),
                    element.createElement('button', {
                        className: 'components-button is-button is-default is-small',
                        onClick: function () {
                            resetControls('text_settings', props);
                        }
                    }, __('Reset', 'rri'))
                )
            );

            var buttonSettings = element.createElement(InspectorControls, null,
                element.createElement(PanelBody, {
                        title: __('Button settings', 'rri'),
                        initialOpen: false,
                        className: checkDirty('button_settings', props),
                    },
                    element.createElement('label', null, __('Button text', 'rri')),
                    element.createElement(TextControl, {
                        name: 'button_text',
                        type: 'string',
                        value: props.attributes.button_text,
                        required: 'required',
                        onChange: function (val) {
                            props.setAttributes({button_text: val});
                        },
                    }),
                    element.createElement('label', null, __('Button link', 'rri')),
                    element.createElement(TextControl, {
                        name: 'button_link',
                        type: 'string',
                        value: props.attributes.button_link,
                        required: 'required',
                        onChange: function (val) {
                            props.setAttributes({button_link: val});
                        },
                    })
                )
            );
            var blockLayout = element.createElement(InspectorControls, null,
                element.createElement(PanelBody, {
                        title: __('Block layout', 'rri'),
                        initialOpen: false,
                        className: checkDirty('block_layout', props)
                    },
                    element.createElement('label', null, __('Align center', 'rri')),
                    element.createElement(ToggleControl, {
                        name: 'center_align',
                        type: 'boolean',
                        checked: props.attributes.center_align,
                        onChange: function () {
                            props.setAttributes({center_align: !props.attributes.center_align});
                            props.setAttributes({right_align: false})
                        }
                    }),
                    element.createElement('label', null, __('Aling right', 'rri')),
                    element.createElement(ToggleControl, {
                        name: 'right_align',
                        type: 'boolean',
                        checked: props.attributes.right_align,
                        onChange: function () {
                            props.setAttributes({right_align: !props.attributes.right_align});
                            props.setAttributes({center_align: false})
                        }
                    }),
                    element.createElement('button', {
                        className: 'components-button is-button is-default is-small',
                        onClick: function () {
                            resetControls('block_layout', props);
                        }
                    }, __('Reset', 'rri'))
                )
            );

            _style = {};
            _element_style = '';
            Object.keys(props.attributes).forEach(function (key) {
                _val = props.attributes[key];
                if (_val != null && _val != '') {
                    switch (key) {
                        case 'width':
                            _type = (props.attributes.width_type == 'px' ? 'px' : '%');
                            _style[key] = _val + _type;
                            _element_style += 'width: ' + _val + _type + ';';
                            break;
                        case 'height':
                            _type = (props.attributes.height_type == 'px' ? 'px' : '%');
                            _style[key] = _val + _type;
                            _element_style += 'height: ' + _val + _type + ';';
                            break;
                        case 'width_type':
                        case 'height_type':
                            break;
                        case 'margin_top':
                        case 'margin_right':
                        case 'margin_bottom':
                        case 'margin_left':
                        case 'padding_top':
                        case 'padding_right':
                        case 'padding_bottom':
                        case 'padding_left':
                            key = key.replace('_', '-');
                            _style[key] = _val + 'px';
                            _element_style += key + ': ' + _val + 'px;';
                            break;
                        case 'z_index':
                        case 'background_color':
                            key = key.replace('_', '-');
                            _style[key.replace('_', '-')] = _val;
                            _element_style += key + ': ' + _val + ';';
                            break;
                        case 'background_image':
                            if (_val.id != null) {
                                _style['background-image'] = 'url(' + _val.url + ')';
                                _style['background-position'] = 'center';
                                _style['background-size'] = 'cover';
                                _element_style += 'background-image: url(' + _val.url + '); background-position: center; background-size: 100%;';
                            }
                            break;
                        case 'background_parallax':
                            _style['background-attachment'] = 'fixed';
                            _element_style += 'background-attachment: fixed;';
                            break;
                    }
                }
            });

            props.setAttributes({element_style: _element_style});
            var layoutClasses = '';
            if (props.attributes.right_align === true) {
                layoutClasses += ' reverse';
            }
            if (props.attributes.center_align === true) {
                layoutClasses += ' center';
            }

            return element.createElement('div', {className: 'rri-block rri-banner ' + layoutClasses, style: _style},
                element.createElement('div', {},
                    element.createElement(RichText, {
                        selector: 'h1',
                        name: 'title_text',
                        source: 'html',
                        value: props.attributes.title_text,
                        placeholder: 'Header text',
                        onChange: function (val) {
                            props.setAttributes({title_text: val});
                        },
                        style: {color: props.attributes.header_color},
                    }),
                    element.createElement(RichText, {
                        selector: 'p',
                        name: 'body_text',
                        source: 'html',
                        value: props.attributes.text,
                        placeholder: 'Text',
                        onChange: function (val) {
                            props.setAttributes({text: val});
                        },
                        style: {marginBottom: '25px', color: props.attributes.text_color}
                    }),
                    element.createElement('a', {
                        className: 'rri-cta',
                        href: props.attributes.button_link
                    }, props.attributes.button_text),
                ),
                element.createElement('div', {},),
                sizeInspector,
                spacingInspector,
                backgroundInspector,
                textSettings,
                buttonSettings,
                blockLayout
            );
        },
        save: function (props) {
            var layoutClasses = '';
            if (props.attributes.right_align === true) {
                layoutClasses += ' reverse';
            }
            if (props.attributes.center_align === true) {
                layoutClasses += ' center';
            }
            return element.createElement('div', {
                    name: 'body_text',
                    className: 'rri-block rri-banner' + layoutClasses,
                    style: props.attributes.element_style
                },
                element.createElement('div', {},
                    element.createElement('h1', {
                        className: 'rri-banner-header',
                        style: {color: props.attributes.header_color}
                    }, props.attributes.title_text),
                    element.createElement('p', {className: 'rri-banner-header'}, props.attributes.text),
                    element.createElement('a', {
                        className: 'rri-cta',
                        href: props.attributes.button_link
                    }, props.attributes.button_text),
                ),
                element.createElement('div', {},
                ),
            )
        }
    });
}(
    window.wp.blocks,
    window.wp.i18n,
    window.wp.element,
    window.wp.hooks
));