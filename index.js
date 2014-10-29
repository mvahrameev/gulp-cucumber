'use strict';

var CucumberCli = require('cucumber').Cli;

module.exports = function(options, done) {
    var runArgs = [];

    if (options.support) {
        runArgs.push('--require');
        runArgs.push(options.support);
    }

    if (options.steps) {
        runArgs.push('--require');
        runArgs.push(options.steps);
    }

    runArgs.push('--format');
    runArgs.push(options.format || 'pretty');

    runArgs.push(options.features || 'features');

    var cli = CucumberCli(runArgs);
    cli.run(function (succeeded) {
        done(succeeded ? null : new Error('Cucumber is failed'));
    });
};