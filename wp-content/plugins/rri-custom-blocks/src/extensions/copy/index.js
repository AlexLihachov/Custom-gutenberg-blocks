/**
 * Internal dependencies
 */
import icon from './icon';
import CopyBlocks from './controls';

/**
 * WordPress dependencies
 */
const {registerPlugin} = wp.plugins;

registerPlugin('rri-copy', {
	icon: icon.copy,
	render: CopyBlocks,
});

