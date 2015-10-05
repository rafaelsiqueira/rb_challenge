'use strict';

var restify  = require('restify');
var xml2js   = require('xml2js');

var connection  = require('../core/connection');
var Character   = require('./model/Character');

var CharacterList       = function(request, response, next) {
    Character.find({}, function(err, result) {
        if(err) {
            response.status(500);
            return;
        }
        response.send(result);
    });
    return next();
};

var Cleanup             = function(request, response, next) {
    Character.remove({}, function(err){
        CharacterList(request, response, next);
    });
}

var CharacterCreate     = function(request, response, next) {

    new xml2js.Parser({explicitArray: false}).parseString(request.body,
        function(err, result){
            if(err) {
                throw err;
            }

            var character = new Character(result.root);
            character.save(function(err){
                if(err) throw err;
            });
        }
    );

    response.send({'success': true});

    return next();
};

var Server = function(port, callback) {

    var s = restify.createServer({
        version: '1.0.0'
    });

    s.use(restify.CORS());
    s.use(restify.bodyParser());

    s.get('/api/characters', CharacterList);
    s.post('/api/characters', CharacterCreate);
    s.del('/api/characters', Cleanup);

    s.listen(port, callback);

    return s;

};

module.exports = {'Server': Server};