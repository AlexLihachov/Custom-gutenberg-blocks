<?php
/**
 * Admin Settings.
 *
 * @package XPLUGIN_NAME
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * XPLUGIN_PREFIX_Admin_Settings
 *
 * Create and setup the admin options page.
 */
class XPLUGIN_PREFIX_Admin_Settings {
	/**
	 * Settings API.
	 *
	 * @var $settings_api XPLUGIN_PREFIX_Settings_Api class.
	 */
	private $settings_api;

	/**
	 * Constants.
	 *
	 * @var $conatants contains plugin setup.
	 */
	private $constants;

	/**
	 * Construct.
	 *
	 * @param object $constants contains plugin setup.
	 */
	public function __construct( $constants ) {
		// set up the plugin config.
		$this->constants = $constants;
		// run our dependcies.
		$this->dependencies();
		// Add menus.
		add_action( 'admin_menu', array( $this, 'menu' ) );
		// Create our settings.
		add_action( 'admin_init', array( $this, 'admin_init' ) );
		// Quick settings link.
		add_action( 'plugin_action_links_' . plugin_basename( $this->constants['file'] ), array( $this, 'action_link' ) );
	}

	/**
	 * Register our settings API framework.
	 */
	public function dependencies() {
		// Grab the settings API.
		$this->settings_api = new XPLUGIN_PREFIX_Settings_Api( $this->constants );
	}

	/**
	 * Add plugin action links.
	 *
	 * Add a link to the settings page on the plugins.php page.
	 *
	 * @since 1.0.0
	 *
	 * @param  array $links List of existing plugin action links.
	 * @return array         List of modified plugin action links.
	 */
	public function action_link( $links ) {
		$links = array_merge(
			array(
				'<a href="' . esc_url( admin_url( '/options-general.php?page=conditional-blocks' ) ) . '">' . __( 'Settings', 'conditional-blocks' ) . '</a>',
			),
			array(
				'<a href="' . esc_url( 'https://conditionalblocks.com/docs/' ) . '" target="_blank">' . __( 'Documentation', 'conditional-blocks' ) . '</a>',
			),
			$links
		);
		return $links;
	}



