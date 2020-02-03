/* global conblockData moment */
/**
 * WordPress Dependencies
 */
const { __ } = wp.i18n;
const { addFilter } = wp.hooks;
const { BaseControl, IconButton, TimePicker, Tooltip, TextControl, SelectControl, PanelBody, PanelRow, ToggleControl } = wp.components;

import { updateAttribute, addDateCondition, updateDate, deleteDate, conblockSVG } from '../shared/helpers.js';

/**
 * Add premium default condtion attributes via filter.
 *
 * @param {Object} conditionsObject Brings in the whole conditions object.
 *
 * @return {Object} conditionsObject with new defaults.
 */
function conblockProDefaults( conditionsObject ) {
	const proDefaults = {
		userRoles: [], // array.
		httpReferer: '', // String.
		httpUserAgent: [], // array.
		postMeta: {
			key: '',
			value: '',
			operator: 'true',
		},
		dates: [], // Array.
	};

	// Add the premium defaults to the condtions object.
	Object.assign( conditionsObject.conditionalBlocksAttributes.default, proDefaults );

	return conditionsObject;
}

addFilter( 'conblock.conditionAttribute', 'conditionalblocks/conblockProDefaults', conblockProDefaults );

/**
 * Add Pro controls to the inspector.
 *
 * @param {Array} controlsArray contain all the new JSX for controls.
 *
 * @param {Object} props The props from block.
 *
 * @return {Array} controlsArray contain all the new JSX for controls.
 */
