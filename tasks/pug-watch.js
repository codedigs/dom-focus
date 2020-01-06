module.exports = function(gulp, config, commands) {
  return function() {
    gulp.watch(config.pug.src, [commands.pug]);
  };
};
