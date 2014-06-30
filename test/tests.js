'use strict';
var gutil = require('gulp-util'),
  shrinkwrap = require('../index.js'),
  assert = require('assert'),
  fs = require('fs'),
  path = require('path');

it('should modify package.json and create npm-shrinkwrap.json', function (cb) {
  var stream = shrinkwrap();

  stream.on('data', function (file) {
    assert.deepEqual(JSON.parse(file.contents.toString()), {
      "name": "gulp-nice-package",
      "version": "0.0.0",
      "author": "Chris Montgomery",
      "description": "",
      "keywords": ["gulp"],
      "main": "index.js",
      "scripts": {
        "test": "mocha"
      },
      "license": "MIT",
      "dependencies": {
        "package-json-validator": "0.5.6"
      },
      "devDependencies": {
        "mocha": "1.20.1"
      }
    });


    assert.ok(file.shrinkwrap.dependencies);

    fs.readFile(path.join(__dirname, '../npm-shrinkwrap.json'), function (err, data) {
      if (err) cb(err);

      var actual = JSON.parse(data);

      for (var key in file.shrinkwrap.dependencies) {
        assert.ok(actual.dependencies[key].version);
        assert.ok(actual.dependencies[key].from);
        assert.ok(!actual.dependencies[key].resolved);
      }

      cb();

    });

  });

  stream.write(new gutil.File({
    contents: new Buffer(JSON.stringify(require('./fixtures/package-with-non-specific.json')))
  }));
});