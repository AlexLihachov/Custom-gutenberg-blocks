# RRI 2020 WordPress Theme

## RRI's Performance-Focused WordPress Theme for 2020 and Beyond
This theme was built to promote best practices including:
- Accessibility
- [Lazy-loading of images ](https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video/)
- Mobile-first
- Progressive enhancement
- Progressive Web App enabled
- AMP-ready

## Documentation
Official Documentation is in progress.

## Installation
This should all work on Mac & Windows.

### Requirements
This theme requires the following dependencies. Full installation instructions are provided at their respective websites.

- [PHP](http://php.net/) 7.3
- [npm](https://www.npmjs.com/)
- [Composer](https://getcomposer.org/) (installed globally makes things easier)

### How to prepare for local dev:
1. In command line, run `npm run rig-init` to install necessary node and Composer dependencies.
2. In command line, run `npm run dev` to process source files, build the development theme, and watch files for subsequent changes.
	- `npm run build` can be used to process the source files and build the development theme without watching files afterwards.
3. In WordPress admin, activate the development theme.

## How to create a build for production:
1. Run `npm run bundle` from inside the `wp-rig` development theme.
2. A new, production ready theme will be generated in `wp-content/themes`.
3. The production theme can be activated or uploaded to a production environment.

### Available Processes

#### `dev watch` process
`npm run dev` will run the default development task that processes source files. While this process is running, source files will be watched for changes and the BrowserSync server will run. This process is optimized for speed so you can iterate quickly.

#### `dev build` process
`npm run build` processes source files one-time. It does not watch for changes nor start the BrowserSync server.

#### `translate` process
The translation process generates a `.pot` file for the theme in the `./languages/` directory.

The translation process will run automatically during production builds unless the `export:generatePotFile` configuration value in `./config/config.json` is set to `false`.

The translation process can also be run manaually with `npm run translate`. However, unless `NODE_ENV` is defined as `production` the `.pot` file will be generated against the source files, not the production files.

#### `production bundle` process
`npm run bundle` generates a production ready theme as a new theme directory and, optionally, a `.zip` archive. This builds all source files, optimizes the built files for production, does a string replacement and runs translations. Non-essential files from the `wp-rig` development theme are not copied to the production theme.

To bundle the theme without creating a zip archive, define the `export:compress` setting in `./config/config.json` to `false`:

```javascript
export: {
	compress: false
}
```

### Gulp process
This theme uses a [Gulp 4](https://gulpjs.com/) build process to generate and optimize the code for the theme. Feel free to edit any `.php` files. Asset files (CSS, JavaScript and images) are processed by gulp. You should only edit the source asset files in the following locations:
- CSS: `assets/css/src`
- JavaScript: `assets/js/src`
- images: `assets/images/src`
