var notifier = require("node-notifier");

module.exports = function(gulp, plugins, config, browserSync) {
  return function() {
    var options = typeof config.pug.options !== "undefined" ? config.pug.options : {};
    var notify = typeof config.pug.notify !== "undefined" ? config.pug.notify : false;
    var prettify = typeof config.pug.prettify !== "undefined" ? config.pug.prettify : true;

    return gulp.src(config.pug.src, options)
      .pipe(plugins.pug())
      .pipe(plugins.if(prettify, plugins.prettify({
        indent_char: " ",
        indent_size: 4
      })))
      .pipe(gulp.dest(config.pug.dest))
      .pipe(browserSync.reload({
        stream: true
      }))
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
