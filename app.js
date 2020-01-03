var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var config;

try {
  config = require(process.cwd() + "/dfconfig");
} catch(e) {} // do nothing

var plugins = require("gulp-load-plugins")({
  rename: {
    'gulp-merge-media-queries': "mmq"
  }
});

var commands = {
  init: "init",
  serve: "serve",

  /*task commands*/
  sass: "sass",
  sass_watch: "sass:watch",
  pug: "pug",

  // scripts: typeof config.scripts.command !== "undefined" ? config.scripts.command : "scripts",
  // scripts_watch: typeof config.scripts.watch_command !== "undefined" ? config.scripts.watch_command : "scripts:watch",
  build_views: "build:views",
  build_images: "build:images",
  build_fonts: "build:fonts",
  build: "build",
  unbuild: "unbuild"
};

function getTask(task) {
  var taskCommand = task.replace("-", ":");

  switch (taskCommand) {
    case commands.sass:
      return require(__dirname + "/tasks/" + task)(gulp, plugins, config, browserSync);

    case commands.pug:
    case commands.build_images:
    case commands.build_fonts:
    case commands.build_fonts:
      return require(__dirname + "/tasks/" + task)(gulp, plugins, config);

    case commands.sass_watch:
      return require(__dirname + "/tasks/" + task)(gulp, config, commands);

    case commands.build:
      return require(__dirname + "/tasks/" + task)(config, commands);

    case commands.unbuild:
      return require(__dirname + "/tasks/" + task)(config);

    case commands.serve:
      return require(__dirname + "/tasks/" + task)(gulp, config, commands, browserSync);
  }
}

gulp.task(commands.sass, getTask("sass"));
gulp.task(commands.sass_watch, [commands.sass], getTask('sass-watch'));
gulp.task(commands.pug, getTask("pug"));
// gulp.task(commands.scripts, getTask("scripts"));
// gulp.task(commands.scripts_watch, [commands.scripts], getTask('scripts-watch'));
// gulp.task("watch", [commands.sass_watch, commands.scripts_watch], function() {});

gulp.task(commands.build_views, getTask("build-views"));
gulp.task(commands.build_images, getTask("build-images"));
gulp.task(commands.build_fonts, getTask("build-fonts"));
gulp.task(commands.build, getTask("build"));
gulp.task(commands.unbuild, getTask("unbuild"));

gulp.task(commands.serve, [
  commands.sass,
  // commands.scripts
], getTask("serve"));

module.exports = {
  commands: commands,

  runGulpCommand: function(command) {
    gulp.start(command);
  }
};
