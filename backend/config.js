'use strict';

var path = require('path');

var Config = {

    serverPort: 3000,
    apiEndpoint: 'localhost',

    pathToWatch: path.join(__dirname, '/files'),

    processedFilesPath: path.join(__dirname, '/files/processed'),

    connectionString: 'mongodb://localhost:27017/rbchallenge'

};

module.exports = Config;