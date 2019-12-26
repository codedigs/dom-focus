#!/usr/bin/env node
var VERSION = "1.0";

var fse = require('fs-extra');
var program = require("commander");

var app = require("./app");
var commands = app.commands;

/**
 * Global variable used:
 * - fse
 * - program
 * - commands
 */
function Cli() {
  // hierarchy is important
  if (!this.hasConfigFile()) {
    this.initCommand();
  } else {
    this.sassCommand();
  }

  this.executeCommand();
}

Cli.prototype = {
  hasConfigFile: function() {
    return fse.existsSync(process.cwd() + "/config.js");
  },

  initCommand: function() {
    var _this = this;

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

        process.exit(1);
      });
  },

  sassCommand: function() {
    program
      .command(commands.sass)
      .description("Compile sass files.")
      .action(function () {
        app.runGulpCommand(commands.sass);
        process.exit(1);
      });
  },

  executeCommand: function() {
    program
      .version(VERSION, "-v, --version")
      .arguments('<cmd>')
      .action(function(cmd) {
        varCmd = cmd;
      });

    program.parse(process.argv);

    if (typeof varCmd === "undefined") {
      var argv = process.argv.slice(0); // clone
      argv.push("-h");
      program.parse(argv);
    } else if (!(varCmd in commands)) {
      console.error("\"" + varCmd + "\" is not a valid command. Use --help to display commands.");
    }

    process.exit(1);
  }
};

new Cli();