	/**
	 * Create our settings fields, sections and sidebars.
	 *
	 * @param mixed $get_part either sections, fields or sidebars.
	 */
	public function settings( $get_part = false ) {
		// Create tabbed sections.
		$sections = array(
			array(
				'id'                    => 'conditional_blocks_general',
				'title'                 => __( 'General', 'conditional_blocks' ),
				'requires_verification' => false,
			),
		);
		// Create setting fields.
		$fields = array();
		// fields for above sections.
		$fields['conditional_blocks_general'] = array(
			array(
				'name'  => 'get_started_section',
				'label' => __( 'Get Started', 'conditional-blocks' ),
				'desc'  => __( 'Condtional Block settings are available in the Gutenberg Editor. Just click on any block and your options will be in the sidebar under the block\'s <em>Conditions</em> menu.', 'conditional-blocks' ),
				'type'  => 'subheading',
				'class' => 'subheading',
			),

			array(
				'name'  => 'debug_settings',
				'label' => __( 'Developer Debugging', 'conditional-blocks' ),
				'desc'  => __( 'Enable to write <b>each</b> block for <b>each page load</b> to the WordPress Debug Log. Requires WP Debug to be enabled.', 'conditional-blocks' ),
				'type'  => 'subheading',
				'class' => 'subheading',
			),

			array(
				'name'    => 'debug_block_render',
				'label'   => __( 'Enable Debugging Blocks', 'conditional-blocks' ),
				'desc'    => __(
					'<strong>Never keep on for long!</strong><br /><br />
	<b>Lite</b>: include Block Name, Page Name, and if the block should be rendered by each condition.<br />
	<b>Detailed</b>: Also include the whole Block Object.',
					'conditional-blocks'
				),
				'type'    => 'select',
				'options' => array(
					''         => 'Off',
					'lite'     => 'Lite Debugging',
					'detailed' => 'Detailed Debugging',
				),
			),

		);

		// Create sidebar boxes.
		$sidebars = array(
			'upgrade_nag'     => array(
				'id'      => 'sidebar-upgrade',
				'title'   => __(
					'<span style="color:#684FFE;
				">Get Powerful <em>Block</em> Conditions</span>',
					'conditional-blocks'
				),
				'content' => '<div style="color:#684FFE;">' . __(
					'Unlock the full potential of blocks with <a href="https://conditionalblocks.com/" target="_blank">Pro</a>. Target users with the following conditions.
					<p>
					<b><em>Included in Pro:</em></b>
					</p>
					 <ul style="font-weight: 500;">
					<li>
					Show Block Between Multiple Dates
					</li>
					<li>
					Android, iPhone, macOS, Windows
					</li>
					<li>
					User Rules
					</li>
					<li>
					Custom Post Meta
					</li>
					<li>
					Domain Referer
					</li>
					</ul>
					<a style="background: #85FFCC; font-weight:700; border-color:#85FFCC; color:#423785; padding:5px 10px;"
 class="button-primary" href="https://conditionalblocks.com/" target="_blank">Get Conditional Blocks Pro</a>',
					'conditional-blocks'
				)
				. '</div>',
			),

			'feature_request' => array(
				'id'      => 'feature_request',
				'title'   => __( 'Feature Request', 'conditional-blocks' ),
				'content' => __( 'Do you have a condition request? Share it with us at <a href="https://conditionalblocks.com/" target="_blank">conditionalblocks.com</a> ', 'conditional-blocks' ),
			),
			'support'         => array(
				'id'      => 'support',
				'title'   => __( 'Support', 'conditional-blocks' ),
				'content' => __( 'Need a hand? See our <a href="https://conditionalblocks.com/docs/" target="_blank">documentation</a>. <br /> You can also say <em>hello</em> to us via <a href="https://conditionalblocks.com/support/" target="_blank">support</a>.', 'conditional-blocks' ),
			),
		);

		$settings = array(
			'sections' => $sections,
			'fields'   => $fields,
			'sidebars' => $sidebars,
		);

		$settings = apply_filters( 'conditional_blocks_admin_settings', $settings );

		if ( $get_part ) {
			return $settings[ $get_part ];
		}

		return $settings;
	}

	/**
	 * Set the admin settings page.
	 */
	public function admin_init() {
		// Set the admin page.
		$this->settings_api->set_sections( $this->settings( 'sections' ) );
		$this->settings_api->set_fields( $this->settings( 'fields' ) );
		$this->settings_api->set_sidebar( $this->settings( 'sidebars' ) );
		// initialize settings.
		$this->settings_api->admin_init();
	}

	/**
	 * Display the plugin page
	 */
	public function plugin_page() {

		$cb_image = $this->svg_logo();

		echo '<div class="wrap XPLUGIN_SLUG-admin">';
		echo '<div class="conblock-settings-header">';
		echo '<div style="max-width: 45px;display: inline-block;position: absolute;">' . $cb_image . '</div>'; // phpcs:ignore
		echo '<h2 style="display: inline-block; position: relative; left: 55px;">XPLUGIN_NAME</h2>';
		echo '</div>';

		$this->settings_api->show_navigation();
		$this->settings_api->show_sidebar();
		$this->settings_api->show_forms();
		echo '</div>';
	}

	/**
	 * Register a custom menu page.
	 */
	public function menu() {

		$parent      = 'options-general.php';
		$plugin_name = __( 'XPLUGIN_NAME', 'conditional-blocks' );
		$permissions = 'manage_options';
		$slug        = 'conditional-blocks';
		$callback    = array( $this, 'plugin_page' );
		$priority    = 100;

		add_submenu_page(
			$parent,
			$plugin_name,
			$plugin_name,
			$permissions,
			$slug,
			$callback,
			$priority
		);
	}

