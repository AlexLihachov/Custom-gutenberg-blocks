/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
import {BaseControl, Button} from '@wordpress/components';
import {withInstanceId, withState} from '@wordpress/compose';

/**
 * External dependencies
 */

import {icon} from '../icon-search-popover-rri/fonts';
import {i18n} from '../../constants';
import {omit} from 'lodash';
import {IconSearchPopoverRRI} from '../../components';


/**
 * Check whether the string value is a valid icon.
 *
 * @param {string} value The string value to check.
 *
 * @return {boolean} True if the value is a valid icon.
 */
export const isValidIconValue = value => {
    const iconArray = getIconArray( value );
    if ( ! iconArray ) {
        return false
    }

    const prefix = value.match( /^\w*/ )[ 0 ];
    if ( ! [ 'icon' ].includes( prefix ) ) {
        return false
    }

    const icons = {
        icon
    };
    const matches = Object.values( icons[ prefix ] ).filter( icon => icon.iconName === iconArray[ 1 ] );
    return matches.length > 0
};

export const getIconArray = value => {
    if ( typeof value !== 'string' ) {
        return null
    }
    if ( ! value.match( /\w*-/ ) ) {
        return null
    }
    return [
        value.match( /\w*/ ), // Prefix.
        // value.match( /\w*/ )[ 0 ], // Prefix.
        value.match( /\w+-(.*)$/ )[ 1 ], // Icon name.
    ]
};

const IconControlRRI = withInstanceId( withState( {
    openPopover: false,
    clickedOnButton: false,
} )( props => {
    const {
              instanceId,
              openPopover,
              clickedOnButton,
              setState,
          } = props;

    const isValidIcon = isValidIconValue( props.value );

    return (
        <BaseControl
            className={ `rri-icon-control rri-icon-control-${ instanceId }` }
            { ...omit( props, [ 'onChange', 'value' ] ) }
        >
            <div className="rri-icon-control__wrapper">
                <div className="rri-icon-control__button-wrapper">
                    <Button
                        // className="rri-icon-control__button components-button is-button is-default"
                        isDefault
                        className="rri-icon-control__icon-button"
                        onClick={ () => {
                            if ( ! clickedOnButton ) {
                                setState( { openPopover: true } )
                            } else {
                                // If the popup closed because this button was clicked (while the popup was open) ensure the popup is closed.
                                // This is needed or else the popup will always open when spam clicking the button.
                                setState( {
                                    openPopover: false,
                                    clickedOnButton: false,
                                } )
                            }
                        } }
                    >
                        { isValidIcon && <span className={ props.value } ></span> }
                        { ! isValidIcon && <span className="icon icon-Plus" style={ { opacity: 0.3 } } /> }
                    </Button>
                    { openPopover &&
                    <IconSearchPopoverRRI
                        onClickOutside={ event => {
                            // This statement checks whether the close was triggered by clicking on the button that opens this.
                            // This is needed or else the popup will always open when spam clicking the button.
                            if ( event.target ) {
                                if ( event.target.closest( `.rri-icon-control-${ instanceId }` ) ) {
                                    setState( { clickedOnButton: true } );
                                    return
                                }
                            }
                            setState( {
                                openPopover: false,
                                clickedOnButton: false,
                            } )
                        } }
                        onClose={ () => setState( { openPopover: false } ) }
                        onChange={ props.onChange }
                    />
                    }
                </div>
                <Button
                    onClick={ () => {
                        props.onChange( '' );
                        setState( { openPopover: false } )
                    } }
                    isSmall
                    isDefault
                    className="components-range-control__reset"
                >
                    { __( 'Reset', i18n ) }
                </Button>
            </div>
        </BaseControl>
    )
} ) );

IconControlRRI.defaultProps = {
    label: __( 'Icon', i18n ),
    value: '',
    onChange: () => {},
};

export default IconControlRRI;
