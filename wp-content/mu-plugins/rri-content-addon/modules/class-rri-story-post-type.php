<?php
/**
 * Stories post type.
 *
 * */

/**
 * Initialization
 *
 * @since 1.0.0
 */
class RRI_Stories_Post_Type {


	/**
	 * Member Variable
	 *
	 * @var instance
	 */
	private static $instance;

	/**
	 * Member Variable
	 *
	 * @var body_classes
	 */
	private $body_classes = array();

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

		add_action( 'init', array( $this, 'rri_stories_post_type' ) );
		
	}

	/**
	 * Create custom post type
	 */
	public function rri_stories_post_type() {

		$labels = array(
		'name'                  => _x( 'Stories', 'Post Type General Name', 'rri-content-addon' ),
		'singular_name'         => _x( 'Story', 'Post Type Singular Name', 'rri-content-addon' ),
		'menu_name'             => __( 'Stories', 'rri-content-addon' ),
		'name_admin_bar'        => __( 'Story', 'rri-content-addon' ),
		'archives'              => __( 'Story Archives', 'rri-content-addon' ),
		'attributes'            => __( 'Story Attributes', 'rri-content-addon' ),
		'parent_item_colon'     => __( 'Parent Story:', 'rri-content-addon' ),
		'all_items'             => __( 'All Stories', 'rri-content-addon' ),
		'add_new_item'          => __( 'Add New Story', 'rri-content-addon' ),
		'add_new'               => __( 'Add New', 'rri-content-addon' ),
		'new_item'              => __( 'New Story', 'rri-content-addon' ),
		'edit_item'             => __( 'Edit Story', 'rri-content-addon' ),
		'update_item'           => __( 'Update Story', 'rri-content-addon' ),
		'view_item'             => __( 'View Story', 'rri-content-addon' ),
		'view_items'            => __( 'View Stories', 'rri-content-addon' ),
		'search_items'          => __( 'Search Story', 'rri-content-addon' ),
		'not_found'             => __( 'Not found', 'rri-content-addon' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'rri-content-addon' ),
		'featured_image'        => __( 'Featured Image', 'rri-content-addon' ),
		'set_featured_image'    => __( 'Set featured image', 'rri-content-addon' ),
		'remove_featured_image' => __( 'Remove featured image', 'rri-content-addon' ),
		'use_featured_image'    => __( 'Use as featured image', 'rri-content-addon' ),
		'insert_into_item'      => __( 'Insert into story', 'rri-content-addon' ),
		'uploaded_to_this_item' => __( 'Uploaded to this story', 'rri-content-addon' ),
		'items_list'            => __( 'Stories list', 'rri-content-addon' ),
		'items_list_navigation' => __( 'Stories list navigation', 'rri-content-addon' ),
		'filter_items_list'     => __( 'Filter stories list', 'rri-content-addon' ),
	);
	$args = array(
		'label'                 => __( 'Story', 'rri-content-addon' ),
		'description'           => __( 'RRI Stories', 'rri-content-addon' ),
		'labels'                => $labels,
		'supports' 				=> array('title', 'editor', 'excerpt', 'thumbnail', 'revisions', 'custom-fields'),
		'taxonomies' 			=> array('story-category'),
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 23,
		'menu_icon'             => 'dashicons-id-alt',
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => 'tony-robbins-stories',
		'exclude_from_search'   => false,
		'publicly_queryable'    => true,
		'capability_type'       => 'post',
		'show_in_rest'          => true,
	);

		register_post_type( RRI_CONTENT_ADDON_STORY_POST_TYPE, $args );

		// Story Category.
		$labels = array(
			'name'              => _x( 'Story Categories', 'taxonomy general name', 'rri-content-addon' ),
			'singular_name'     => _x( 'Story Category', 'taxonomy singular name', 'rri-content-addon' ),
			'search_items'      => __( 'Search Story Categories', 'rri-content-addon' ),
			'all_items'         => __( 'All Story Categories', 'rri-content-addon' ),
			'parent_item'       => __( 'Parent Story Category', 'rri-content-addon' ),
			'parent_item_colon' => __( 'Parent Story Category:', 'rri-content-addon' ),
			'edit_item'         => __( 'Edit Story Category', 'rri-content-addon' ),
			'update_item'       => __( 'Update Story Category', 'rri-content-addon' ),
			'add_new_item'      => __( 'Add New Story Category', 'rri-content-addon' ),
			'new_item_name'     => __( 'New Story Category Name', 'rri-content-addon' ),
			'menu_name'         => __( 'Story Category', 'rri-content-addon' ),
		);
		$args = array(
			'labels' => $labels,
			'description' => __( '', 'rri-content-addon' ),
			'hierarchical' => true,
			'public' => true,
			'publicly_queryable' => false,
			'show_ui' => true,
			'show_in_menu' => true,
			'show_in_nav_menus' => true,
			'show_tagcloud' => false,
			'show_in_quick_edit' => true,
			'show_admin_column' => false,
			'show_in_rest' => true,
		);

		register_taxonomy( RRI_CONTENT_ADDON_TAXONOMY_STORY_CATEGEGORY, RRI_CONTENT_ADDON_STORY_POST_TYPE, $args );
		

	}

}

/**
 *  Kicking this off by calling 'get_instance()' method
 */
RRI_Stories_Post_Type::get_instance();
