jQuery( document ).ready( function() {
	jQuery( document ).on( 'click', '#ajax_load_more', function( e ) {
		e.preventDefault();

		var _this = jQuery( this );

		if( ! _this.hasClass( 'disabled' ) ) {

			_this.addClass('disabled');

			jQuery.ajax( {
				url: wpRigAjaxPagination.ajax_url,
				data: 'action=wp_rig_ajax_pagination&vars=' + JSON.stringify( _this.data('vars') ) + '&page=' + _this.data('page') + '&max_page=' + _this.data('max-page'),
				success: function( data ) {

					data = JSON.parse( data );

					jQuery( '#archive_container' ).append( data.content );
					jQuery( '#ajax_pagination' ).html( data.pagination_link );
					_this.removeClass('disabled');
				},
				error: function() {
					_this.removeClass('disabled');
				}
			} );
		}
	} );
} );