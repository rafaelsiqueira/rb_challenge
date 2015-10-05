'use strict';

var watcher     = require('chokidar');
var config      = require('../config');

exports.startWatcher = function(onFile) {

    // inicializa o monitoramento do diretório pré-configurado

    return watcher
        .watch(config.pathToWatch, {
            depth: 0,            // monitora apenas a raiz do diretório configurado
            ignored: /[\\/]\./   // ignora dot files
        })
        .on('add', onFile)       // monitora o evento 'add', quando um novo arquivo é adicionado
        .on('change', onFile);   // monitora o evento 'change', quando um arquivo é modificado

};