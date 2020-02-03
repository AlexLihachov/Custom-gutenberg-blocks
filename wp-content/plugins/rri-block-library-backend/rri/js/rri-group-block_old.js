( function( blocks, i18n, element, hooks ) {

	var __ = i18n.__;
	var InspectorControls = wp.blockEditor.InspectorControls;
	var PanelBody = wp.components.PanelBody;
	var TextControl = wp.components.TextControl;
	var SelectControl = wp.components.SelectControl;

	/* Add attributes */
	var _group_block = function( settings, name ) {
		if( name == 'core/group' ) {
			settings.supports.align = true;
			settings.attributes = Object.assign(settings.attributes, {
				width: {
					type : 'string',
					default: ''
				},
				width_type: {
					type : 'string',
					default: 'px'
				},
				height: {
					type : 'string',
					default: ''
				},
				height_type: {
					type : 'string',
					default: 'px'
				}
			});
		}

		return settings;
	}
	
	hooks.addFilter( 'blocks.registerBlockType', 'rri/rri-group-block', _group_block);

	/* Add settings for custom attributs in inspector control */
	var groupCustomControls = wp.compose.createHigherOrderComponent( ( BlockEdit ) => {
		return ( props ) => {
			if( props.name == 'core/group' ) {

				var setWidth = function(val){
		    		props.setAttributes( { width: val } );
		    	}

		    	var setWidthType = function(val){
					props.setAttributes( { width_type: val } );
		    	}

		    	var setHeight = function(val){
		    		props.setAttributes( { height: val } );
		    	}

		    	var setHeightType = function(val){
		    		props.setAttributes( { height_type: val } );
		    	}

				var widthInspectorControl = element.createElement(
			    	InspectorControls,
				    null,
				    element.createElement(PanelBody, {
					        title : __('Width', 'rri'),
					        initialOpen : false
					    },
					    element.createElement(TextControl, {
					    	name : 'width',
					    	type : 'number',
					    	label : __('Width', 'rri'),
					    	value : props.attributes.width,
					    	required : 'required',
					    	onChange : setWidth.bind(this)
					    }),
					    element.createElement(SelectControl, {
					    	name : 'width_type',
					    	value : props.attributes.width_type,
					    	onChange : setWidthType.bind(this),
					    	options : [
					    		{value: 'px', label: __('px', 'rri')},
					    		{value: 'per', label: __('%', 'rri')}
					    	]
					    })
					)
				);

				var heightInspectorControl = element.createElement(
			    	InspectorControls,
				    null,
				    element.createElement(PanelBody, {
					        title : __('Height', 'rri'),
					        initialOpen : false
					    },
					    element.createElement(TextControl, {
					    	name : 'height',
					    	type : 'number',
					    	label : __('Height', 'rri'),
					    	value : props.attributes.height,
					    	required : 'required',
					    	onChange : setHeight.bind(this)
					    }),
					    element.createElement(SelectControl, {
					    	name : 'height_type',
					    	value : props.attributes.height_type,
					    	onChange : setHeightType.bind(this),
					    	options : [
					    		{value: 'px', label: __('px', 'rri')},
					    		{value: 'per', label: __('%', 'rri')}
					    	]
					    })
					)
				);

				return element.createElement(wp.element.Fragment, null, element.createElement(BlockEdit, props), widthInspectorControl, heightInspectorControl);
			} else {
				return element.createElement(BlockEdit, props);
			}
		}
	}, 'groupCustomControls' );

	hooks.addFilter( 'editor.BlockEdit', 'rri/rri-group-block', groupCustomControls );

	var groupCustomSave = function( props, blockType, attributes ) {
		if( blockType.name == 'core/group' ) {
			if( typeof attributes.width != undefined && attributes.width != '' ) {
				props.style = Object.assign(props.style, {
					width: attributes.width + ( attributes.width_type == 'px' ? 'px' : '%' ),
				});
			}

			if( typeof attributes.height != undefined && attributes.height != '' ) {
				props.style = Object.assign(props.style, {
					height: attributes.height + ( attributes.height_type == 'px' ? 'px' : '%' )
				});
			}
			console.log(props);
		}


		return props;
	}

	hooks.addFilter( 'blocks.getSaveContent.extraProps', 'rri/rri-group-block', groupCustomSave );

	/*var groupCustomEditWrapper = wp.compose.createHigherOrderComponent( ( BlockListBlock ) => {
		return function( props ) {

			if( props.name == 'core/group' ) {
				if( props.style == undefined ){
					props.style = '';
				}

				props.style = props.style + 'color: red;';
				console.log(props.style);
				props.style = Object.assign(props.style, {
					width: props.attributes.width + ( props.attributes.width_type == 'px' ? 'px' : '%' ),
					
				});
			}
			
			//console.log(props);

			return element.createElement( BlockListBlock, props );
		}
	}, 'BlockListBlock' );
	hooks.addFilter( 'editor.BlockListBlock', 'rri/rri-group-block', groupCustomEditWrapper );*/
}(
	window.wp.blocks,
	window.wp.i18n,
	window.wp.element,
	window.wp.hooks
) );