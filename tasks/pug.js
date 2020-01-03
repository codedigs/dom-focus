var notifier = require("node-notifier");

module.exports = function(gulp, plugins, config) {
  return function() {
    var options = typeof config.pug.options !== "undefined" ? config.pug.options : {};
    var notify = typeof config.pug.notify !== "undefined" ? config.pug.notify : false;

    return gulp.src(config.pug.src, options)
      .pipe(plugins.pug())
      .pipe(gulp.dest(config.pug.dest))
      .on('end', function() {
        if (typeof config.pug.callback !== "undefined") {
          config.pug.callback();
        }

        if (notify) {
          notifier.notify({
            title: "DOM Focus",
            message: "Compile pug files completed!"
          });
        }
      });
  };
};
