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
    this.sassCommand();
    this.sassWatchCommand();
    this.buildViewCommand();
  }

  this.executeCommand();
}

Cli.VERSION = "1.0";
Cli.commandUsed = null;

Cli.prototype = {
  hasConfigFile: function() {
    return fse.existsSync(process.cwd() + "/config.js");
  },

  initCommand: function() {
    program
      .command(commands.init)
      .description("Create file config.js.")
      .action(function() {
        Cli.commandUsed = commands.init; // need of executeCommand method

        try {
          fse.copySync(__dirname + "/config.js.example", process.cwd() + "/config.js");
          console.log("Successfully created file config.js.");
        } catch (err) {
          console.error(err);
        }
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

  buildViewCommand: function() {
    program
      .command(commands.build_views)
      .description("Build view with minifying css and js files.")
      .action(function() {
        Cli.commandUsed = commands.build_views; // need of executeCommand method

        app.runGulpCommand(commands.build_views);
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
      var invalidCommand = Object.values(commands).indexOf(Cli.commandUsed) === -1;

      if (invalidCommand) {
        console.error("\"" + Cli.commandUsed + "\" is not a valid command. Use --help to display available commands.");

        process.exit(1);
      }
    }
  }
};

new Cli();
