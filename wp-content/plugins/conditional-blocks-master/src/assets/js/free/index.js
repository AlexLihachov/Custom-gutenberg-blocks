import './editor.js';

import { updateAttribute, conblockSVG } from '../shared/helpers.js';

/**
 * WordPress Dependencies
 */
const { __ } = wp.i18n;
const { addFilter, applyFilters } = wp.hooks;
const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { createHigherOrderComponent } = wp.compose;
const { Tooltip, ToggleControl, RadioControl, PanelBody, PanelRow } = wp.components;

/**
 * Add custom attribute for mobile visibility.
 *
 * @param {Object} settings Settings for the block.
 *
 * @return {Object} settings Modified settings.
 */

function addAttributes( settings ) {
	//check if object exists for old Gutenberg version compatibility

	if ( typeof settings.attributes !== 'undefined' ) {
		const conditionsObject = {
			conditionalBlocksAttributes: {
				type: 'object',
				default: {
					hideOnMobile: false, // Boolean.
					hideOnTablet: false, // Boolean.
					hideOnDesktop: false, // Boolean.
					userState: '',
				},
			},
		};

		const extendConditions = applyFilters( 'conblock.conditionAttribute', conditionsObject );

		settings.attributes = Object.assign( settings.attributes, extendConditions );
	}

	return settings;
}

/**
 * Add mobile visibility controls on Advanced Block Panel.
 *
 * @param {Function} BlockEdit Block edit component.
 *
 * @return {Function} BlockEdit Modified block edit component.
 */
const withAdvancedControls = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const { attributes, isSelected } = props;

		const { conditionalBlocksAttributes } = attributes;

		const jsxArray = [];

		let extendedControls = applyFilters( 'conblock.controls', jsxArray, props );

		let upgradeText = '';

		if ( extendedControls.length === 0 ) {
			extendedControls = false;

			upgradeText = (
				<PanelRow>
					<Tooltip text="Show/hide blocks for iPhone, Android, User Roles, URL Referrer, and more!">
						<p>
							Want more powerful conditions? Upgrade to{ ' ' }
							<a href="https://conditionalblocks.com/" target="_blank" rel="noopener noreferrer">
								Conditional Blocks Pro
							</a>
						</p>
					</Tooltip>
				</PanelRow>
			);
		}

		return (
			<Fragment>
				<BlockEdit { ...props } />
				{ isSelected && (
					<InspectorControls>
						<PanelBody title={ __( 'Conditions' ) } icon={ conblockSVG } initialOpen={ false }>
							<RadioControl
								label="Show for User State"
								help="Show this block only to the selected user type."
								selected={ conditionalBlocksAttributes && conditionalBlocksAttributes.userState ? conditionalBlocksAttributes.userState : '' }
								options={ [ { label: 'Everyone', value: '' }, { label: 'Signed out users', value: 'logged-out' }, { label: 'Signed in users', value: 'logged-in' } ] }
								onChange={ ( option ) => {
									updateAttribute( props, 'userState', option );
								} }
							/>
							<PanelRow>
								<ToggleControl
									label={ __( 'Hide on Mobile' ) }
									checked={ conditionalBlocksAttributes && conditionalBlocksAttributes.hideOnMobile ? conditionalBlocksAttributes.hideOnMobile : '' }
									onChange={ ( option ) => updateAttribute( props, 'hideOnMobile', option ) }
									help={ conditionalBlocksAttributes && conditionalBlocksAttributes.hideOnMobile ? __( 'Hidden on Mobile devices.' ) : __( 'Showing on Mobile devices.' ) }
								/>
							</PanelRow>
							<PanelRow>
								<ToggleControl
									label={ __( 'Hide on Tablet' ) }
									checked={ conditionalBlocksAttributes && conditionalBlocksAttributes.hideOnTablet ? conditionalBlocksAttributes.hideOnTablet : '' }
									onChange={ ( option ) => updateAttribute( props, 'hideOnTablet', option ) }
									help={ conditionalBlocksAttributes && conditionalBlocksAttributes.hideOnTablet ? __( 'Hidden on tablets devices.' ) : __( 'Showing on tablets devices.' ) }
								/>
							</PanelRow>
							<PanelRow>
								<ToggleControl
									label={ __( 'Hide on Desktop' ) }
									checked={ conditionalBlocksAttributes && conditionalBlocksAttributes.hideOnDesktop ? conditionalBlocksAttributes.hideOnDesktop : '' }
									onChange={ ( option ) => updateAttribute( props, 'hideOnDesktop', option ) }
									help={ conditionalBlocksAttributes && conditionalBlocksAttributes.hideOnDesktop ? __( 'Hidden on Desktop.' ) : __( 'Showing on Desktop' ) }
								/>
							</PanelRow>

							{ upgradeText }
						</PanelBody>

						{ extendedControls }
					</InspectorControls>
				) }
			</Fragment>
		);
	};
}, 'withAdvancedControls' );

addFilter( 'blocks.registerBlockType', 'conditional-blocks/custom-attributes', addAttributes, 1 );

addFilter( 'editor.BlockEdit', 'conditional-blocks/custom-advanced-control', withAdvancedControls, 10 );
