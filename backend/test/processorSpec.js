'use strict';

var Config = require('../config');
var Processor = require('../core/processor');
var cleanupDirectory = require('../core/util').cleanupDirectory;

var path = require('path');
var fs = require('fs');
var q  = require('q');

describe('File processor', function(){

    var configOriginal = {
        pathToWatch: Config.pathToWatch,
        processedFilesPath: Config.processedFilesPath,
    };

    beforeEach(function(){
        Config.pathToWatch = path.join(__dirname + '/files');
        Config.processedFilesPath = path.join(__dirname + '/files/processed');
    });

    afterEach(function() {
        cleanupDirectory(Config.processedFilesPath);
        cleanupDirectory(Config.pathToWatch);

        Config.pathToWatch = configOriginal.pathToWatch;
        Config.processedFilesPath = configOriginal.processedFilesPath;
    });

    it('should transform a json data in xml', function() {
        var json = '{"nome": "Rafael Siqueira", "idade": 28}';
        var xml = Processor.transform(json);

        var expectedXML = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
                        + '<root>\n'
                        + '  <nome>Rafael Siqueira</nome>\n'
                        + '  <idade>28</idade>\n'
                        + '</root>';

        expect(xml).toBe(expectedXML);

    });

    it('should move a file to processed folder', function(done) {
        fs.writeFileSync(Config.pathToWatch + '/tmp.json', '{}');

        if(!fs.existsSync(Config.processedFilesPath)) {
            fs.mkdirSync(Config.processedFilesPath);
        }

        var moved = false;

        (function(){
            var deferred = q.defer();

            Processor.markAsProcessed(Config.pathToWatch + '/tmp.json', function(err){
                if(err) throw err;
                moved = true;
                deferred.resolve(moved);
            });

            return deferred.promise;

        })().then(function(){

            expect(fs.existsSync(Config.processedFilesPath + '/tmp.json')).toBe(true);
            done();

        });
    });
});