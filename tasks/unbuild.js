var del = require("del");
var notifier = require("node-notifier");

module.exports = function(gulp, plugins, config) {
  return function() {
    var notify = true;
    if (typeof config.unbuild !== "undefined") {
      if (typeof config.unbuild.notify !== "undefined") {
        notify = config.unbuild.notify;
      }
    }

    del(config.build_views.dest).then(function(paths) {
      if (paths.length > 0) {
        if (typeof config.unbuild !== "undefined") {
          if (typeof config.unbuild.callback !== "undefined") {
            config.unbuild.callback();
          }
        }

        if (notify) {
          notifier.notify({
            title: "DOM Focus",
            message: "Remove output files completed!"
          });
        }
      }
    });
  };
};
