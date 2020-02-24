( function() {
	var blocks = wp.blocks;
	var __ = wp.i18n.__;
	var ServerSideRender = wp.components.ServerSideRender;
	var InspectorControls = wp.blockEditor.InspectorControls;
	var PanelBody = wp.components.PanelBody;
	var element = wp.element;
	var SelectControl = wp.components.SelectControl;
	var TextControl = wp.components.TextControl;
	var InnerBlocks = wp.blockEditor.InnerBlocks;

	var global_post_types = null;

	jQuery( document ).on('keydown.autocomplete', ".post_autocomplete input", function(){
		var _this = jQuery(this);
		var _key = _this.data('id');

		var _type = jQuery('select[name="post_type_' + _key + '"]').val();

		_this.autocomplete({
			source: function(request, response) {
				wp.apiFetch( {
					path: '/wp/v2/search/?subtype=' + _type + '&search=' + request.term,
				} ).then( data => {

					arrData = [];
					if(data.length > 0){
						data.forEach(function( item ){
							arrData.push({id: item.id, label: item.title})
						})
					}

					response(arrData);
				} )
			},
			select: function( event, ui ) {

				var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
				var inputEvent = new Event('input', { bubbles: true});

				nativeInputValueSetter.call(document.getElementsByName('post_id_' + _key)[0], ui.item.id);
				document.getElementsByName('post_id_' + _key)[0].dispatchEvent(inputEvent);

				nativeInputValueSetter.call(_this[0], ui.item.label);
				_this[0].dispatchEvent(inputEvent);

			},
		})
	});

	blocks.registerBlockType( 'rri/rri-related-posts-block', {
		title: __( 'Related Posts', 'rri' ),
		icon: {
			foreground: '#14ACEF',
			src: 'admin-page'
		},
		attributes: {
			post_types: {
				type: 'array',
				default: []
			},
			related_posts: {
				type: 'object',
				default: {}
			},
			align: {
				type: 'string',
				default: ''
			},
		},
		category: 'rri-blocks',
		supports: {
			align: true,
			html: true
		},
		edit: function( props ) {

			if( global_post_types == null ) {

				_InspectorControls = null;

				wp.apiFetch({path: 'wp/v2/types'}).then( posttypes => { 
					global_post_types = posttypes;

					var temp_post_types = [];

					if( global_post_types != null && Object.keys( global_post_types ).length > 0 ){
						
						Object.keys( global_post_types ).forEach( function( key ) {
							if( key != 'attachment' && key != 'wp_block' ) {
								temp_post_types.push( { label: global_post_types[key].name, value: key } );
							}
						} );
					}
					
					props.setAttributes( { post_types: temp_post_types } );
				});
			}

			var fnChange = function( type, key, value ) {

				recent  = Object.assign({}, props.attributes.related_posts);

				if( recent[key] == null ) {
					recent[key] = {};
				} else {
					recent[key] = Object.assign({}, props.attributes.related_posts[key]);
				}

				recent[key][type] = value;

				if( type == 'type' ) {
					recent[key]['title'] = '';
					recent[key]['id'] = '';
				}

				props.setAttributes( { related_posts: recent } );
			}

			if( Object.keys(props.attributes.post_types).length > 0 ) {
				_InspectorControls = element.createElement( InspectorControls, null,
					element.createElement(PanelBody, {
							title: __('Recent Posts', 'rri'),
							initialOpen: true,
							className: 'rri-related-posts-panel'
						},
						element.createElement('strong', null, __('Block 1', 'rri')),
						element.createElement(SelectControl, {
							label: __('Post Type', 'rri'),
							name: 'post_type_1',
							options: props.attributes.post_types,
							value: ( props.attributes.related_posts[1] != undefined && props.attributes.related_posts[1]['type'] != undefined ? props.attributes.related_posts[1]['type'] : '' ),
							onChange: fnChange.bind(this, 'type', 1)
						}),
						element.createElement(TextControl, {
							label: __('Post', 'rri'),
							name: 'post_title_1',
							'data-id': '1',
							className: 'post_autocomplete',
							value: ( props.attributes.related_posts[1] != undefined && props.attributes.related_posts[1]['title'] != undefined ? props.attributes.related_posts[1]['title'] : '' ),
							onChange: fnChange.bind(this, 'title', 1)
						}),
						element.createElement(TextControl, {
							name: 'post_id_1',
							className: 'hide',
							value: ( props.attributes.related_posts[1] != undefined && props.attributes.related_posts[1]['id'] != undefined ? props.attributes.related_posts[1]['id'] : '' ),
							onChange: fnChange.bind(this, 'id', 1)
						}),
						element.createElement('strong', null, __('Block 2', 'rri')),
						element.createElement(SelectControl, {
							label: __('Post Type', 'rri'),
							name: 'post_type_2',
							'data-id': '2',
							options: props.attributes.post_types,
							value: ( props.attributes.related_posts[2] != undefined && props.attributes.related_posts[2]['type'] != undefined ? props.attributes.related_posts[2]['type'] : '' ),
							onChange: fnChange.bind(this, 'type', 2)
						}),
						element.createElement(TextControl, {
							label: __('Post', 'rri'),
							name: 'post_title_2',
							'data-id': '2',
							className: 'post_autocomplete',
							value: ( props.attributes.related_posts[2] != undefined && props.attributes.related_posts[2]['title'] != undefined ? props.attributes.related_posts[2]['title'] : '' ),
							onChange: fnChange.bind(this, 'title', 2)
						}),
						element.createElement(TextControl, {
							name: 'post_id_2',
							className: 'hide',
							value: ( props.attributes.related_posts[2] != undefined && props.attributes.related_posts[2]['id'] != undefined ? props.attributes.related_posts[2]['id'] : '' ),
							onChange: fnChange.bind(this, 'id', 2)
						}),
						element.createElement('strong', null, __('Block 3', 'rri')),
						element.createElement(SelectControl, {
							label: __('Post Type', 'rri'),
							name: 'post_type_3',
							options: props.attributes.post_types,
							value: ( props.attributes.related_posts[3] != undefined && props.attributes.related_posts[3]['type'] != undefined ? props.attributes.related_posts[3]['type'] : '' ),
							onChange: fnChange.bind(this, 'type', 3)
						}),
						element.createElement(TextControl, {
							label: __('Post', 'rri'),
							name: 'post_title_3',
							'data-id': '3',
							className: 'post_autocomplete',
							value: ( props.attributes.related_posts[3] != undefined && props.attributes.related_posts[3]['title'] != undefined ? props.attributes.related_posts[3]['title'] : '' ),
							onChange: fnChange.bind(this, 'title', 3)
						}),
						element.createElement(TextControl, {
							name: 'post_id_3',
							className: 'hide',
							value: ( props.attributes.related_posts[3] != undefined && props.attributes.related_posts[3]['id'] != undefined ? props.attributes.related_posts[3]['id'] : '' ),
							onChange: fnChange.bind(this, 'id', 3)
						})
					)
				);
			}

			return (
				wp.element.createElement('div', {
						className: 'rri-related-posts-container'
					}, 
					element.createElement( InnerBlocks, {
						renderAppender: InnerBlocks.ButtonBlockAppender,
						allowedBlocks: [ 'core/heading', 'core/paragraph', 'core/spacer' ]
					} ),
					wp.element.createElement( ServerSideRender, {
						block: 'rri/rri-related-posts-block',
						attributes: props.attributes
					} ), 
					_InspectorControls
				)
			);
		},
		save: function(props) {
			return element.createElement( InnerBlocks.Content );
		}
	} );
}() );
