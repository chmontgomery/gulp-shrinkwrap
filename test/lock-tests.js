'use strict';
var lock = require('../index.js').lock,
  gutil = require('gulp-util'),
  assert = require('assert');

describe('lock', function () {

  describe('lockVersion', function () {

    it('should leave alone if already locked', function () {
      var versionNum = "3.0.3";
      assert.equal(lock.lockVersion('my-dep', versionNum), versionNum);
    });

    it('should modify if contains ~', function () {
      var versionNum = "~3.0.3";
      assert.equal(lock.lockVersion('my-dep', versionNum), "3.0.3");
    });

    it('should modify if contains ^', function () {
      var versionNum = "^3.0.3";
      assert.equal(lock.lockVersion('my-dep', versionNum), "3.0.3");
    });

    it('should throw error if just *', function () {
      var versionNum = "*";
      assert.throws(function () {
        lock.lockVersion('my-dep', versionNum)
      });
    });

  });

  describe('lock', function () {

    it('should lock to specific version', function (done) {

      var stream = lock();

      stream.on('data', function (file) {
        assert.deepEqual(JSON.parse(file.contents.toString()), {
          "name": "package-with-non-specific",
          "version": "0.0.1",
          "dependencies": {
            "graceful-fs": "3.0.3"
          },
          "devDependencies": {
            "mocha": "2.2.0"
          }
        });

        done();
      });

      stream.write(new gutil.File({
        path: 'package.json',
        contents: new Buffer(JSON.stringify(require('./fixtures/package-with-non-specific/package.json')))
      }));

    });

    it('should skip devDependencies', function (done) {

      var stream = lock({
        devDependencies: false
      });

      stream.on('data', function (file) {
        assert.deepEqual(JSON.parse(file.contents.toString()), {
          "name": "package-with-non-specific",
          "version": "0.0.1",
          "dependencies": {
            "graceful-fs": "3.0.3"
          },
          "devDependencies": {
            "mocha": "~2.2.0"
          }
        });

        done();
      });

      stream.write(new gutil.File({
        path: 'package.json',
        contents: new Buffer(JSON.stringify(require('./fixtures/package-with-non-specific/package.json')))
      }));

    });

    it('should skip dependencies', function (done) {

      var stream = lock({
        dependencies: false
      });

      stream.on('data', function (file) {
        assert.deepEqual(JSON.parse(file.contents.toString()), {
          "name": "package-with-non-specific",
          "version": "0.0.1",
          "dependencies": {
            "graceful-fs": "^3.0.3"
          },
          "devDependencies": {
            "mocha": "2.2.0"
          }
        });

        done();
      });

      stream.write(new gutil.File({
        path: 'package.json',
        contents: new Buffer(JSON.stringify(require('./fixtures/package-with-non-specific/package.json')))
      }));

    });

    it('should skip both', function (done) {

      var stream = lock({
        devDependencies: false
      });

      stream.on('data', function (file) {
        assert.deepEqual(JSON.parse(file.contents.toString()), {
          "name": "package-with-non-specific",
          "version": "0.0.1",
          "dependencies": {
            "graceful-fs": "3.0.3"
          },
          "devDependencies": {
            "mocha": "~2.2.0"
          }
        });

        done();
      });

      stream.write(new gutil.File({
        path: 'package.json',
        contents: new Buffer(JSON.stringify(require('./fixtures/package-with-non-specific/package.json')))
      }));

    });

  });


});