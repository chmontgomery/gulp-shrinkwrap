'use strict';
var gulp = require('gulp'),
  shrinkwrap = require('../index.js'),
  path = require('path'),
  through = require('through2'),
  assert = require('assert');

describe('shrinkwrap', function () {

  it('should run full gulp-shrinkwrap pipeline', function (done) {

    var fixturePath = path.join(__dirname, 'fixtures/full');

    return gulp.src(path.join(fixturePath, 'package.json'))
      .pipe(shrinkwrap.lock({devDependencies: false}))
      .pipe(through.obj(function (file, enc, cb) {
        assert.equal(file.path, path.join(fixturePath, 'package.json'));
        this.push(file);
        cb();
      }))
      .pipe(gulp.dest(path.join(fixturePath, 'result')))
      .pipe(through.obj(function (file, enc, cb) {

        var self = this;

        assert.equal(file.path, path.join(fixturePath, 'result/package.json'));

        assert.deepEqual(JSON.parse(file.contents.toString()), {
          "name": "full",
          "version": "0.0.1",
          "dependencies": {
            "graceful-fs": "3.0.3"
          },
          "devDependencies": {
            "mocha": "~1.20.1"
          }
        });

        self.push(file);
        cb();

      }))
      .pipe(shrinkwrap())
      .pipe(through.obj(function (file, enc, cb) {
        assert.equal(file.path, 'npm-shrinkwrap.json');
        this.push(file);
        cb();
      }))
      .pipe(gulp.dest(path.join(fixturePath, 'result')))
      .pipe(through.obj(function (file, enc, cb) {

        assert.equal(file.path, path.join(fixturePath, 'result/npm-shrinkwrap.json'));
        assert.deepEqual(JSON.parse(file.contents.toString()), {
          "name": "full",
          "version": "0.0.1",
          "dependencies": {
            "graceful-fs": {
              "version": "3.0.3",
              "from": "graceful-fs@^3.0.5"
            }
          }
        });

        done();
      }));

  });

});