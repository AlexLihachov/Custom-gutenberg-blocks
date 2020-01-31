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
				<PanelRow >
					<SelectControl
						multiple
						label={ __( 'Show for User Roles' ) }
						value={ conditionalBlocksAttributes && conditionalBlocksAttributes.userRoles ? conditionalBlocksAttributes.userRoles : '' }
						onChange={ ( option ) => updateAttribute( props, 'userRoles', option ) }
						options={ userRoles }
					/>

				</PanelRow>
			</div>
		</Tooltip>
		<p className="conblock-description">Click and hold<code>Command</code> or <code>Control</code> to deselect or multiselect</p>

		<TextControl
			label="Domain Referer"
			help="Show block if visitor has arrived from specific domains. Comma separate for multiple."
			placeholder="conditionalblocks.com, puri.io"
			value={ conditionalBlocksAttributes && conditionalBlocksAttributes.httpReferer ? conditionalBlocksAttributes.httpReferer : '' } // Make a function to get value.
			onChange={ ( option ) => updateAttribute( props, 'httpReferer', option ) }
		/>

		<Tooltip text={ __( 'Click and hold Command or Control to deselect or multiselect' ) }>
			<div>
				<PanelRow >
					<SelectControl
						multiple
						label={ __( 'Devices' ) }
						help={ __( 'Show only for specific devices' ) }
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

		<Tooltip text={ __( 'Advanced: Show block if this post has the specific Custom Field Post Meta. Suited for Reusable Blocks.' ) }>
			<div>
				<PanelRow>

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
				<span>WP Timezone: <strong><a href="options-general.php" target="_blank"> UTC { currentTimezone }</a></strong></span><br />
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
