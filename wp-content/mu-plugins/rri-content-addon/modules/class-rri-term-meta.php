<?php
/**
 * Manage term meta
 *
 * */

/**
 * Initialization
 *
 * @since 1.0.0
 */
class RRI_Term_Meta {
	/**
	 * Member Variable
	 *
	 * @var instance
	 */
	private static $instance;

	/**
	 *  Initiator
	 */
	public static function get_instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 *  Constructor
	 */
	public function __construct() {
		add_action( 'init', array( $this, 'rri_term_meta' ) );
	}

	public function rri_term_meta() {
		add_action( 'admin_enqueue_scripts', array( $this, 'rri_admin_scripts' ) );

		add_action( 'category_add_form_fields', array( $this, 'rri_add_term_field' ) );
		add_action( 'category_edit_form_fields', array( $this, 'rri_edit_term_field' ) );
		add_action( 'create_category', array( $this, 'rri_save_term' ) );
		add_action( 'edited_category', array( $this, 'rri_save_term' ) );

		add_action( 'story-category_add_form_fields', array( $this, 'rri_add_term_field' ) );
		add_action( 'story-category_edit_form_fields', array( $this, 'rri_edit_term_field' ) );
		add_action( 'create_story-category', array( $this, 'rri_save_term' ) );
		add_action( 'edited_story-category', array( $this, 'rri_save_term' ) );
	}

	public function rri_admin_scripts() {
		wp_enqueue_style( 'wp-color-picker');
        wp_enqueue_script( 'wp-color-picker');

        wp_enqueue_script( 'rri-color-picker', RRI_CONTENT_ADDON_URL . 'assets/js/rri_color_picker.js', array( 'wp-color-picker' ) );
	}

	public function rri_add_term_field() {
?>
		<div class="form-field">
			<label for="term_color"><?php _e( 'Color', 'rri-content-addon' ); ?></label>
			<input type="text" name="term_color" id="term_color">
		</div>
<?php
	}

	public function rri_edit_term_field( $term ) {
?>
		<tr class="form-field ">
			<th scope="row"><?php _e( 'Color', 'rri-content-addon' ); ?></th>
			<td>
				<input type="text" name="term_color" id="term_color" value="<?php echo get_term_meta( $term->term_id, 'term_color', true ); ?>">
			</td>
		</tr>		
<?php
	}

	public function rri_save_term( $term_id ) {
		if( isset( $_POST['term_color'] ) ) {
			update_term_meta( $term_id, 'term_color', $_POST['term_color'] );
		}
	}
}


/**
 *  Kicking this off by calling 'get_instance()' method
 */
RRI_Term_Meta::get_instance();