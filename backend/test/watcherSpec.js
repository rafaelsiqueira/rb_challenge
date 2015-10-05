'use strict';

var path = require("path");
var q = require('q');
var fs = require('fs');

var Config = require('../config');
var watcher = require('../core/watcher');
var cleanupDirectory = require('../core/util').cleanupDirectory;


describe('Watcher Spec', function(){

    var configOriginal = {
        pathToWatch: Config.pathToWatch
    };

    beforeEach(function(){
        Config.pathToWatch = path.join(__dirname + '/files');
    });

    afterEach(function() {

        // limpa o diretório ao final de cada teste
        cleanupDirectory(Config.pathToWatch);

        Config.pathToWatch = configOriginal.pathToWatch;

    });

    it('Should detect files in a specific directory', function(done) {

        var detected = false;

        var o;
        (function() {
            var deferred = q.defer();

            o = watcher.startWatcher(function(file){
                detected = true;
                deferred.resolve(detected);
            });

            return deferred.promise;

        })().then(function(){

            o.unwatch(Config.pathToWatch);
            o.close();

            expect(detected).toBe(true);

            done();

        });

        fs.writeFileSync(Config.pathToWatch + '/tmp.json', '{}');
        var files = fs.readdirSync(Config.pathToWatch);
        expect(files.length).toBe(1);

    });

});