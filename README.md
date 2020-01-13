# DOM Focus

Focus on front-end development.

## Installation
 - Use command `npm install --save-dev dom-focus`

## Commands
 - `node node_modules/.bin/df-cli` - Show command list.
 - `node node_modules/.bin/df-cli init` - Create `dbconfig.js` file.
 - `node node_modules/.bin/df-cli pug` - Compile pug files.
 - `node node_modules/.bin/df-cli pug:watch` - Compile pug files every changes of it.
 - `node node_modules/.bin/df-cli sass` - Compile sass files.
 - `node node_modules/.bin/df-cli sass:watch` - Compile sass files every changes of it.
 - `node node_modules/.bin/df-cli build:views` - Build view with minifying css and js files.
 - `node node_modules/.bin/df-cli build:images` - Optimize image files.
 - `node node_modules/.bin/df-cli build:fonts` - Flatten font files.
 - `node node_modules/.bin/df-cli build` - Run the commands in these order: `unbuild, sass, scripts, [build:views, build:images, build:fonts]`.
 - `node node_modules/.bin/df-cli unbuild` - Remove output files(`dist directory`).
 - `node node_modules/.bin/df-cli serve` - Run the application.

## Optional configuration

### pug
 - `notify` - Show toast message every time the pug command completed. Default is false.
 - `prettify` - Prettify html output. Default is true.

### sass
 - `notify` - Show toast message every time the sass command completed. Default is false.

### js
 - `uglify` - Minify the javascript code. Default is true

### build_views
 - `notify` - Show toast message every time the build:views command completed. Default is false.

### build_images
 - `notify` - Show toast message every time the build:images command completed. Default is false.

### build_fonts
 - `notify` - Show toast message every time the build:fonts command completed. Default is false.

## Example

Checkout the [example](https://github.com/codedigs/dom-focus/blob/master/app) and test it in your local machine.

## LICENSE
DOM Focus is released under the MIT License.
