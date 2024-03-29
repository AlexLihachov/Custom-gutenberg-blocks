/**
 * External dependencies
 */
import {WhenResponsiveScreen} from '../../components';
import {__getValue} from '../../util';

/**
 * WordPress dependencies
 */
import {Children, cloneElement, Fragment,} from '@wordpress/element';
import {camelCase} from 'lodash';
import {sprintf} from '@wordpress/i18n';

const ResponsiveControl = props => {
    const getAttrName = ( attrName = '' ) => camelCase( sprintf( props.attrNameTemplate, attrName ) );
    const getValue = __getValue( props.blockAttributes, getAttrName, '' );

    return (
        <Fragment>
            <WhenResponsiveScreen>
                { Children.toArray( props.children ).map( child => {
                    return cloneElement( child, {
                        value: getValue(),
                        onChange: value => {
                            if ( props.onChange ) {
                                props.onChange( getAttrName(), value, '' )
                            } else {
                                props.setAttributes( { [ getAttrName() ]: value } )
                            }
                        },
                    } )
                } ) }
            </WhenResponsiveScreen>
            <WhenResponsiveScreen screen="tablet">
                { Children.toArray( props.children ).map( child => {
                    return cloneElement( child, {
                        value: getValue( 'Tablet' ),
                        placeholder: getValue() || child.props.placeholder,
                        onChange: value => {
                            if ( props.onChange ) {
                                props.onChange( getAttrName( 'Tablet' ), value, 'Tablet' )
                            } else {
                                props.setAttributes( { [ getAttrName( 'Tablet' ) ]: value } )
                            }
                        },
                    } )
                } ) }
            </WhenResponsiveScreen>
            <WhenResponsiveScreen screen="mobile">
                { Children.toArray( props.children ).map( child => {
                    return cloneElement( child, {
                        value: getValue( 'Mobile' ),
                        placeholder: getValue( 'Tablet' ) || getValue() || child.props.placeholder,
                        onChange: value => {
                            if ( props.onChange ) {
                                props.onChange( getAttrName( 'Mobile' ), value, 'Mobile' )
                            } else {
                                props.setAttributes( { [ getAttrName( 'Mobile' ) ]: value } )
                            }
                        },
                    } )
                } ) }
            </WhenResponsiveScreen>
        </Fragment>
    )
};

ResponsiveControl.defaultProps = {
    attrNameTemplate: '%s',
    setAttributes: () => {},
    blockAttributes: {},
    onChange: null,
    placeholder: '',
};

export default ResponsiveControl