	/**
	 * SVG logo.
	 */
	private function svg_logo() {

		return '<svg width="45" height="45" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="600" height="600" fill="#684FFE"/>
<path d="M281.253 371.58V210.191C281.253 200.292 273.237 192.259 263.321 192.259H101.932C92.0157 192.259 84 200.292 84 210.191V371.58C84 381.478 92.0157 389.511 101.932 389.511H263.321C273.237 389.511 281.253 381.478 281.253 371.58ZM191.592 335.715H155.727C145.811 335.715 137.795 327.682 137.795 317.783C137.795 307.885 145.811 299.851 155.727 299.851H191.592C201.508 299.851 209.524 307.885 209.524 317.783C209.524 327.682 201.508 335.715 191.592 335.715ZM209.524 281.919H155.727C145.811 281.919 137.795 273.885 137.795 263.987C137.795 254.088 145.811 246.055 155.727 246.055H209.524C219.44 246.055 227.455 254.088 227.455 263.987C227.455 273.885 219.441 281.919 209.524 281.919Z" fill="#F4FFB3"/>
<path d="M205.806 157.583C243.493 121.111 328.462 114.5 382.923 137.689L376.939 139.691C366.658 143.124 361.106 154.228 364.539 164.509C367.266 172.729 374.917 177.928 383.138 177.928C385.198 177.928 387.277 177.594 389.337 176.908L433.793 162.095C434.009 162.017 434.165 161.841 434.381 161.762C435.539 161.33 436.519 160.565 437.599 159.898C438.795 159.172 440.031 158.544 441.013 157.602C441.189 157.445 441.405 157.386 441.582 157.23C442.249 156.543 442.524 155.68 443.073 154.915C443.916 153.777 444.779 152.718 445.368 151.423C445.898 150.246 446.094 149.01 446.369 147.774C446.644 146.557 446.997 145.42 447.035 144.184C447.094 142.732 446.781 141.359 446.525 139.927C446.348 139.044 446.485 138.161 446.191 137.278L426.573 78.4224C423.14 68.1419 412.153 62.5708 401.755 66.0231C391.495 69.4367 385.942 80.5605 389.355 90.841L392.161 99.1986C323.341 72.5561 226.994 82.4825 178.516 129.391C170.747 136.905 170.531 149.343 178.064 157.131C185.618 164.901 198.017 165.137 205.806 157.583Z" fill="#FFF2F2"/>
<path d="M413.949 443.28C376.262 479.751 291.293 486.363 236.832 463.173L257.236 456.365C267.496 452.952 273.049 441.828 269.635 431.547C266.202 421.287 255.176 415.696 244.817 419.148L185.961 438.766C185.726 438.845 185.589 439.021 185.373 439.1C184.137 439.552 183.097 440.356 181.959 441.062C180.841 441.768 179.683 442.357 178.741 443.259C178.565 443.416 178.349 443.455 178.172 443.631C177.505 444.318 177.23 445.181 176.681 445.946C175.838 447.084 174.974 448.143 174.386 449.438C173.856 450.615 173.66 451.851 173.385 453.087C173.11 454.283 172.757 455.422 172.719 456.677C172.66 458.129 172.973 459.502 173.229 460.934C173.406 461.817 173.269 462.7 173.563 463.583L193.181 522.439C195.928 530.659 203.559 535.858 211.78 535.858C213.84 535.858 215.919 535.544 217.999 534.838C228.259 531.424 233.812 520.3 230.398 510.02L227.593 501.662C252.548 511.315 280.994 516.317 309.598 516.317C359.901 516.317 410.32 501.368 441.24 471.469C449.009 463.955 449.225 451.517 441.691 443.729C434.156 435.962 421.758 435.746 413.949 443.28Z" fill="white"/>
<path d="M500.921 235.21H373.372C365.535 235.21 359.2 241.559 359.2 249.382V376.931C359.2 384.754 365.535 391.103 373.372 391.103H500.921C508.758 391.103 515.093 384.754 515.093 376.931V249.382C515.093 241.559 508.758 235.21 500.921 235.21ZM444.232 348.587H415.887C408.05 348.587 401.715 342.238 401.715 334.415C401.715 326.592 408.05 320.243 415.887 320.243H444.232C452.069 320.243 458.404 326.592 458.404 334.415C458.404 342.238 452.07 348.587 444.232 348.587ZM458.405 306.07H415.888C408.051 306.07 401.716 299.721 401.716 291.898C401.716 284.075 408.051 277.726 415.888 277.726H458.405C466.242 277.726 472.576 284.075 472.576 291.898C472.576 299.721 466.242 306.07 458.405 306.07Z" fill="#85FFCC"/>
</svg>
';
	}
}
