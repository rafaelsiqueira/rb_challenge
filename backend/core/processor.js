'use strict';

var config  = require('../config');

var fs      = require('fs');
var http    = require('http');
var path    = require('path');
var xml2js  = require('xml2js');

var Processor = {

    processFile: function(file) {
        try {

            // processa individualmente cada arquivo
            fs.readFile(file, 'utf-8', function (err, contents) {
                try {

                    // para cada arquivo os seguintes passos serão executados:
                    // 1. Transformacao para xml
                    // 2. Upload para API
                    // 3. Mover para diretório de processados

                    Processor.upload(
                        Processor.transform(contents),
                        Processor.markAsProcessed.bind(null, file)
                    );

                } catch (e) {
                    console.error(e);
                    Processor.markAsProcessed(file);
                }
            });

        } catch (e) {
            console.log(e);
        }
    },

    transform: function(contents) {
        // 'infla' o json em um objeto para conversão posterior
        var character = JSON.parse(contents);
        return new xml2js.Builder().buildObject(character);
    },

    upload: function(xml, callback) {

        var request = http.request({
            host: config.apiEndpoint,
            path: '/api/characters',
            port: config.serverPort,
            method: 'POST',
            headers: {
                'Content-Type': 'application/xml',
                'Content-Length': Buffer.byteLength(xml)
            }

        }, function(result) {
            if(result.statusCode == 200) {
                callback();
            }
        });

        request.on('error', function(err) {
            console.error(err);
        });

        request.write(xml);
        request.end();
    },

    markAsProcessed: function (file, callback) {
        var fileName = path.basename(file);
        fs.rename(file, config.processedFilesPath + '/' + fileName, callback);
    }
};

module.exports = Processor;