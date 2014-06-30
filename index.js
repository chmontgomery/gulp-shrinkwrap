'use strict';
var gutil = require('gulp-util'),
  through = require('through2'),
  npm = require('npm'),
  npmconf = require('npmconf'),
  nopt = require('nopt'),
  path = require('path'),
  fs = require('fs');

function hardVersion(version) {
  return version.replace('~', '').replace('^', '');
}

function hardVersionDependencies(dependencies) {
  if (dependencies) {
    for (var key in dependencies) {
      if (dependencies.hasOwnProperty(key)) {
        dependencies[key] = hardVersion(dependencies[key]);
      }
    }
  }
}

function fix(file) {
  var json = JSON.parse(file.contents.toString());

  hardVersionDependencies(json.dependencies);
  hardVersionDependencies(json.devDependencies);

  file.contents = new Buffer(JSON.stringify(json));
}

function replacer(key, val) {
  if (key === 'resolved' && this.from && this.version) {
    return undefined;
  } else {
    return val;
  }
}

function npmShrinkwrap(file, cb) {
  var self = this,
    conf = nopt(npmconf.defs.types, npmconf.defs.shorthands);

  conf._exit = true;
  npm.load(null, function (loadErr) {
    if (loadErr) {
      self.emit('error', new gutil.PluginError('gulp-shrinkwrap', 'Failed to load npm sdk'));
      return cb();
    }

    npm.commands.shrinkwrap('', function (err, pkinfo) {
      if (err) {
        self.emit('error', new gutil.PluginError('gulp-shrinkwrap', 'Failed to run npm shrinkwrap'));
        return cb();
      }

      file.shrinkwrap = pkinfo;

      var shrinkwrapFileName = path.join(process.cwd(), 'npm-shrinkwrap.json');
      var shrinkwrapData = require(shrinkwrapFileName);

      fs.writeFile(shrinkwrapFileName, JSON.stringify(shrinkwrapData, replacer, 2), function (err) {
        if (err) {
          self.emit('error', new gutil.PluginError('gulp-shrinkwrap', 'Failed to update npm-shrinkwrap.json'));
          return cb();
        }

        self.push(file);
        cb();

      });

    });

  });
}

module.exports = function () {

  function shrinkwrap(file, enc, cb) {
    var self = this;

    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('gulp-shrinkwrap', 'Streaming not supported'));
      return cb();
    }

    fix.call(this, file);
    npmShrinkwrap.call(this, file, cb);
  }

  return through.obj(shrinkwrap);
};