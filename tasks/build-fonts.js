var notifier = require("node-notifier");

module.exports = function(gulp, plugins, config) {
  return function() {
    var options = typeof config.build_fonts.options !== "undefined" ? config.build_fonts.options : {};
    var notify = typeof config.build_fonts.notify !== "undefined" ? config.build_fonts.notify : false;

    return gulp.src(config.build_fonts.src, options)
      .pipe(plugins.flatten())
      .pipe(gulp.dest(config.build_fonts.dest))
      .on('end', function() {
        if (typeof config.build_fonts.callback !== "undefined") {
          config.build_fonts.callback();
        }

        if (notify) {
          notifier.notify({
            title: "DOM Focus",
            message: "Flatten font files completed!"
          });
        }
      });
  };
};
