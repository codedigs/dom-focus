module.exports = function(gulp, config, commands, browserSync) {
  return function() {
    browserSync.init({
      server: {
        baseDir: "app"
      }
    });

    gulp.watch(config.sass.src, [commands.sass]);

    var watchOptions = process.argv[3];

    if (watchOptions !== undefined) {
      var options = watchOptions.substring(watchOptions.indexOf("=") + 1);
      var types = options.split(",");

      if (types.includes("pug")) {
        gulp.watch(config.pug.src, [commands.pug]);
      }

      if (types.includes("html")) {
        gulp.watch(config.build_views.src, browserSync.reload);
      }

      if (types.includes("js")) {
        gulp.watch(config.js.src, browserSync.reload);
      }
    }
  };
};
