/**
 * External dependencies
 */
import {BaseControlMultiLabel} from '../../components';

/**
 * Internal dependencies
 */
import SVGImageIcon from './images/image.svg'

/**
 * WordPress dependencies
 */
import {BaseControl, Dashicon} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import {Fragment} from '@wordpress/element';
import {i18n} from '../../constants';
import {MediaUpload} from '@wordpress/block-editor';

const ImageControl = props => {
    const type = props.imageURL && props.imageURL.match(/(mp4|webm|ogg)/i) ? 'video' : 'image';
    const onRemove = () => {
        if (props.onRemove) {
            props.onRemove()
        } else {
            props.onChange({
                url: '',
                id: '',
                width: '',
                height: '',
            })
        }
    };

    return (
        <div className="rri-image-control">
            <BaseControl help={props.help}>
                <BaseControlMultiLabel
                    label={props.label}
                    screens={props.screens}
                />
                <MediaUpload
                    onSelect={props.onChange}
                    allowedTypes={props.allowedTypes}
                    value={props.imageID}
                    render={obj => {
                        return (
                            <Fragment>
                                {props.imageURL &&
                                <div className="rri-image-preview-wrapper">
                                    <button className="rri-image-preview-remove" onClick={onRemove}>
                                        <Dashicon icon="no"/>
                                    </button>
                                    {type === 'video' && (
                                        <video
                                            className="rri-image-preview"
                                            autoPlay
                                            muted
                                            loop
                                            src={props.imageURL}
                                            onClick={obj.open}
                                            onKeyDown={event => {
                                                if (event.keyCode === 13) {
                                                    obj.open()
                                                }
                                            }}
                                        />
                                    )}
                                    {type === 'image' && (
                                        /* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */
                                        <img
                                            className="rri-image-preview"
                                            src={props.imageURL}
                                            onClick={obj.open}
                                            onKeyDown={event => {
                                                if (event.keyCode === 13) {
                                                    obj.open()
                                                }
                                            }}
                                            alt={__('preview', i18n)}
                                        />
                                    )}
                                </div>
                                }
                                {!props.imageURL && (
                                    <div
                                        className="rri-placeholder"
                                        onClick={obj.open}
                                        onKeyDown={event => {
                                            if (event.keyCode === 13) {
                                                obj.open()
                                            }
                                        }}
                                        role="button"
                                        tabIndex={0}
                                    >
                                        <SVGImageIcon/>
                                    </div>
                                )}
                            </Fragment>
                        )
                    }}
                />
            </BaseControl>
        </div>
    )
};

ImageControl.defaultProps = {
    label: '',
    imageID: '',
    imageURL: '',
    onChange: ({url, id, width, height}) => {
    }, // eslint-disable-line
    onRemove: () => {
    },
    allowedTypes: ['image'],
    help: '',
    screens: ['desktop'],
};

export default ImageControl
