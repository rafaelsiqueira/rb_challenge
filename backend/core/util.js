'use strict';

var fs = require('fs');

exports.cleanupDirectory = function(path) {
    if(fs.existsSync(path)) {
        var files = fs.readdirSync(path);
        files.forEach(function (f, i) {
            var file = path + '/' + f;
            var stat = fs.statSync(file);

            if (stat.isFile()) {
                fs.unlinkSync(file);
            } else {
                fs.rmdirSync(file);
            }
        });
    }
};