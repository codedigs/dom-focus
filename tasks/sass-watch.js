module.exports = function(gulp, config, commands) {
  return function() {
    gulp.watch(config.sass.src, [commands.sass]);
  };
};