function conblockProControls( controlsArray, props ) {
	// Bring in props.
	const {
		attributes,
	} = props;
	// Get our conditions object.
	const {
		conditionalBlocksAttributes,
	} = attributes;

	if ( ! conditionalBlocksAttributes || ! conblockData ) {
		return false;
	}

	// Prepare Post Meta.
	const postMeta = [ { value: '', label: 'None' } ];

	if ( conblockData.postMeta ) {
		for ( const metaName in conblockData.postMeta ) {
			if ( metaName.lastIndexOf( '_', 0 ) !== 0 ) {
				postMeta.push( { value: metaName, label: metaName } );
			}
		}
	}

	// Prepare user roles.
	const userRoles = [];

	if ( conblockData.userRoles ) {
		conblockData.userRoles.forEach( ( role ) => {
			userRoles.push( { value: role.role, label: role.name } );
		} );
	}

	controlsArray.push( <PanelBody
		title={ __( 'Conditions Pro' ) }
		icon={ conblockSVG }
		initialOpen={ false }
	>
		<Tooltip text={ __( 'Blocks will display to everyone by default, limit display to selected user roles.' ) }>
			<div>
				<PanelRow className="conditions-pro-block" >
					<ToggleControl
						checked={ (conditionalBlocksAttributes && ( conditionalBlocksAttributes.showUserRoles == undefined || conditionalBlocksAttributes.showUserRoles == true )) ? true : false }
						onChange={ (option) => updateAttribute( props, 'showUserRoles', option ) }
						className="conditions-pro-toggle"
					/>
					<SelectControl
						multiple
						label={ (conditionalBlocksAttributes && ( conditionalBlocksAttributes.showUserRoles == undefined || conditionalBlocksAttributes.showUserRoles == true )) ?  __( 'Show for User Roles' ) : __( 'Hide for User Roles' ) }
						value={ conditionalBlocksAttributes && conditionalBlocksAttributes.userRoles ? conditionalBlocksAttributes.userRoles : '' }
						onChange={ ( option ) => updateAttribute( props, 'userRoles', option ) }
						options={ userRoles }
					/>

				</PanelRow>
			</div>
		</Tooltip>
		<p className="conblock-description">Click and hold<code>Command</code> or <code>Control</code> to deselect or multiselect</p>

		<PanelRow className="conditions-pro-block">
			<ToggleControl
				checked={ conditionalBlocksAttributes && ( conditionalBlocksAttributes.showDomainReferer == undefined || conditionalBlocksAttributes.showDomainReferer == true ) ? true : false }
				onChange={ (option) => updateAttribute( props, 'showDomainReferer', option ) }
				className="conditions-pro-toggle"
			/>
			<TextControl
				label="Domain Referer"
				help= { (conditionalBlocksAttributes && (conditionalBlocksAttributes.showDomainReferer == undefined || conditionalBlocksAttributes.showDomainReferer == true ) ? "Show" : "Hide") + " block if visitor has arrived from specific domains. Comma separate for multiple." }
				placeholder="conditionalblocks.com, puri.io"
				value={ conditionalBlocksAttributes && conditionalBlocksAttributes.httpReferer ? conditionalBlocksAttributes.httpReferer : '' } // Make a function to get value.
				onChange={ ( option ) => updateAttribute( props, 'httpReferer', option ) }
			/>
		</PanelRow>

		<Tooltip text={ __( 'Click and hold Command or Control to deselect or multiselect' ) }>
			<div>
				<PanelRow className="conditions-pro-block">
					<ToggleControl
						checked={ (conditionalBlocksAttributes && (conditionalBlocksAttributes.showUserAgent == undefined || conditionalBlocksAttributes.showUserAgent == true )) ? true : false }
						onChange={ (option) => updateAttribute( props, 'showUserAgent', option ) }
						className="conditions-pro-toggle"
					/>
					<SelectControl
						multiple
						label={ __( 'Devices' ) }
						help={ (conditionalBlocksAttributes && (conditionalBlocksAttributes.showUserAgent == undefined || conditionalBlocksAttributes.showUserAgent == true)) ? __( 'Show only for specific devices' ) : __( 'Hide only for specific devices' ) }
						value={ conditionalBlocksAttributes && conditionalBlocksAttributes.httpUserAgent ? conditionalBlocksAttributes.httpUserAgent : '' } // e.g: value = [ 'a', 'c' ]
						onChange={ ( option ) => updateAttribute( props, 'httpUserAgent', option ) }
						options={ [
							{ label: 'iPhone', value: 'iphone' },
							{ label: 'iPad', value: 'ipad' },
							{ label: 'Android Device', value: 'android' },
							{ label: 'MacOS', value: 'macintosh' },
							{ label: 'Windows', value: 'windows' },
							{ label: 'Linux', value: 'linux' },
						] }
					/>
				</PanelRow>

			</div>
		</Tooltip>

		<Tooltip text={ __( 'Advanced: ' + ( (conditionalBlocksAttributes && (conditionalBlocksAttributes.showMetaKey == undefined || conditionalBlocksAttributes.showMetaKey == true)) ? 'Show' : 'Hide' ) + ' block if this post has the specific Custom Field Post Meta. Suited for Reusable Blocks.' ) }>
			<div>
				<PanelRow className="conditions-pro-block">
					<ToggleControl
						checked={ ( conditionalBlocksAttributes && ( conditionalBlocksAttributes.showMetaKey == undefined || conditionalBlocksAttributes.showMetaKey == true ) ) ? true : false }
						onChange={ (option) => updateAttribute( props, 'showMetaKey', option ) }
						className="conditions-pro-toggle"
					/>

					<SelectControl
						label="Post Meta: Key"
						value={ conditionalBlocksAttributes && conditionalBlocksAttributes.postMeta && conditionalBlocksAttributes.postMeta.key ? conditionalBlocksAttributes.postMeta.key : '' }
						options={ postMeta }
						onChange={ ( option ) => updateAttribute( props, 'postMeta.key', option ) }
					/>

				</PanelRow>

			</div>
		</Tooltip>
		<PanelRow className={ conditionalBlocksAttributes && conditionalBlocksAttributes.postMeta && conditionalBlocksAttributes.postMeta.key !== '' ? '' : 'conblock-hidden-control' } >

			<SelectControl
				label="Post Meta: Operator"
				value={ conditionalBlocksAttributes && conditionalBlocksAttributes.postMeta && conditionalBlocksAttributes.postMeta.operator ? conditionalBlocksAttributes.postMeta.operator : '' }
				options={ [
					{ label: 'Choose Operator', value: '' },
					{ label: 'True', value: 'true' },
					{ label: 'False', value: 'false' },
					{ label: 'Equals String', value: '===' },
					{ label: 'Does Not Equal', value: '!==' },
				] }
				onChange={ ( option ) => updateAttribute( props, 'postMeta.operator', option ) }
			/>

		</PanelRow>

		<PanelRow className={ conditionalBlocksAttributes && conditionalBlocksAttributes.postMeta && conditionalBlocksAttributes.postMeta.key !== '' ? '' : 'conblock-hidden-control' } >

			<TextControl
				className={ ( conditionalBlocksAttributes && conditionalBlocksAttributes.postMeta && conditionalBlocksAttributes.postMeta.operator === '===' ) || ( conditionalBlocksAttributes && conditionalBlocksAttributes.postMeta && conditionalBlocksAttributes.postMeta.operator === '!==' ) ? '' : 'conblock-hidden-control' }
				label="Post Meta: Value"
				help=""
				placeholder="value as a string"
				value={ conditionalBlocksAttributes && conditionalBlocksAttributes.postMeta && conditionalBlocksAttributes.postMeta.value ? conditionalBlocksAttributes.postMeta.value : '' }
				onChange={ ( option ) => updateAttribute( props, 'postMeta.value', option ) }
			/>

		</PanelRow>

		<PanelRow className="conditions-pro-block">
			<ToggleControl
				checked={ (conditionalBlocksAttributes && ( conditionalBlocksAttributes.showUtmSource == undefined || conditionalBlocksAttributes.showUtmSource == true )) ? true : false }
				onChange={ (option) => updateAttribute( props, 'showUtmSource', option ) }
				className="conditions-pro-toggle"
			/>
			<TextControl
				label={ ( (conditionalBlocksAttributes && ( conditionalBlocksAttributes.showUtmSource == undefined || conditionalBlocksAttributes.showUtmSource == true )) ? "Show" : 'Hide' ) + " for UTM Source"}
				value={ conditionalBlocksAttributes && conditionalBlocksAttributes.utmSource ? conditionalBlocksAttributes.utmSource : '' }
				onChange={ ( option ) => updateAttribute( props, 'utmSource', option ) }
				placeholder="UTM Source Key"
				className="full-width"
			/>
			<TextControl
				value={ conditionalBlocksAttributes && conditionalBlocksAttributes.utmSourceValue ? conditionalBlocksAttributes.utmSourceValue : '' }
				onChange={ ( option ) => updateAttribute( props, 'utmSourceValue', option ) }
				placeholder="UTM Source Value"
				className="full-width"
			/>
		</PanelRow>

		<PanelRow className="conditions-pro-block">
			<ToggleControl
				checked={ (conditionalBlocksAttributes && ( conditionalBlocksAttributes.showUrlParam == undefined || conditionalBlocksAttributes.showUrlParam == true ) ? true : false ) }
				onChange={ (option) => updateAttribute( props, 'showUrlParam', option ) }
				className="conditions-pro-toggle"
			/>
			<TextControl
				label={ ( (conditionalBlocksAttributes && (conditionalBlocksAttributes.showUrlParam == undefined || conditionalBlocksAttributes.showUrlParam == true)) ? 'Show' : 'Hide' ) + ' for URL Param' }
				value={ conditionalBlocksAttributes && conditionalBlocksAttributes.urlParam ? conditionalBlocksAttributes.urlParam : '' }
				onChange={ (option) => updateAttribute( props, 'urlParam', option ) }
				placeholder="URL Param Key"
				className="full-width"
			/>
			<TextControl
				value={ conditionalBlocksAttributes && conditionalBlocksAttributes.urlParamValue ? conditionalBlocksAttributes.urlParamValue : '' }
				onChange={ ( option ) => updateAttribute( props, 'urlParamValue', option ) }
				placeholder="URL Param Value"
				className="full-width"
			/>
		</PanelRow>

		<PanelRow className="conditions-pro-block">
			<ToggleControl
				checked={ ( conditionalBlocksAttributes && (conditionalBlocksAttributes.showCookieParam == undefined || conditionalBlocksAttributes.showCookieParam == true) ? true : false ) }
				onChange={ (option) => updateAttribute( props, 'showCookieParam', option ) }
				className="conditions-pro-toggle"
			/>
			<TextControl
				label={ ( ( conditionalBlocksAttributes && (conditionalBlocksAttributes.showCookieParam == undefined || conditionalBlocksAttributes.showCookieParam == true) ) ? 'Show' : 'Hide' ) + ' for Cookie' }
				value={ conditionalBlocksAttributes && conditionalBlocksAttributes.cookieParam ? conditionalBlocksAttributes.cookieParam : '' }
				onChange={ (option) => updateAttribute( props, 'cookieParam', option ) }
				placeholder="Cookie Key"
				className="full-width"
			/>
			<TextControl
				value={ conditionalBlocksAttributes && conditionalBlocksAttributes.cookieParamValue ? conditionalBlocksAttributes.cookieParamValue : '' }
				onChange={ (option) => updateAttribute( props, 'cookieParamValue', option ) }
				placeholder="Cookie Value"
				className="full-width"
			/>
		</PanelRow>

	</PanelBody> );

	return controlsArray;
}

