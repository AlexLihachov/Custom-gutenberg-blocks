# Conditional Blocks

## Contribute

### Install

Download or clone the repository to your computer. NPM is required to complete the installation.

```
npm install
```

Composer, WordPress Coding Standards, PHPCS, PHPCBF & PHPCompatibility will be automatically installed and setup. 

### Commands

```
npm run build
```
Build all files into the /dist/ folder.

```
npm run watch
```
Watch for changes and build all files into the /dist/ folder.

```
npm run production
```
Build, minify and translate all files into the /dist/ folder and create zip files inside /dist/production/

### Usage

This setup uses Gulp 4 to generate 2 WordPress plugins from one code base. The plugin information such as version number is located inside the `plugins.json`

Gulp will search and replace certain placeholders, such as `XPLUGIN_NAME`, `XPLUGIN_PREFIX`, `XPLUGIN_VERSION` and `XPLUGIN_SLUG`. You can see them all inside the `gulpfile.js`. The placeholders make it ease share the same files with multiple plugins. We don't need to maintain multiple versions anymore.


#### Including/Excluding code blocks

Gulp will also strip out code blocks within the same file. We use this to meet the WordPress guidelines. 

```
// @if type = 'premium'
echo 'this is the premium plugin';
// @endif

// @if type = 'free'
echo 'this is only in the free version.';
// @endif

```

### Including/Excluding files

Files that begin with the name `premium-` will be automatically excluding in the free version. 
Files that begin with the name `free-` will be automatically excluding in the premium version. 

Manual file exclusions can be set inside the `plugins.json` file.



