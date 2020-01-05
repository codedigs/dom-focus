var runSequence = require("run-sequence");
var notifier = require("node-notifier");

module.exports = function(config, commands) {
  return function() {
    var notify = true;
    if (typeof config.build !== "undefined") {
      if (typeof config.build.notify !== "undefined") {
        notify = config.build.notify;
      }
    }

    runSequence(commands.unbuild,
      commands.pug,
      commands.sass,
      // commands.scripts,
      [
        commands.build_views,
        commands.build_images,
        commands.build_fonts
      ],
      function() {
        if (typeof config.build !== "undefined") {
          if (typeof config.build.callback !== "undefined") {
            config.build.callback();
          }
        }

        if (notify) {
          notifier.notify({
            title: "DOM Focus",
            message: "Build completed!"
          });
        }
      }
    );
  };
};
