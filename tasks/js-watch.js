module.exports = function(gulp, config, commands) {
  return function() {
    gulp.watch(config.js.src, [commands.js]);
  };
};
