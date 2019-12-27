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
  this.commandUsed = null;

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
    var _this = this;

    program
      .command(commands.sass)
      .description("Compile sass files.")
      .action(function () {
        _this.commandUsed = commands.sass; // need of executeCommand method

        app.runGulpCommand(commands.sass);
      });
  },

  executeCommand: function() {
    var _this = this;

    program
      .version(this.version, "-v, --version")
      .arguments('<cmd>')
      .action(function(cmd) {
        _this.commandUsed = cmd;
      });

    program.parse(process.argv);

    if (_this.commandUsed === null) {
      var argvClone = process.argv.slice(0); // clone
      argvClone.push("-h");
      program.parse(argvClone);

      process.exit(1);
    } else if (!(_this.commandUsed in commands)) {
      console.error("\"" + _this.commandUsed + "\" is not a valid command. Use --help to display available commands.");
      process.exit(1);
    }
  }
};

new Cli();
