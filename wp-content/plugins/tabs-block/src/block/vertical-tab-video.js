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
const { InnerBlocks, InspectorControls, MediaUpload, MediaUploadCheck } = wp.blockEditor;
const { withState } = wp.compose;

/* Block panel settings */
const { Fragment } = wp.element;
const { PanelBody, PanelRow, TextControl, Button, Dashicon, RangeControl } = wp.components;

registerBlockType( 'rri/vertical-tab-video', {
	title: __( 'Single video tab' ), 
	icon: 'format-video', 
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
        videoURL: {
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
                        <TextControl 
                            label="Video URL"
                            value={ props.attributes.videoURL}
                            onChange={ ( value ) => props.setAttributes( { videoURL: value } ) }
                        />
                    </PanelRow>
                </PanelBody>
            </InspectorControls>,
            <div className={ props.className, 'rri-tabs-pane' } role="tabpanel" id={ "tab-" + props.attributes.tabID }>
                <div className={ 'rri-tabs-media' }>
                    { getBlockMedia( props.attributes) }
                </div>
                <div className={ 'rri-tabs-content' }>
                    <div className={ "rri-block-title" }>Single tab with video</div>
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
    if(attributes.videoURL != null && attributes.videoURL != ''){
        return (
            <div className={ 'media-video' }>
                <iframe width="100%" height="100%" src={ attributes.videoURL } frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        )     
    }
}
