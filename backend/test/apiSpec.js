'use strict';

var Config = require('../config');

var q = require('q');
var restify = require('restify');

describe('API Spec', function() {

    var client = restify.createStringClient({
        url: 'http://' + Config.apiEndpoint + ':' + Config.serverPort
    });

    var configOriginal = {
        connectionString: Config.connectionString
    };

    afterEach(function(){
        // limpa os registros criados
        client.del('/api/characters', function(){});
    });

    function createCharacter() {

        var success = false;

        var xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
            + '<root>\n'
            + '  <nome>Rafael Siqueira</nome>\n'
            + '  <idade>28</idade>\n'
            + '</root>';

        var deferred = q.defer();
        client.post('/api/characters', xml, function(err, req, response, data){
            if(err) throw err;

            var data = JSON.parse(data);

            success = data.success;
            deferred.resolve(success);
        });

        return deferred.promise;
    }

    it('Should receive a request in xml, convert to json and store in a mongo collection', function(done){
        createCharacter().then(function(success){
            expect(success).toBe(true);

            if(success) { done(); }
        });
    });

    it('Should list the characters', function(done){
        createCharacter().then(function(success){
            if(!success) { done(); }
            client.get('/api/characters', function(err, req, resp, data){
                data = JSON.parse(data);

                expect(data.length).toBe(1);
                expect(data[0].nome).toBe('Rafael Siqueira');
                done();
            });
        });
    });
});