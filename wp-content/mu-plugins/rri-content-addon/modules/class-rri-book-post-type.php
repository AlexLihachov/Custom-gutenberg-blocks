<?php
/**
 * Books post type.
 *
 * */

/**
 * Initialization
 *
 * @since 1.0.0
 */
class RRI_Books_Post_Type {


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

		add_action( 'init', array( $this, 'rri_books_post_type' ) );
		
	}

	/**
	 * Create custom post type
	 */
	public function rri_books_post_type() {

		$labels = array(
		'name'                  => _x( 'Books', 'Post Type General Name', 'rri-content-addon' ),
		'singular_name'         => _x( 'Book', 'Post Type Singular Name', 'rri-content-addon' ),
		'menu_name'             => __( 'Books', 'rri-content-addon' ),
		'name_admin_bar'        => __( 'Book', 'rri-content-addon' ),
		'archives'              => __( 'Book Archives', 'rri-content-addon' ),
		'attributes'            => __( 'Book Attributes', 'rri-content-addon' ),
		'parent_item_colon'     => __( 'Parent Book:', 'rri-content-addon' ),
		'all_items'             => __( 'All Books', 'rri-content-addon' ),
		'add_new_item'          => __( 'Add New Book', 'rri-content-addon' ),
		'add_new'               => __( 'Add New', 'rri-content-addon' ),
		'new_item'              => __( 'New Book', 'rri-content-addon' ),
		'edit_item'             => __( 'Edit Book', 'rri-content-addon' ),
		'update_item'           => __( 'Update Book', 'rri-content-addon' ),
		'view_item'             => __( 'View Book', 'rri-content-addon' ),
		'view_items'            => __( 'View Books', 'rri-content-addon' ),
		'search_items'          => __( 'Search Book', 'rri-content-addon' ),
		'not_found'             => __( 'Not found', 'rri-content-addon' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'rri-content-addon' ),
		'featured_image'        => __( 'Featured Image', 'rri-content-addon' ),
		'set_featured_image'    => __( 'Set featured image', 'rri-content-addon' ),
		'remove_featured_image' => __( 'Remove featured image', 'rri-content-addon' ),
		'use_featured_image'    => __( 'Use as featured image', 'rri-content-addon' ),
		'insert_into_item'      => __( 'Insert into book', 'rri-content-addon' ),
		'uploaded_to_this_item' => __( 'Uploaded to this book', 'rri-content-addon' ),
		'items_list'            => __( 'Books list', 'rri-content-addon' ),
		'items_list_navigation' => __( 'Books list navigation', 'rri-content-addon' ),
		'filter_items_list'     => __( 'Filter books list', 'rri-content-addon' ),
	);
	$args = array(
		'label'                 => __( 'Book', 'rri-content-addon' ),
		'description'           => __( 'RRI Books', 'rri-content-addon' ),
		'labels'                => $labels,
		'supports' 				=> array('title', 'editor', 'excerpt', 'thumbnail', 'revisions', 'custom-fields'),
		'taxonomies' 			=> array('book-category'),
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 21,
		'menu_icon'             => 'dashicons-book',
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => 'tony-robbins-books',
		'exclude_from_search'   => false,
		'publicly_queryable'    => true,
		'capability_type'       => 'post',
		'show_in_rest'          => true,
	);

		register_post_type( RRI_CONTENT_ADDON_BOOK_POST_TYPE, $args );

		// Book Category.
		$labels = array(
			'name'              => _x( 'Book Categories', 'taxonomy general name', 'rri-content-addon' ),
			'singular_name'     => _x( 'Book Category', 'taxonomy singular name', 'rri-content-addon' ),
			'search_items'      => __( 'Search Book Categories', 'rri-content-addon' ),
			'all_items'         => __( 'All Book Categories', 'rri-content-addon' ),
			'parent_item'       => __( 'Parent Book Category', 'rri-content-addon' ),
			'parent_item_colon' => __( 'Parent Book Category:', 'rri-content-addon' ),
			'edit_item'         => __( 'Edit Book Category', 'rri-content-addon' ),
			'update_item'       => __( 'Update Book Category', 'rri-content-addon' ),
			'add_new_item'      => __( 'Add New Book Category', 'rri-content-addon' ),
			'new_item_name'     => __( 'New Book Category Name', 'rri-content-addon' ),
			'menu_name'         => __( 'Book Category', 'rri-content-addon' ),
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

		register_taxonomy( RRI_CONTENT_ADDON_TAXONOMY_BOOK_CATEGEGORY, RRI_CONTENT_ADDON_BOOK_POST_TYPE, $args );
		

	}

}

/**
 *  Kicking this off by calling 'get_instance()' method
 */
RRI_Books_Post_Type::get_instance();
