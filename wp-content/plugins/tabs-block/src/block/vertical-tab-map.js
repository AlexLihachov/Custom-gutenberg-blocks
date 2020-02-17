/**
 * BLOCK: Single tab for vertical tabs
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

/* Block Registration */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const allowed = [ 'core/heading', 'core/paragraph', 'core/button' ];
const { InnerBlocks, InspectorControls } = wp.blockEditor;
const { withState } = wp.compose;

/* Block panel settings */
const { Fragment } = wp.element;
const { PanelBody, PanelRow, TextControl, TextareaControl  } = wp.components;

registerBlockType( 'rri/vertical-tab-map', {
	title: __( 'Single map tab' ), 
	icon: 'admin-site', 
	category: 'rri_blocks',
	keywords: [
		__( 'single tab' ),
		__( 'section' ),
		__( 'video' ),
    ],
    attributes: {
        tabID: {
            type: 'string',
            default: ''
        },
        tabName: {
            type: 'string',
            default: 'Tab title'
        },
        embedMap: {
            type: 'string',
            default: ''
        },
    },
	supports: {
		align: false,
		reusable: false,
		anchor: false
    },
    parent: [ 'rri/vertical-tabs' ],
	edit:( props ) => {
        props.setAttributes( { tabID: props.clientId } );
		return [
            <InspectorControls>
                <PanelBody
                    title="Tab Settings"
                    initialOpen={ true }
                >
                    <PanelRow>
                        <TextControl 
                            label="Tab title"
                            value={ props.attributes.tabName }
                            onChange={ ( value ) => props.setAttributes( { tabName: value } ) }
                        />
                        
                    </PanelRow>
                    <PanelRow>
                        <TextareaControl 
                            label="Embed Map"
                            value={ props.attributes.embedMap}
                            onChange={ ( value ) => props.setAttributes( { embedMap: value } ) }
                        />
                    </PanelRow>
                </PanelBody>
            </InspectorControls>,
            <div className={ props.className, 'rri-tabs-pane' } role="tabpanel" id={ "tab-" + props.attributes.tabID }>
                <div className={ 'rri-tabs-media' }>
                    { getBlockMedia( props.attributes) }
                </div>
                <div className={ 'rri-tabs-content' }>
                    <div className={ "rri-block-title" }>Single tab with map</div>
                </div>
            </div>
        ];
    },
    save: ( props ) => {
		return (
            <div className={ 'rri-tabs-pane' } role="tabpanel" id={ "tab-" + props.attributes.tabID } data-name={ props.attributes.tabName }>
                <div className={ 'rri-tabs-media' }>
                    { getBlockMedia( props.attributes) }
                </div>
            </div>
        );
	},
} );

const getBlockMedia = (attributes) => {
    if(attributes.embedMap != null && attributes.embedMap != ''){
        return (
            <div className={ 'media-video' } dangerouslySetInnerHTML={{__html: attributes.embedMap}} />
        )     
    }
}
