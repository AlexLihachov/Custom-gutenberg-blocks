/**
 * Gutenberg Blocks
 *
 * All blocks related JavaScript files should be imported here.
 * You can create a new block folder in this dir and include code
 * for that block here as well.
 *
 * All blocks should be included here since this is the file that
 * Webpack is compiling as the input file.
 */

/**
 * Internal dependencies
 */
import './fontawesome.js';
import './format-types';

/**
 * External dependencies
 */
import registerBlock from './register-block';


/**
 * Blocks
 * Import all index.js and register all the blocks found (if name & settings are exported by the script)
 */
const importAllAndRegister = r => {
    r.keys().forEach( key => {
        const { name, settings } = r( key );
        try {
            return name && settings && registerBlock( name, settings )
        } catch ( error ) {
            console.error( `Could not register ${ name } block` ) // eslint-disable-line
        }
    } )
};

importAllAndRegister( require.context( './block', true, /index\.js$/ ) );
