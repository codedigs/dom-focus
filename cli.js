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
  this.version = "1.0";

  if (!this.hasConfigFile()) {
    this.initCommand();
  } else {
    // this.sassCommand();
  }

  this.executeCommand();
}

Cli.prototype = {
  hasConfigFile: function() {
    return fse.existsSync(process.cwd() + "/config.js");
  },

  initCommand: function() {
    program
      .command('init')
      .description("Create file config.js.")
      .action(function() {
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
      .action(function () {
        app.runGulpCommand(commands.sass);
      });
  },

  executeCommand: function() {
    program
      .version(this.version, "-v, --version")
      .arguments('<cmd>')
      .action(function(cmd) {
        varCmd = cmd;
      });

    program.parse(process.argv);

    if (typeof varCmd === "undefined") {
      // console.error("No command specified. Use --help to display available commands.");

      var argvClone = process.argv.slice(0); // clone
      argvClone.push("-h");

      program.parse(argvClone);
    } else if (!(varCmd in commands)) {
      console.error("\"" + varCmd + "\" is not a valid command. Use --help to display available commands.");
    }
  }
};

new Cli();
