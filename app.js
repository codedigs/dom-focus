var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var config;

try {
  config = require(process.cwd() + "/dfconfig");
} catch(e) {} // do nothing

var plugins = require("gulp-load-plugins")({
  rename: {
    'gulp-merge-media-queries': "mmq",
    'gulp-html-prettify': "prettify"
  }
});

var commands = {
  init: "init",
  serve: "serve",

  /*task commands*/
  pug: "pug",
  pug_watch: "pug:watch",
  sass: "sass",
  sass_watch: "sass:watch",
  js: "js",
  js_watch: "js:watch",

  build_views: "build:views",
  build_images: "build:images",
  build_fonts: "build:fonts",
  build: "build",
  unbuild: "unbuild"
};

function getTask(task) {
  var taskFile = __dirname + "/tasks/" + task.replace(":", "-");

  switch (task) {
    case commands.pug:
    case commands.sass:
    case commands.js:
      return require(taskFile)(gulp, plugins, config, browserSync);

    case commands.build_views:
    case commands.build_images:
    case commands.build_fonts:
      return require(taskFile)(gulp, plugins, config);

    case commands.pug_watch:
    case commands.sass_watch:
    case commands.js_watch:
      return require(taskFile)(gulp, config, commands);

    case commands.build:
      return require(taskFile)(config, commands);

    case commands.unbuild:
      return require(taskFile)(config);

    case commands.serve:
      return require(taskFile)(gulp, config, commands, browserSync);
  }
}

gulp.task(commands.pug, getTask(commands.pug));
gulp.task(commands.pug_watch, [commands.pug], getTask(commands.pug_watch));
gulp.task(commands.sass, getTask(commands.sass));
gulp.task(commands.sass_watch, [commands.sass], getTask(commands.sass_watch));
gulp.task(commands.js, getTask(commands.js));
gulp.task(commands.js_watch, getTask(commands.js_watch));
gulp.task(commands.build_views, getTask(commands.build_views));
gulp.task(commands.build_images, getTask(commands.build_images));
gulp.task(commands.build_fonts, getTask(commands.build_fonts));
gulp.task(commands.build, getTask(commands.build));
gulp.task(commands.unbuild, getTask(commands.unbuild));
gulp.task(commands.serve, [commands.pug, commands.sass, commands.js], getTask(commands.serve));

module.exports = {
  commands: commands,

  runGulpCommand: function(command) {
    gulp.start(command);
  }
};
