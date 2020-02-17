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
const { withInstanceId } = wp.compose;

/* Block panel settings */
const { Fragment } = wp.element;
const { PanelBody, PanelRow, TextControl, Button, Dashicon } = wp.components;

registerBlockType( 'rri/vertical-tab-single', {
	title: __( 'Single image tab' ), 
	icon: 'excerpt-view', 
	category: 'rri_blocks',
	keywords: [
		__( 'single tab' ),
		__( 'section' ),
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
        background_color: {
            type: 'string',
            default: ''
        },
        background_image: {
            type: 'object',
            default: {}
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
            <Fragment>
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
                            <MediaUploadCheck>                               
                                <MediaUpload 
                                    title="Background Image"
                                    allowedTypes={ ['image'] }
                                    value={ props.attributes.background_image }
                                    onSelect={ ( value ) => props.setAttributes( { background_image: value } ) }
                                    render = { ( { open } )  => renderMediaUploader( open, props ) }
                                />
                            </MediaUploadCheck>
                        </PanelRow>
                    </PanelBody>
                </InspectorControls>
            </Fragment>,
            <div className={ props.className, 'rri-tabs-pane' } role="tabpanel" id={ "tab-" + props.attributes.tabID }>
                <div className={ 'rri-tabs-media' }>
                   { getBlockMedia(props.attributes) }
                </div>
                <div className={ 'rri-tabs-content' }>
                    <div className={ "rri-block-title" }>Single tab with image</div>
                    <InnerBlocks 
                        allowedBlocks={ allowed }
                        renderAppender={ () => (
                            <InnerBlocks.ButtonBlockAppender />
                        ) }
                    />
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
                <div className={ 'rri-tabs-content' }>
                    
                    <InnerBlocks.Content />
                </div>
            </div>
        );
	},
} );

const renderMediaUploader = ( open, props ) => {
    if(props.attributes.background_image.id != null){
        return (
            <div className={ "background-image-preview" }>
                <h2>Background Image</h2>
                <div className={ "image" }>
                    <img src={props.attributes.background_image.url} />
                    <div className={ "image-controls" }>
                        <Button onClick={ open }>
                            <Dashicon icon="edit" />
                        </Button>
                        <Button
                            onClick = { ( attributes ) => props.setAttributes( { background_image: {} } ) }
                        >
                            <Dashicon icon="no-alt" />
                        </Button>
                    </div>
                </div>
            </div>
        );
    }else{
        return (
            <div className={ "background-image-preview" }>
                <h2>Background Image</h2>
                <Button 
                    onClick={ open }
                    className="editor-post-featured-image__toggle"
                >
                    { __('Open Media Library', 'rri') }
                </Button>
            </div>
        );
    }
}
const getBlockMedia = (attributes) => {
    if(attributes.background_image.id != null){
        return (
            <figure className={ 'media-image' }>
                <img src={attributes.background_image.url} alt='Preview image' />
            </figure>
        )     
    }
}
