jQuery( document ).ready( function() {
	jQuery( '#term_color' ).wpColorPicker();

	jQuery( '#addtag' ).find('input[type="submit"]').click( function() {
		setTimeout( function() {
			jQuery( '#term_color' ).val('');
			jQuery('.wp-picker-clear').click();
		}, 500 );
	} );
} );