var notifier = require("node-notifier");

module.exports = function(gulp, plugins, config, browserSync) {
  return function() {
    var options = typeof config.js.options !== "undefined" ? config.js.options : {};
    var notify = typeof config.js.notify !== "undefined" ? config.js.notify : false;

    return gulp.src(config.js.src, options)
      .pipe(plugins.plumber({
        errorHandler: function(err) {
          console.log(err);
          this.emit("end");
        }
      }))
      .pipe(plugins.browserify())
      .pipe(gulp.dest(config.js.dest))
      .pipe(browserSync.reload({
        stream: true
      }))
      .on('end', function() {
        if (typeof config.js.callback !== "undefined") {
          config.js.callback();
        }

        if (notify) {
          notifier.notify({
            title: "DOM Focus",
            message: "Compile js files completed!"
          });
        }
      });
  };
};
