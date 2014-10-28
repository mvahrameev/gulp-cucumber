'use strict';

var es = require('event-stream');
var spawn = require('child_process').spawn;

var winPath = 'cucumber-js';
var unixPath = 'cucumber.js';

var cucumber = function(options) {
    var runOptions = [];
    var binPath;

    if (options.support) {
        runOptions.push('-r');
        runOptions.push(options.support);
    }

    if (options.steps) {
        runOptions.push('-r');
        runOptions.push(options.steps);
    }

    runOptions.push('--format');
    runOptions.push(options.format || 'pretty');

    if (process.platform === 'win32') {
        binPath = winPath;
    } else {
        binPath = unixPath;
    }

    var run = function(argument, callback) {
        var filename = argument.path;

        if (filename.indexOf('.feature') === -1) {
            return callback();
        }

        var processOptions = runOptions.slice(0);
        processOptions.push(filename);

        var cli = spawn(binPath, processOptions);

        var output = [];

        cli.stdout.on('data', function(data) {
            output.push(data);
        });

        cli.on('exit', function() {
            var data = Buffer.concat(output).toString();
            process.stdout.write(data.trim());
        });

        return callback();
    };

    return es.map(run);
};

module.exports = cucumber;
