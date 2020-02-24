// Last edited 19th November 2019
// Version 1.0.2
/* eslint-disable no-console */
/* eslint-disable valid-jsdoc */
// Load all the modules from package.json
const gulp = require( 'gulp' );
const $ = require( 'gulp-load-plugins' )();
const data = require( 'json-file' ).read( './plugins.json' ).data;
const del = require( 'del' );
const path = require( 'path' );

// Webpack from @wordpress/scripts.
const webpack = require( 'webpack' );
const webpackConfig = require( '@wordpress/scripts/config/webpack.config' );

const plugins = data.plugins;
const src = 'src';
const distFolder = 'dist';

let mode = 'development';

/**
 * Replace template parts through out the project.
 *
 * @param pluginConfig — array.
 * @return object.
 */
function replacements( pluginConfig ) {
	const replace = [
		{
			match: /XPLUGIN_NAME/g,
			replacement: pluginConfig.name,
		},
		{
			match: /XPLUGIN_PREFIX/g,
			replacement: pluginConfig.prefix,
		},
		{
			match: /XPLUGIN_PREFIX_CAPITAL/g,
			replacement: pluginConfig.prefix_capital ? pluginConfig.prefix_capital : 'hello',
		},
		{
			match: /XPLUGIN_TEXT_DOMAIN/g,
			replacement: pluginConfig.text_domain,
		},
		{
			match: /XPLUGIN_VERSION/g,
			replacement: pluginConfig.version,
		},
		{
			match: /XPLUGIN_SLUG/g,
			replacement: pluginConfig.slug,
		},
		{
			match: /XPLUGIN_DESCRIPTION/g,
			replacement: pluginConfig.description,
		},
		{
			match: /XPLUGIN_EDD_ITEM_ID/g,
			replacement: pluginConfig.edd_item_id ? pluginConfig.edd_item_id : '',
		},
		{
			match: /XPLUGIN_EDD_STORE_URL/g,
			replacement: pluginConfig.edd_store_url ? pluginConfig.edd_store_url : '',
		},
		{
			match: /XPLUGIN_AUTHOR/g,
			replacement: pluginConfig.author ? pluginConfig.author : '',
		},
	];

	return replace;
}

function selectFiles( defaultSelection, pluginConfig ) {
	const selection = [];

	// set the default folder to include.
	if ( Array.isArray( defaultSelection ) ) {
		selection.push( ...defaultSelection );
	} else {
		selection.push( defaultSelection );
	}

	// Exclude files from the plugin config.
	if ( pluginConfig.exclude ) {
		selection.push( ...pluginConfig.exclude );
	}

	// Exclude the main plugin file.
	selection.push( '!' + src + '/**/main-plugin-file.php' );
	// Exclude files that start with exclude.
	selection.push( '!' + src + '/**/exclude*' );
	// Exclude files that start with class-exclude.
	selection.push( '!' + src + '/**/class-exclude*' );

	if ( pluginConfig.type === 'free' ) {
		selection.push( '!' + src + '/**/premium*' ); // Exclude folders that start with premium.
		selection.push( '!' + src + '/**/class-premium*' ); // Exclude folders that start with class-premium.
		selection.push( '!' + src + '/**/premium*/**/*' ); // Exclude files that start with premium.
	} else {
		selection.push( '!' + src + '/**/free*' ); // Exclude folders that start with free.
		selection.push( '!' + src + '/**/class-free*' ); // Exclude folders that start with class-free.
		selection.push( '!' + src + '/**/free*/**/*' ); // Exclude files that start with free.
	}

	return selection;
}

/**
 * Error Handler for gulp-plumber
 *
 * @param err
 */
function errorHandler( err ) {
	console.error( err );
	this.emit( 'end' );
}

// clean dist folder
async function clean() {
	const cleanThis = [];

	for ( const currentPlugin of plugins ) {
		// Set our config
		const pluginConfig = currentPlugin;
		// set our destination
		cleanThis.push( distFolder + '/' + pluginConfig.slug + '/*' );
	}

	const deletedPaths = await del( cleanThis, { dryRun: false } );

	// console.log( 'Files and directories that would be deleted:\n', deletedPaths.join( '\n' ) );

	return deletedPaths;
}

