/**
 * WordPress dependencies
 */
import {withState} from '@wordpress/compose';
import {
    Dashicon, IconButton, Popover, PanelBody, ToggleControl, TextControl,
} from '@wordpress/components';
import {URLInput} from '@wordpress/block-editor';
import {__} from '@wordpress/i18n';

/**
 * External dependencies
 */
import {i18n} from '../../constants';
import classnames from 'classnames';

const ariaClosed = __('Show more tools & options', i18n);
const ariaOpen = __('Hide more tools & options', i18n);

const UrlInputPopover = withState({
    openAdvanced: false,
})(props => {
    const {
        openAdvanced,
        setState,
    } = props;

    if (!props.onChange && !props.onChangeNewTab && !props.onChangeNoFollow) {
        return null
    }

    const mainClassName = classnames([
        'rri-url-input-popover',
    ], {
        'rri--show-advanced': openAdvanced,
    });

    const moreButtonClasses = classnames([
        'rri-url-input-control__more-button',
    ], {
        'rri--active': props.newTab || props.noFollow,
    });

    return (
        <Popover
            className={mainClassName}
            focusOnMount={false}
            position="bottom center"
        >
            <PanelBody>
                <div className="rri-url-input-popover__input-wrapper">
                    <Dashicon className="rri-url-input-control__icon" icon="admin-links"/>
                    {props.onChange && !props.disableSuggestions && // Auto-suggestions for inputting url.
                    <URLInput
                        className="rri-url-input-control__input"
                        value={props.value}
                        onChange={props.onChange}
                        autoFocus={false} // eslint-disable-line
                    />
                    }
                    {props.onChange && props.disableSuggestions && // Plain text control for inputting url.
                    <TextControl
                        className="rri-url-input-control__input rri-url-input-control__input--plain"
                        value={props.value}
                        onChange={props.onChange}
                        autoFocus={false} // eslint-disable-line
                        placeholder={__('Paste or type URL', i18n)}
                    />
                    }
                    {(props.onChangeNewTab || props.onChangeNoFollow) &&
                    <IconButton
                        className={moreButtonClasses}
                        icon="ellipsis"
                        label={openAdvanced ? ariaOpen : ariaClosed}
                        onClick={() => setState({openAdvanced: !openAdvanced})}
                        aria-expanded={openAdvanced}
                    />
                    }
                </div>
                {props.onChangeNewTab && openAdvanced &&
                <ToggleControl
                    label={__('Open link in new tab', i18n)}
                    checked={props.newTab}
                    onChange={props.onChangeNewTab}
                />
                }
                {props.onChangeNoFollow && openAdvanced &&
                <ToggleControl
                    label={__('Nofollow link', i18n)}
                    checked={props.noFollow}
                    onChange={props.onChangeNoFollow}
                />
                }
            </PanelBody>
        </Popover>
    )
});

UrlInputPopover.defaultProps = {
    value: '',
    disableSuggestions: false,
    onChange: null,

    newTab: false,
    noFollow: false,
    onChangeNewTab: null,
    onChangeNoFollow: null,
};

export default UrlInputPopover
