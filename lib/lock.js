'use strict';
var gutil = require('gulp-util'),
  through = require('through2');

function lockVersion(key, version) {
  if (version === '*') {
    throw new gutil.PluginError('gulp-shrinkwrap', 'Dependency "' + key + '" defined with "*". Must be explicit version in order to lock.');
  }
  return version.replace('~', '').replace('^', '');
}

function lockVersionDependencies(dependencies) {
  if (dependencies) {
    for (var key in dependencies) {
      if (dependencies.hasOwnProperty(key)) {
        dependencies[key] = lockVersion(key, dependencies[key]);
      }
    }
  }
}

function lock(opts) {

  opts = opts || {};
  opts.dependencies = (typeof opts.dependencies === 'undefined') ? true : opts.dependencies;
  opts.devDependencies = (typeof opts.devDependencies === 'undefined') ? true : opts.devDependencies;

  return through.obj(function (file, enc, cb) {

    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('gulp-shrinkwrap', 'Streaming not supported'));
      return cb();
    }

    var json = JSON.parse(file.contents.toString());

    if (opts.dependencies) lockVersionDependencies(json.dependencies);
    if (opts.devDependencies) lockVersionDependencies(json.devDependencies);

    file.contents = new Buffer(JSON.stringify(json, null, 2));
    file.originalPath = file.path; // save for later since gulp.dest will rewrite the path

    this.push(file);
    return cb();
  });
}

module.exports = lock;
module.exports.lockVersion = lockVersion;