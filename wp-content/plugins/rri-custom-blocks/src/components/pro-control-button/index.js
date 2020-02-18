/**
 * External dependencies
 */
import { ProControl } from '../../components';
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element'

class ProControlButton extends Component {
    constructor() {
        super( ...arguments );
        this.state = {
            isOpen: this.props.initialOpen ? this.props.initialOpen : false,
        };
        this.onClick = this.onClick.bind( this )
    }

    onClick() {
        this.setState( { isOpen: ! this.state.isOpen } )
    }

    render() {
        const wrapperClasses = classnames( [
            'rri-pro-control-button__wrapper',
        ], {
            'rri-pro-control-button--hidden': ! this.state.isOpen,
        } );

        return (
            <div className="components-base-control">
                <button className="rri-pro-control-more-dots" onClick={ this.onClick }>
                    <div className="rri-pro-control-more-dots__dot"></div>
                    <div className="rri-pro-control-more-dots__dot"></div>
                    <div className="rri-pro-control-more-dots__dot"></div>
                </button>
                <div className={ wrapperClasses } >
                    <ProControl
                        type={ this.props.type }
                        title={ this.props.title }
                        description={ this.props.description }
                        button={ this.props.button }
                        showButton={ this.props.showButton }
                    />
                </div>
            </div>
        )
    }
}

export default ProControlButton
