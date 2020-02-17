/**
 * BLOCK: vertical-tabs
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

const allowed = [ 'rri/vertical-tab-single', 'rri/vertical-tab-video' ];
const { InnerBlocks, InspectorControls, BlockControls } = wp.blockEditor;
const { withState } = wp.compose;

/* Block panel settings */
const { PanelBody, PanelRow, TextControl, SelectControl, RangeControl, Toolbar, Button } = wp.components;

const attributes = {
	isCollapsed:{
		type: 'boolean',
		default: false
	},
	width: {
		type: 'number',
		default: 100
	},
	width_type: {
		type: 'string',
		default: '%'
	},
	height: {
		type: 'number',
		default: 500
	},
	height_type: {
		type: 'string',
		default: 'px'
	},
	marginTop: {
		type: 'number',
		default: 0
	},
	marginRight: {
		type: 'number',
		default: 0
	},
	marginBottom: {
		type: 'number',
		default: 0
	},
	marginLeft: {
		type: 'number',
		default: 0
	},
	paddingTop: {
		type: 'number',
		default: 0
	},
	paddingRight: {
		type: 'number',
		default: 0
	},
	paddingBottom: {
		type: 'number',
		default: 0
	},
	paddingLeft: {
		type: 'number',
		default: 0
	},
	zIndex:{
		type: 'number',
		default: 0
	},
	element_style: {
		type: 'string',
		default: null
	},
};

registerBlockType( 'rri/vertical-tabs', {
	title: __( 'Vertical tabs' ), 
	icon: 'list-view', 
	category: 'rri_blocks',
	keywords: [
		__( 'Vertical tabs' ),
		__( 'section' ),
	],
	attributes,
	supports: {
		align: ['full', 'wide'],
		reusable: true,
		anchor: true
	},
	edit: ( props ) => {
		const blockStyles = getStyleOptions(props.attributes, props.setAttributes);
		return [
			getSizeSettings( props.attributes, props.setAttributes),
			getSpacingSettings( props.attributes, props.setAttributes),
			<BlockControls>
				<Toolbar controls={ [ 'collapse' ].map( () =>{
					return {
						icon: 'arrow-down-alt2',
						title: `Collapse block`,
						isActive: props.attributes.isCollapsed === true,
						onClick: () => props.attributes.isCollapsed === true ? props.setAttributes( { isCollapsed: false } ) : props.setAttributes( { isCollapsed: true } )
					};
				} ) } />
			</BlockControls> ,
			<div className={ props.className, 'rri-vertical-tabs-editable' } style={blockStyles}>
				<div className={props.attributes.isCollapsed === true ? 'collapsed' : ''}>
					<div className={ "rri-block-title" }>Vertical tabs block</div>
					<div className={ 'rri-vertical-tabs-inner' }>
						<div className={ 'rri-tabs-panels' } style={{ height: props.attributes.height + props.attributes.height_type }}>
							<InnerBlocks 
								allowedBlocks={ allowed }
							/>
						</div>
					</div>
				</div>
			</div>
		];
    },
    save: ( props ) => {
		return <InnerBlocks.Content />
	},
	deprecated: [
		{
			attributes,
			save: (props) => {
				return (
					<div className={ props.className, 'rri-vertical-tabs' }>
						<div className={ 'rri-vertical-tabs-inner' }>
							<div className={ 'rri-tabs-panels' }>
								<InnerBlocks.Content />
							</div>
						</div>
					</div>
				);
			}
		}
	]
} );

function resetControls(type, setAttributes) {
	if(type == 'size'){
		let controls = ['width', 'height'];
		_.each(controls, (el) => {
			let temp = {}
			temp[el] = '';
			setAttributes( temp );
		});
	}else if(type == 'zIndex'){
		let temp = {}
		temp[type] = 0;
		setAttributes( temp );
	}
}

const getStyleOptions = (attributes, setAttributes) => {
	let _style = {}, frontStyle = '';
	_.each(attributes, ( value, key ) =>{
		if( value != null && value != '' ) {
			switch(key){
				case 'width':
					_style.width = value + attributes.width_type;
					frontStyle += 'width: ' + value + attributes.width_type + '; ';
					break;
				case 'marginTop':
					frontStyle += 'margin-top: ' + value + 'px; ';
					_style[key] = value + 'px';
					break;
				case 'marginBottom':
					frontStyle += 'margin-bottom: ' + value + 'px; ';
					_style[key] = value + 'px';
					break;
				case 'marginLeft':
					frontStyle += 'margin-left: ' + value + 'px; ';
					_style[key] = value + 'px';
					break;
				case 'marginRight':
					frontStyle += 'margin-right: ' + value + 'px; ';
					_style[key] = value + 'px';
					break;
				case 'paddingTop':
					frontStyle += 'padding-top: ' + value + 'px; ';
					_style[key] = value + 'px';
					break;
				case 'paddingBottom':
					frontStyle += 'padding-bottom: ' + value + 'px; ';
					_style[key] = value + 'px';
					break;
				case 'paddingLeft':
					frontStyle += 'padding-left: ' + value + 'px; ';
					_style[key] = value + 'px';
					break;
				case 'paddingRight':
					frontStyle += 'padding-right: ' + value + 'px; ';
					_style[key] = value + 'px';
					break;
				case 'zIndex':
					frontStyle += 'z-index: ' + value + '; ';
					_style[key] = value;
					break;
			}
		}
	});
	setAttributes( {element_style : frontStyle });
	return _style;
}

