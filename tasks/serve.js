var browserSync = require("browser-sync").create();

module.exports = function(gulp, plugins, config, commands) {
  return function() {
    browserSync.init({
      server: {
        baseDir: "app"
      }
    });
  };
};
