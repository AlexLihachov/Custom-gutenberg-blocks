<?php
/**
 * Template part for displaying archive category filter
 *
 * @package wp_rig
 */

namespace WP_Rig\WP_Rig;

$queriedObj = get_queried_object();
$arrTerms = array();

if( !empty( $queriedObj->taxonomy ) ) {
	$arrTerms = get_terms( array(
		'taxonomy' => $queriedObj->taxonomy,
		'hide_empty' => false
	) );
}

if( is_array( $arrTerms ) && count( $arrTerms ) > 0 ) {
?>
	<div class="category-filter-container">
		<div class="category-filter">
			<select onchange="document.location.href=this.value">
				<option value="#"><?php _e( 'Filter by Category', wp_get_theme()->get( 'TextDomain' ) ); ?></option>
				<?php
					foreach ( $arrTerms as $term ) {
				?>
						<option value="<?php echo get_term_link( $term ); ?>"><?php echo $term->name; ?></option>
				<?php
					}
				?>
			</select>
		</div>
	</div>
<?php
}