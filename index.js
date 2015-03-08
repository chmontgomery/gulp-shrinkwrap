'use strict';
var lock = require('./lib/lock'),
  shrinkwrap = require('./lib/npm-shrinkwrap');

module.exports = shrinkwrap;
module.exports.lock = lock;