const getSizeSettings = ( attributes, setAttributes ) => {
    return (
        <InspectorControls>
            <PanelBody
                title= "Size"
				initialOpen= { false }
				className= {'rri-settings-size'}
            >
                <PanelRow>
					<div className= {'size-selector'}>
						<label>Width</label>
						<TextControl 
							label=""
							type='number'
							value={ attributes.width }
							onChange={ ( value ) => setAttributes( { width: Number(value) } ) }
						/>
						<SelectControl 
							label=""
							value={ attributes.width_type }
							options={[
								{label: __('px', 'rri'), value: 'px'},
								{label: __('%', 'rri'), value: '%'}
							]}
							onChange={ ( value ) => setAttributes( { width_type: value } ) }
						/>
					</div>
                </PanelRow>
				<PanelRow>
					<div className= {'size-selector'}>
						<label>Height</label>
						<TextControl 
							label=""
							type='number'
							value={ attributes.height }
							onChange={ ( value ) => setAttributes( { height: Number(value) } ) }
						/>
						<SelectControl 
							label=""
							value={ attributes.height_type }
							options={[
								{label: __('px', 'rri'), value: 'px'},
								{label: __('%', 'rri'), value: '%'}
							]}
							onChange={ ( value ) => setAttributes( { height_type: value } ) }
						/>
					</div>
                </PanelRow>
				<Button 
					isSmall
					onClick = {() => {
						resetControls('size', setAttributes);
					} }
				>
					Reset
				</Button>
            </PanelBody>
        </InspectorControls>
    );
};

const getSpacingSettings = ( attributes, setAttributes ) => {	
    return (
        <InspectorControls>
            <PanelBody
                title= "Spacing"
				initialOpen= { false }
				className= {'rri-settings-spacing'}
            >
				<h2>Margin (px)</h2>
                <PanelRow>
					<RangeControl
						label = { <img src={GetImg('Top.svg')}  /> }
						value = { attributes.marginTop }
						min = {-200}
						max = { 200 }
						allowReset = { true }
						onChange = { ( value ) => setAttributes( { marginTop: value } ) }
					/>
                </PanelRow>
				<PanelRow>
					<RangeControl
						label = { <img src={GetImg('Right.svg')}  /> }
						value = { attributes.marginRight }
						min = {-200}
						max = { 200 }
						allowReset = { true }
						onChange = { ( value ) => setAttributes( { marginRight: value } ) }
					/>
                </PanelRow>
				<PanelRow>
					<RangeControl
						label = { <img src={GetImg('Bottom.svg')}  /> }
						value = { attributes.marginBottom }
						min = {-200}
						max = { 200 }
						allowReset = { true }
						onChange = { ( value ) => setAttributes( { marginBottom: value } ) }
					/>
                </PanelRow>
				<PanelRow>
					<RangeControl
						label = { <img src={GetImg('Left.svg')}  /> }
						value = { attributes.marginLeft }
						min = {-200}
						max = { 200 }
						allowReset = { true }
						onChange = { ( value ) => setAttributes( { marginLeft: value } ) }
					/>
                </PanelRow>
				<h2>Padding (px)</h2>
                <PanelRow>
					<RangeControl
						label = { <img src={GetImg('Top.svg')}  /> }
						value = { attributes.paddingTop }
						min = {-200}
						max = { 200 }
						allowReset = { true }
						onChange = { ( value ) => setAttributes( { paddingTop: value } ) }
					/>
                </PanelRow>
				<PanelRow>
					<RangeControl
						label = { <img src={GetImg('Right.svg')}  /> }
						value = { attributes.paddingRight }
						min = {-200}
						max = { 200 }
						allowReset = { true }
						onChange = { ( value ) => setAttributes( { paddingRight: value } ) }
					/>
                </PanelRow>
				<PanelRow>
					<RangeControl
						label = { <img src={GetImg('Bottom.svg')}  /> }
						value = { attributes.paddingBottom }
						min = {-200}
						max = { 200 }
						allowReset = { true }
						onChange = { ( value ) => setAttributes( { paddingBottom: value } ) }
					/>
                </PanelRow>
				<PanelRow>
					<RangeControl
						label = { <img src={GetImg('Left.svg')}  /> }
						value = { attributes.paddingLeft }
						min = {-200}
						max = { 200 }
						allowReset = { true }
						onChange = { ( value ) => setAttributes( { paddingLeft: value } ) }
					/>
                </PanelRow>
				<h2>Z-index</h2>
				<PanelRow>
					<TextControl
						label = ""
						value = { attributes.zIndex }
						min = {0}
						max = { 10000 }
						allowReset = { true }
						onChange = { ( value ) => setAttributes( { zIndex: value } ) }
					/>
					<Button 
						isSmall
						onClick = {() => {
							resetControls('zIndex', setAttributes);
						} }
					>
						Reset
					</Button>
                </PanelRow>
            </PanelBody>
        </InspectorControls>
    );
};

const GetImg = ( img ) => {
	return rri.pluginDirPath + 'dist/images/' + img;
}