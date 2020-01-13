#!/usr/bin/env node

var fse = require('fs-extra');
var program = require("commander");

var app = require("./app");
var commands = app.commands;

/**
 * Global variable used:
 * - commands
 * - fse
 * - program
 */
function Cli() {
  if (!this.hasConfigFile()) {
    this.initCommand();
  } else {
    this.pugCommand();
    this.pugWatchCommand();
    this.sassCommand();
    this.sassWatchCommand();
    this.jsCommand();
    this.jsWatchCommand();
    this.buildViewsCommand();
    this.buildImagesCommand();
    this.buildFontsCommand();
    this.buildCommand();
    this.unbuildCommand();

    this.serveCommand();
  }

  this.executeCommand();
}

Cli.VERSION = "1.3.0";
Cli.commandUsed = null;

Cli.prototype = {
  hasConfigFile: function() {
    return fse.existsSync(process.cwd() + "/dfconfig.js");
  },

  initCommand: function() {
    program
      .command(commands.init)
      .description("Create file dfconfig.js.")
      .action(function() {
        Cli.commandUsed = commands.init; // need of executeCommand method

        try {
          fse.copySync(__dirname + "/dfconfig.js.example", process.cwd() + "/dfconfig.js");
          console.log("Successfully created file dfconfig.js.");
        } catch (err) {
          console.error(err);
        }
      });
  },

  pugCommand: function() {
    program
      .command(commands.pug)
      .description("Compile pug files.")
      .action(function() {
        Cli.commandUsed = commands.pug; // need of executeCommand method

        app.runGulpCommand(commands.pug);
      });
  },

  pugWatchCommand: function() {
    program
      .command(commands.pug_watch)
      .description("Compile pug files every changes of it.")
      .action(function() {
        Cli.commandUsed = commands.pug_watch; // need of executeCommand method

        app.runGulpCommand(commands.pug_watch);
      });
  },

  sassCommand: function() {
    program
      .command(commands.sass)
      .description("Compile sass files.")
      .action(function() {
        Cli.commandUsed = commands.sass; // need of executeCommand method

        app.runGulpCommand(commands.sass);
      });
  },

  sassWatchCommand: function() {
    program
      .command(commands.sass_watch)
      .description("Compile sass files every changes of it.")
      .action(function() {
        Cli.commandUsed = commands.sass_watch; // need of executeCommand method

        app.runGulpCommand(commands.sass_watch);
      });
  },

  jsCommand: function() {
    program
      .command(commands.js)
      .description("Compile js files.")
      .action(function() {
        Cli.commandUsed = commands.js; // need of executeCommand method

        app.runGulpCommand(commands.js);
      });
  },

  jsWatchCommand: function() {
    program
      .command(commands.js_watch)
      .description("Compile js files every changes of it.")
      .action(function() {
        Cli.commandUsed = commands.js_watch; // need of executeCommand method

        app.runGulpCommand(commands.js_watch);
      });
  },

  buildViewsCommand: function() {
    program
      .command(commands.build_views)
      .description("Build view with minifying css and js files.")
      .action(function() {
        Cli.commandUsed = commands.build_views; // need of executeCommand method

        app.runGulpCommand(commands.build_views);
      });
  },

  buildImagesCommand: function() {
    program
      .command(commands.build_images)
      .description("Optimize image files.")
      .action(function () {
        Cli.commandUsed = commands.build_images; // need of executeCommand method

        app.runGulpCommand(commands.build_images);
      });
  },

  buildFontsCommand: function() {
    program
      .command(commands.build_fonts)
      .description("Flatten font files.")
      .action(function () {
        Cli.commandUsed = commands.build_fonts; // need of executeCommand method

        app.runGulpCommand(commands.build_fonts);
      });
  },

  buildCommand: function() {
    program
      .command(commands.build)
      .description("\n\tRun commands in this order: \n\t* `unbuild` \n\t* `sass` \n\t* `scripts` \n\t* `build:views`, `build:images` and * `build:fonts` in parallel.")
      .action(function () {
        Cli.commandUsed = commands.build; // need of executeCommand method

        app.runGulpCommand(commands.build);
      });
  },

  unbuildCommand: function() {
    program
      .command(commands.unbuild)
      .description("Remove output files(dist directory).")
      .action(function () {
        Cli.commandUsed = commands.unbuild; // need of executeCommand method

        app.runGulpCommand(commands.unbuild);
      });
  },

  serveCommand: function() {
    program
      .command(commands.serve)
      .option("--watch", "File type to be watched. Comma separated value.")
      .description("Run the application.")
      .action(function () {
        Cli.commandUsed = commands.serve; // need of executeCommand method

        app.runGulpCommand(commands.serve);
      });
  },

  executeCommand: function() {
    program
      .version(Cli.VERSION, "-v, --version")
      .arguments('<cmd>')
      .action(function(cmd) {
        Cli.commandUsed = cmd;
      });

    program.parse(process.argv);

    if (Cli.commandUsed === null) {
      var argvClone = process.argv.slice(0); // clone
      argvClone.push("-h");
      program.parse(argvClone);

      process.exit(1);
    } else {
      var invalidCommand = !Object.values(commands).includes(Cli.commandUsed);

      if (invalidCommand) {
        console.error("\"" + Cli.commandUsed + "\" is not a valid command. Use --help to display available commands.");

        process.exit(1);
      }
    }
  }
};

new Cli();