function copyFiles( done ) {
	for ( const currentPlugin of plugins ) {
		// Set our config
		const pluginConfig = currentPlugin;
		// set our destination
		const dist = distFolder + '/' + pluginConfig.slug;

		// Copy to Dist resursive and replace templates
		gulp.src( selectFiles( src + '/**/*', pluginConfig ) )
			.pipe( $.preprocess( { context: pluginConfig } ) )
			.pipe(
				$.replaceTask( {
					patterns: replacements( pluginConfig ),
				} )
			)
			.pipe( gulp.dest( dist ) );

		// copy and rename main plugin file.
		gulp.src( src + '/main-plugin-file.php' )
			.pipe( $.preprocess( { context: pluginConfig } ) )
			.pipe(
				$.replaceTask( {
					patterns: replacements( pluginConfig ),
				} )
			)
			.pipe( $.rename( pluginConfig.slug + '.php' ) )
			.pipe( gulp.dest( dist ) );

		// copy to Dist Vendors.
		gulp.src( src + '/**/vendor/**/*' ).pipe( gulp.dest( dist ) );
	}

	done();
}

function watchFiles( done ) {
	// Watch PHP
	const php = gulp.watch( [ src + '/**/*.php', '!' + src + '/*vendor/**/*' ], { delay: 3000 } );
	php.on( 'change', gulp.series( changedPHP ) );
	// Watch JS
	const js = gulp.watch( [ src + '/**/*.{js,jsx}', '!' + src + '/*vendor/**/*' ], { delay: 3000 } );
	js.on( 'change', gulp.series( buildJS, webpackJS ) );
	// Watch vendor
	const vendor = gulp.watch( [ src + '/**/vendor/**/*' ], { delay: 3000 } );
	vendor.on( 'change', gulp.series( changedVendor ) );
	// Watch Every other file.
	const files = gulp.watch( [ src + '/**/*', '!' + src + '/**/*.{php,js,jsx,scss}', src + '/*vendor/**/*' ], { delay: 3000 } );

	files.on( 'change', gulp.series( changedFiles ) );

	done();
}

function changedPHP( done ) {
	for ( const currentPlugin of plugins ) {
		// Set our config
		const pluginConfig = currentPlugin;
		// set our destination
		const dist = distFolder + '/' + currentPlugin.slug;

		gulp.src( selectFiles( src + '/**/*.php', pluginConfig ) )
			.pipe( $.preprocess( { context: pluginConfig } ) )
			.pipe(
				$.replaceTask( {
					patterns: replacements( pluginConfig ),
				} )
			)
			.pipe( gulp.dest( dist ) );

		// copy and rename main plugin file.
		gulp.src( src + '/main-plugin-file.php' )
			.pipe( $.preprocess( { context: pluginConfig } ) )
			.pipe(
				$.replaceTask( {
					patterns: replacements( pluginConfig ),
				} )
			)
			.pipe( $.rename( pluginConfig.slug + '.php' ) )
			.pipe( gulp.dest( dist ) );
	}

	done();
}

function changedVendor( done ) {
	// Copy changed vendor files.
	for ( const currentPlugin of plugins ) {
		// Set our config
		const pluginConfig = currentPlugin;
		// set our destination
		const dist = distFolder + '/' + currentPlugin.slug;

		gulp.src( src + '/**/vendor/**/*' )
			.pipe( $.preprocess( { context: pluginConfig } ) )
			.pipe(
				$.replaceTask( {
					patterns: replacements( pluginConfig ),
				} )
			)
			.pipe( gulp.dest( dist ) );
	}

	done();
}
function changedFiles( done ) {
	for ( const currentPlugin of plugins ) {
		// Set our config
		const pluginConfig = currentPlugin;
		// set our destination
		const dist = distFolder + '/' + currentPlugin.slug;

		// All changed files other than PHP, JS, JSX, SCSS.
		const files = [ src + '/**/*', '!' + src + '/**/*.{php,js,jsx,scss}' ];

		gulp.src( selectFiles( files, pluginConfig ) )
			.pipe( $.preprocess( { context: pluginConfig } ) )
			.pipe(
				$.replaceTask( {
					patterns: replacements( pluginConfig ),
				} )
			)
			.pipe( gulp.dest( dist ) );
	}

	done();
}

