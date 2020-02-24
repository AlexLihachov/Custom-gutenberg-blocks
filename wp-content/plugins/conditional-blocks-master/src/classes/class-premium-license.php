<?php
/**
 * Hanlde License and updates.
 *
 * @package XPLUGIN_SLUG
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * XPLUGIN_PREFIX_License extends XPLUGIN_PREFIX_Settings_Api
 *
 * @author Morgan H
 * @version 1.0.0
 */
class XPLUGIN_PREFIX_License extends XPLUGIN_PREFIX_Settings_Api {

	protected $license = array();

	protected $license_id;

	protected $section_id;

	protected $plugin;

	/**
	 * Construct
	 */
	public function __construct( $plugin, $license_id, $section_id ) {

		// set up the plugin config.
		$this->plugin = $plugin;

		$this->license_id = $license_id;

		$this->section_id = $section_id;
		// Set the license.
		$this->license = $this->get_option( $license_id, $section_id, $this->license );

		add_action( 'admin_init', array( $this, 'verify' ) );

		add_action( 'wp_ajax_' . 'XPLUGIN_PREFIX' . '_process_license', array( $this, 'process_license' ) );

		add_action( 'XPLUGIN_PREFIX_callback_edd_license', array( $this, 'callback_edd_license' ) );
	}


	public function process_license() {
		$posted = $_POST;

		if ( empty( $posted ) ) {
			wp_die();
		}

		// verify nonce.
		wp_verify_nonce( $posted['security'], 'XPLUGIN_PREFIX_security' );

		$license = $this->license;
		// Validate license.
		if ( ! empty( $license['status'] ) && $license['status'] === 'valid' ) {
			$response = $this->validate_license( $posted['license'], 'deactivate_license' );
		} else {
			$response = $this->validate_license( $posted['license'], 'activate_license' );
		}
		// save the new data.

		$this->update_license( $response, $posted['license'] );
		// Add the license key to our response
		$response['key'] = $posted['license'];
		wp_send_json( $response );
		wp_die(); // this is required to terminate immediately and return a proper response.
	}


	public function validate_license( $license, $action ) {
		// Make sure the licence is ready.
		$license = trim( $license );
		// data to send in our API request
		$api_params = array(
			'edd_action' => $action, // activate_license or deactivate_license.
			'license'    => $license,
			'item_id'    => 'XPLUGIN_EDD_ITEM_ID',
			'url'        => home_url(),
		);
		// Call the custom API.
		$response = wp_remote_post(
			'XPLUGIN_EDD_STORE_URL',
			array(
				'timeout'   => 15,
				'sslverify' => false,
				'body'      => $api_params,
			)
		);

		// decode into an array.
		$license_data = json_decode( wp_remote_retrieve_body( $response ), true );

		return $license_data;
	}

	public function update_license( $response, $license_key = false ) {

		if ( $license_key === false ) {
			$license_key = $this->license['key'];
		}
			// Make a new array to override
			$license_array = array(
				'status' => ! empty( $response['error'] ) ? $response['error'] : $response['license'],
				'expiry' => ! empty( $response['expires'] ) ? $response['expires'] : 'NA',
				'key'    => $license_key,
			);

			// Get all options.
			$options = get_option( $this->section_id );

			// if exsiting.
			if ( $options && is_array( $options ) ) {
				$options[ $this->license_id ] = $license_array;
			} else {
				// create a new array.
				$options                      = array();
				$options[ $this->license_id ] = $license_array;
			}
			// Update.
			update_option( $this->section_id, $options );

			// Set this class license.
			$this->license = $license_array;

			return;
	}

	public function verify() {
		// Get Transient.
		if ( get_transient( 'XPLUGIN_PREFIX' . '_verify_license' ) ) {
			return;
		}

		if ( empty( $this->license['key'] ) ) {
			return;
		}
		// Set Tranisent for 24 hours.
		set_transient( 'XPLUGIN_PREFIX' . '_verify_license', true, 24 * 3600 );

		$response = $this->validate_license( $this->license['key'], 'check_license' );

		$this->update_license( $response );
		return;
	}

	public function get_key() {
		$key = $this->get_option( $this->license_id, $this->section_id, false );

		if ( $key && is_array( $key ) ) {
			$key = $key['key'] ? $key['key'] : false;
		} else {
			$key = false;
		}

		return $key;
	}

	public function is_valid() {
		$get = $this->get_option( $this->license_id, $this->section_id, false );

		if ( $get && is_array( $get ) ) {
			$get = $get['status'] && $get['status'] === 'valid' ? true : false;
		} else {
			$get = false;
		}

		return $get;
	}


