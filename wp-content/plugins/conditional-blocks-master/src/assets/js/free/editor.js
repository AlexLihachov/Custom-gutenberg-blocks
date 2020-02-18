const getSelectedBlock = () => wp.data.select( 'core/block-editor' ).getSelectedBlock();

/**
 * subscribe to the editor data.
 */
wp.data.subscribe( () => {
	const selectedBlock = getSelectedBlock();

	let hasCondition = false;

	if ( selectedBlock && selectedBlock.attributes.conditionalBlocksAttributes ) {
		hasCondition = conblockHasConditon( selectedBlock.attributes.conditionalBlocksAttributes );

		if ( hasCondition === true ) {
			conblockToggleEditorStyles( true );
		} else {
			conblockToggleEditorStyles( false );
		}
	}
} );

/**
 * Loop over the conditions attribute object. Return true if block has conditions.
 *
 * @param {Object} conditions condtions object of block attributes.
 *
 * @return {boolean} hasCondition true or false.
 */
function conblockHasConditon( conditions ) {
	if ( ! conditions ) {
		return false;
	}

	let hasCondition = false;

	const conditionKeys = Object.keys( conditions );

	for ( const conditionKey of conditionKeys ) {
		if ( ! conditions[ conditionKey ] ) {
			continue;
		}

		// Check for object as key value.
		if ( typeof conditions[ conditionKey ] === 'object' ) {
			const conditionsObject = conditions[ conditionKey ];

			if ( Array.isArray( conditionsObject ) && conditionsObject.length ) {
				hasCondition = true;
			} else if ( conditionKey === 'postMeta' && conditionsObject.key ) {
				hasCondition = true;
			} else {
				continue;
			}
		}

		hasCondition = true;
		break;
	}

	return hasCondition;
}

/**
 * Toogle block style to show if block has a condtions
 *
 * @param {boolean} show true/false if editor styles should be shown.
 */
function conblockToggleEditorStyles( show ) {
	const conblockStyle = document.querySelector( '#conblock-style' );

	if ( show === true ) {
		if ( ! conblockStyle ) {
			const css = `.block-editor-block-list__layout .block-editor-block-list__block.is-selected> .block-editor-block-list__block-edit:before {
					box-shadow: -3px 0 0 0 #0071f0;
					}
					.editor-block-toolbar.block-editor-block-toolbar {
						box-shadow: -3px 0 0 0 #0071f0;
					}`;

			const head = document.head || document.getElementsByTagName( 'head' )[ 0 ];

			const style = document.createElement( 'style' );

			style.setAttribute( 'id', 'conblock-style' );

			head.appendChild( style );

			style.type = 'text/css';

			style.appendChild( document.createTextNode( css ) );
		}
	} else if ( conblockStyle ) {
		// if styles shouldn't be showing and they exists - remove them.
		conblockStyle.parentNode.removeChild( conblockStyle );
	}
}
