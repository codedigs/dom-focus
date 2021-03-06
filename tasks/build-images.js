var notifier = require("node-notifier");

module.exports = function(gulp, plugins, config) {
  return function() {
    var options = typeof config.build_images.options !== "undefined" ? config.build_images.options : {};
    var notify = typeof config.build_images.notify !== "undefined" ? config.build_images.notify : false;

    return gulp.src(config.build_images.src, options)
      .pipe(plugins.cache(plugins.imagemin({
        interlaced: true
      })))
      .pipe(gulp.dest(config.build_images.dest))
      .on('end', function() {
        if (typeof config.build_images.callback !== "undefined") {
          config.build_images.callback();
        }

        if (notify) {
          notifier.notify({
            title: "DOM Focus",
            message: "Optimize image files completed!"
          });
        }
      });
  };
};
