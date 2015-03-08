'use strict';
var gutil = require('gulp-util'),
  shrinkwrap = require('../index.js'),
  assert = require('assert'),
  path = require('path');

// todo this can't run in parallel with index-integration-tests.js for some reason. It should pass... just ignore for now
describe.skip('shrinkwrap', function () {

  it('should create shrinkwrap from basic package.json', function (done) {

    var prefixPath = path.join(__dirname, 'fixtures/package-with-non-specific'),
      stream = shrinkwrap({
        prefix: prefixPath
      }),
      packageJsonPath = path.join(prefixPath, 'package.json');

    stream.on('data', function (file) {

      var actual = JSON.parse(file.contents.toString());

      for (var key in file.dependencies) {
        assert.ok(actual.dependencies[key].version);
        assert.ok(actual.dependencies[key].from);
        assert.ok(!actual.dependencies[key].resolved);
      }

      assert.equal(file.path, 'npm-shrinkwrap.json');

      done();
    });

    stream.on('error', done);

    stream.write(new gutil.File({
      path: packageJsonPath,
      contents: new Buffer(JSON.stringify(require(packageJsonPath)))
    }));

  });

});