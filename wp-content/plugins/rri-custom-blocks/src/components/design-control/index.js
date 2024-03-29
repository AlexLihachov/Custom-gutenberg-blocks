/**
 * A Control for selecting designs.
 */
/**
 * External dependencies
 */
import {DesignPanelItem} from '../design-panel-item';
import {omit} from 'lodash';
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {RadioControl} from '@wordpress/components';

export function DesignControl( props ) {
    const {
        selected, options, onChange, className = '',
    } = props;

    // Convert the options.
    const fixedOptions = options.map( option => {
        return {
            ...option,
            label: <DesignPanelItem imageFile={ option.image } imageHoverFile={ option.hoverImage } imageWidth={ option.imageWidth } imageHeight={ option.imageHeight } isPro={ option.isPro } label={ option.label } />,
            title: option.label,
            value: option.value,
        }
    } );

    return (
        <div className={ classnames( className, 'rri-design-control-wrapper components-base-control' ) }>
            <div className="components-base-control__label">{ props.label }</div>
            <RadioControl
                { ...omit( props, [ 'label' ] ) }
                className="rri-design-control"
                selected={ selected }
                options={ fixedOptions }
                onChange={ onChange }
            />
        </div>
    );
}

export default DesignControl;
