/**
 * WordPress dependencies
 */
import {
    Button, Popover, PanelBody, TextControl,
} from '@wordpress/components';
import {withState} from '@wordpress/compose';

/**
 * External dependencies
 */
import {icon} from './fonts';

// Limit to 100 searches as not to stall the browser.
const MAX_SEARCH_ICONS = 100;

export const searchIconName = search => {
    const lowerSearch = search && search.toLowerCase();
    const results     = [
        ...Object.values(icon).filter(icon => icon.iconName.includes(lowerSearch)).slice(0, MAX_SEARCH_ICONS),
    ];

    return results.slice(0, MAX_SEARCH_ICONS)
};


const IconSearchPopoverRRI = withState({
    value : '',
})(props => {
    const {value,} = props;
    const results  = searchIconName(value);

    return (
        <Popover
            className = "rri-icon-popover"
            onClose = {props.onClose}
            onClickOutside = {props.onClickOutside}
        >
            <PanelBody>
                <div className = "rri-icon-popover__iconlist">
                    {results.map(({prefix, iconName}, i) => {
                        const iconValue = `${prefix} ${prefix}-${iconName}`;
                        return <button
                            key = {i}
                            className = "components-button"
                            onClick = {() => {
                                props.onChange(iconValue);
                                props.onClose()
                            }}
                        >
                            <span className = {iconValue}></span>
                        </button>
                    })}
                </div>
            </PanelBody>
        </Popover>
    )
});

IconSearchPopoverRRI.defaultProps = {
    onChange       : () => {},
    onClose        : () => {},
    onClickOutside : () => {},
    allowReset     : true,
};

export default IconSearchPopoverRRI;
