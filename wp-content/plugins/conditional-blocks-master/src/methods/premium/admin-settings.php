<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * PRO options to admin settings.
 */
function XPLUGIN_PREFIX_Admin_Settings( $settings ) {

	if ( ! $settings ) {
		return;
	}

	unset( $settings['sidebars']['upgrade_nag'] );

	$settings['sidebars']['manage_account'] = array(
		'id'      => 'manage_account',
		'title'   => __( 'Manage your account', 'conditional-blocks' ),
		'content' => __( 'You can manage your account and license from your <a href="https://conditionalblocks.com/account" target="_blank">account</a>.', 'conditional-blocks' ),
	);

	$settings['sections'][] = array(
		'id'                    => 'conditional_blocks_pro_license',
		'title'                 => __( 'License', 'conditional_blocks' ),
		'requires_verification' => false,
	);

	// Include Pro License Check.
	$settings['fields']['conditional_blocks_pro_license'] = array(
		array(
			'name'  => 'license_section',
			'label' => __( 'License', 'conditional-blocks' ),
			'desc'  => __( 'Conditional Blocks Pro requires an active license key to recieve automatic updates & support. <br>Find your license key at <a href="https://conditionalblocks.com/account/" target="_blank">conditionalblocks.com/account/</a>' ),
			'type'  => 'subheading',
			'class' => 'subheading',
		),
		array(
			'name'    => 'edd_license',
			'label'   => __( 'License', 'conditional-blocks' ),
			'desc'    => __( 'Your license key from <a href="https://conditionalblocks.com/account/" target="_blank">conditionalblocks.com</a>', 'conditional-blocks' ),
			'type'    => 'edd_license',
			'default' => array(
				'key'    => '',
				'status' => 'Activation needed',
				'expiry' => 'NA',
			),
		),
	);

	return $settings;

}
add_filter( 'conditional_blocks_admin_settings', 'XPLUGIN_PREFIX_Admin_Settings' );
