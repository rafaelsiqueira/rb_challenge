'use strict';

var config     = require('../config');
var mongoose   = require('mongoose');

mongoose.connect(config.connectionString);

module.exports = mongoose;