function buildJS( done ) {
	for ( const currentPlugin of plugins ) {
		// Set our config
		const pluginConfig = currentPlugin;
		// set our destination
		const dist = distFolder + '/' + pluginConfig.slug;

		// Copy, Build and minify JS Files.
		const files = [ src + '/**/*.{js,jsx}', '!' + src + '/**/vendor/**/*' ];

		gulp.src( selectFiles( files, pluginConfig ) )
			.pipe( $.plumber( { errorHandler } ) )
			.pipe( $.preprocess( { context: pluginConfig } ) )
			.pipe(
				$.replaceTask( {
					patterns: replacements( pluginConfig ),
				} )
			)
			.pipe( $.terser() )
			.pipe(
				$.rename( {
					suffix: '.min',
				} )
			)
			.pipe( gulp.dest( dist ) );
	}

	done();
}

/**
 * WP POT Translation File Generator.
 *
 * @param done
 */
function translatePot( done ) {
	for ( const currentPlugin of plugins ) {
		// Set our config
		const pluginConfig = currentPlugin;
		// set our destination
		const dist = distFolder + '/' + pluginConfig.slug;

		gulp.src( selectFiles( dist + '/**/*.php', pluginConfig ) )
			.pipe( $.plumber( { errorHandler } ) )
			.pipe(
				$.wpPot( {
					domain: pluginConfig.text_domain,
					package: pluginConfig.slug,
					lastTranslator: pluginConfig.author,
					team: pluginConfig.author,
				} )
			)
			.pipe( gulp.dest( dist + '/languages/' + pluginConfig.slug + '.pot' ) );
	}

	done();
}

function zipBuild( done ) {
	for ( const currentPlugin of plugins ) {
		// Set our config
		const pluginConfig = currentPlugin;
		// set our destination
		const distPlugin = distFolder + '/' + pluginConfig.slug;

		const prodFolder = distFolder + '/production/';

		gulp.src( distPlugin + '/**/*', { base: distFolder + '/', buffer: true, nodir: false } )
			.pipe( $.zip( pluginConfig.slug + '.zip' ) )
			.pipe( gulp.dest( prodFolder ) );
	}

	done();
}

/**
 * Run webpack to build assets as specified in webpack config
 *
 * @param done
 */
function webpackJS( done ) {
	for ( const currentPlugin of plugins ) {
		// Exit if not needed.
		if ( currentPlugin.webpack_entry ) {
			// Set the entry for webpack
			webpackConfig.entry = currentPlugin.webpack_entry;
			// Make sure path is absolute for output.
			currentPlugin.webpack_output.path = path.resolve( __dirname, currentPlugin.webpack_output.path );
			// Set the output.
			webpackConfig.output = currentPlugin.webpack_output;

			webpackConfig.mode = mode;

			new Promise( ( resolve, reject ) => {
				webpack( webpackConfig, ( err, stats ) => {
					if ( err ) {
						return reject( err );
					}
					if ( stats.hasErrors() ) {
						return reject( new Error( stats.compilation.errors.join( '\n' ) ) );
					}
					resolve();
				} );
			} );
		}
	}
	done();
}


function setProductionMode( done ) {
	mode = 'production';

	done();
}

function setDevelopmentMode( done ) {
	mode = 'development';

	done();
}

/**
 * Default Task
 */
gulp.task( 'translate', gulp.series( translatePot ) );
/**
 * Build Task
 */
gulp.task( 'build', gulp.series( clean, copyFiles, buildJS, webpackJS ) );

/**
 * production Task
 */
gulp.task( 'production', gulp.series( setProductionMode, 'build', zipBuild, setDevelopmentMode ) );

/**
 * production Task
 */
gulp.task( 'zip', gulp.series( zipBuild ) );

/**
 * Watch Task
 */
gulp.task( 'watch', gulp.series( 'build', watchFiles ) );

/**
 * Default Task
 */
gulp.task( 'default', gulp.series( 'build' ) );

