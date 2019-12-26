#!/usr/bin/env node

var fse = require('fs-extra'),
  program = require("commander");

if (!fse.existsSync(process.cwd() + "/config.js")) {
  // init config command
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

  program.parse(process.argv);
  process.exit(1);
}

console.log("Bum panot");