	/**
	 * Displays a licence field for EDD
	 *
	 * @param array $args settings field args
	 */
	function callback_edd_license( $args ) {

		$value = $this->get_option( $args['id'], $args['section'], $args['std'] );

		$size        = isset( $args['size'] ) && ! is_null( $args['size'] ) ? $args['size'] : 'regular';
		$type        = isset( $args['type'] ) ? $args['type'] : 'text';
		$placeholder = empty( $args['placeholder'] ) ? '' : ' placeholder="' . $args['placeholder'] . '"';
		if ( ! empty( $value['status'] ) && $value['status'] === 'valid' ) {
			$button_message      = 'Deactivate';
			$button_class        = 'button-secondary';
			$license_status_icon = '<span style="font-size: 14px;line-height: unset;display: inline-block;" class="dashicons dashicons-dismiss"></span>';
			$valid               = true;
		} else {
			$button_message      = 'Activate';
			$button_class        = 'button-primary';
			$license_status_icon = '<span style="font-size: 14px;line-height: unset;display: inline-block;" class="dashicons dashicons-unlock"></span>';
			$valid               = false;
		}
		$show_key     = $valid === true ? 'inline-block' : 'none';
		$display_key  = "<span class='license-key-details' style='display:$show_key;'>";
		$display_key .= "License: <code><span class='license-key'>";
		$display_key .= ! empty( $value['key'] ) ? $value['key'] : '';
		$display_key .= '</span></code></span>';
		$html         = '<fieldset class="edd_license">';
		$html        .= sprintf(
			'<p style="margin-bottom: 25px; line-height: 1.8;" class="license-details %1$s-license-details">
				Status: <code><span class="license-status">%2$s</span></code> <br />
				Expiration: <code><span class="license-expires">%3$s</span></code><br />
				%4$s
				</p>',
			'XPLUGIN_PREFIX',
			$value['status'],
			$value['expiry'],
			$display_key
		);
			$html    .= sprintf( '<input type="hidden" name="%1$s[%2$s]" value="" />', $args['section'], $args['id'] );
			$html    .= sprintf( '<input type="hidden" style="margin-right: 3px;" class="edd-license-status" id="%3$s[%4$s][status]" name="%3$s[%4$s][status]" value="%5$s"/>', $type, $size, $args['section'], $args['id'], $value['status'] );
			$html    .= sprintf( '<input type="hidden" style="margin-right: 3px;" class="edd-license-expiry" id="%3$s[%4$s][expiry]" name="%3$s[%4$s][expiry]" value="%5$s"/>', $type, $size, $args['section'], $args['id'], $value['expiry'] );
			$html    .= sprintf( '<input type="%1$s" style="padding:8px;width:60%;display:%6$s; margin-right: 3px;" class="%2$s-text edd-license-key" id="%3$s[%4$s][key]" name="%3$s[%4$s][key]" value="%5$s"/>', $type, $size, $args['section'], $args['id'], $value['key'], $valid === true ? 'none' : 'inline-block' );
			$html    .= sprintf(
				'<a class="button %2$s-check-license %4$s">%5$s %3$s</a>',
				$type,
				'XPLUGIN_PREFIX',
				$button_message,
				$button_class,
				$license_status_icon
			);
			$html    .= $this->get_field_description( $args );
			$html    .= '</fieldset>';
			echo $html;

			$this->edd_assets();
	}

	public function edd_assets() {
		// Create nonce.
		$nonce = wp_create_nonce( 'XPLUGIN_PREFIX_security' );

		?> <script>
jQuery(document).ready(function($) {
	var buttonClass = '.XPLUGIN_PREFIX-check-license';
	jQuery(buttonClass).on('click', function(e) {
		var license_key_input = jQuery('input.edd-license-key');
		var license_key_details = jQuery('p.license-details span.license-key-details');
		var license_key_details_key = jQuery('p.license-details span.license-key-details span.license-key');
		var license_status = jQuery('p.license-details span.license-status');
		var license_expiry = jQuery('p.license-details span.license-expires');
		var hidden_input_status = jQuery('input.edd-license-status[type="hidden"]');
		var hidden_input_expiry = jQuery('input.edd-license-expiry[type="hidden"]');
		var button = jQuery('a.XPLUGIN_PREFIX-check-license');
		var icon = jQuery('a.XPLUGIN_PREFIX-check-license span');
		var ajax_action = 'XPLUGIN_PREFIX_process_license';
		// Send the license.
		var data = {
			security: '<?php echo $nonce; ?>',
			action: ajax_action,
			license: license_key_input.val(),
		};
		jQuery.ajax({
			type: 'post',
			dataType: 'json',
			url: ajaxurl,
			data: data,
			beforeSend: function() {
				license_status.text('.. Checking');
				license_expiry.text('.. Checking');
				button.text('.. Checking');
			},
			error: function() {
				license_status.text('Error - Failed to start license check.');
				license_expiry.text('..');
				button.text('Try again');
			},
			success: function(response) {
				if (!response) {
					license_status.text('Error - No response recieved from server');
					license_expiry.text('..');
					button.text('Try again');
					return;
				}
				console.log(response);
				var status = response.error ? response.error : response.license;
				if (!status) {
					license_status.text('Error - No license status in response from server');
				}
				var expires = response.expires ? response.expires : 'NA';
				// set details
				license_status.text(status);
				license_expiry.text(expires);
				hidden_input_status.val(status);
				hidden_input_expiry.val(expires);
				license_key_details_key.text(response.key);
				if (response.license === 'valid') {
					license_key_input.css('display', 'none');
					license_key_details.css('display', 'inline-block');
					button.text('Loading settings..');
					setTimeout(function() {
						window.location.reload(true);
					}, 1500);
				} else {
					button.text('Activate');
					license_key_input.css('display', 'inline-block');
					license_key_details.css('display', 'none');
				}
			},
		});
	});
});
</script> 
		<?php
	}
}