addFilter( 'conblock.controls', 'conditionalblocks/conblockProControls', conblockProControls );

/**
 * Add Date conditions controls to the editor.
 *
 * @param {Array} controlsArray contain all the new JSX for controls.
 *
 * @param {Object} props The props from block.
 *
 * @return {Array} controlsArray contain all the new JSX for controls.
 */
function conblockProDates( controlsArray, props ) {
	// Bring in props.
	const {
		attributes,
	} = props;
	// Get our conditions object.
	const {
		conditionalBlocksAttributes,
	} = attributes;

	const dateComponent = ( key, start, end ) => {
		const defaultStart = start ? moment.unix( start ).tz( 'WP' ) : null;
		const defaultEnd = end ? moment.unix( end ).tz( 'WP' ) : null;
		const format = conditionalBlocksAttributes && conditionalBlocksAttributes.dates[ key ] && conditionalBlocksAttributes.dates[ key ].show24HourFromat ? true : false;

		return (
			<PanelRow>
				<div className="conblock-date-wrapper">
					<PanelRow>
						<ToggleControl
							label={ __('Show 24-hour time picker') }
							checked={ format }
							onChange={ (option) => updateDate( props, key, 'show24HourFromat', option ) }
						/>
					</PanelRow>
					<BaseControl
						label="Starting Date"
						help={format ? __("24-hour time required") : '' }
					>
						<TimePicker
							currentTime={ defaultStart }
							onChange={ ( newDate ) => updateDate( props, key, 'start', newDate ) }
							is12Hour={ ! format }
						/>
					</BaseControl>

					<BaseControl
						label="Ending Date"
						help={format ? __("24-hour time required") : '' }
					>
						<TimePicker
							currentTime={ defaultEnd }
							onChange={ ( newDate ) => updateDate( props, key, 'end', newDate ) }
							is12Hour={ ! format }
						/>

					</BaseControl>
					<PanelRow>
						<IconButton isSmall
							icon="trash"
							label="Remove Date Range"
							onClick={ () => deleteDate( props, key ) }
						>
							Remove
						</IconButton>
					</PanelRow>
				</div>
			</PanelRow> );
	};

	function dateSection( dates ) {
		const section = [];

		if ( dates ) {
			for ( const key in dates ) {
				const getStart = dates[ key ].start ? dates[ key ].start : false;
				const getEnd = dates[ key ].end ? dates[ key ].end : false;

				section.push( dateComponent( key, getStart, getEnd ) );
			}
			return ( section );
		}
	}

	const currentTimezone = moment && moment.tz( 'WP' ).format( 'Z' ) ? moment && moment.tz( 'WP' ).format( 'Z' ) : 'N/A';

	const dateCount = conditionalBlocksAttributes.dates ? conditionalBlocksAttributes.dates.length : 0;

	controlsArray.push(
		<PanelBody
			title={ __( 'Date Conditions' ) }
			icon={ conblockSVG }
			initialOpen={ false }
		>
			<BaseControl
				label="Show Block between Dates"
			/>
			<div className="conblock-date-info">
				<span>WP Timezone: <strong> UTC { currentTimezone }</strong></span><br />
				<span>Selected block has <strong>{ dateCount ? dateCount : 'no' }</strong> date conditions</span>
			</div>

			{ conditionalBlocksAttributes.dates ? dateSection( conditionalBlocksAttributes.dates ) : false }

			<PanelRow>
				<IconButton isDefault
					icon="plus"
					label="Add Date Conditions"
					onClick={ () => addDateCondition( props, 'dates', 'test' ) }
				> Add Date Range </IconButton>
			</PanelRow>
		</PanelBody> );
	return controlsArray;
}

addFilter( 'conblock.controls', 'conditionalblocks/conblockProDates', conblockProDates, 20 );
