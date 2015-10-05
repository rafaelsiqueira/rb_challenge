'use strict';

var config = require('./config');

var Server = require('./server').Server;
var server = Server(config.serverPort, function(){
    console.log('Server running!');
});

var Processor = require('./core/processor');
var watcher = require('./core/watcher');
watcher.startWatcher(Processor.processFile);