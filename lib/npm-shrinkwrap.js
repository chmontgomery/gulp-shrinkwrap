var gutil = require('gulp-util'),
  through = require('through2'),
  npm = require('npm'),
  path = require('path'),
  bluebird = require('bluebird'),
  _ = require('lodash'),
  fs = bluebird.promisifyAll(require('graceful-fs')),
  npmLoad = bluebird.promisify(npm.load),
  npmShrinkwrap = bluebird.promisify(function (opts, _cb) { // wrap, otherwise npm calls shrinkwrap prematurely
    npm.commands.shrinkwrap(opts, function callbackWrapper(err, pkinfo) {
      _cb(err, pkinfo);
    });
  });

function replacer(key, val) {
  if (key === 'resolved' && this.from && this.version) {
    return undefined;
  } else {
    return val;
  }
}

function _shrinkwrap(opts, file, cb) {
  var self = this,
    packageJsonPath = path.dirname(file.originalPath || file.path), // gulp.dest rewrites path, so used cached version
    conf = _.merge({_exit: true, prefix: packageJsonPath}, opts);

  npmLoad(conf)
    .then(function () {
      return npmShrinkwrap(opts);
    })
    .then(function (pkinfo) {
      var shrinkwrapFilePath = path.join(conf.prefix, 'npm-shrinkwrap.json');

      return fs.unlinkAsync(shrinkwrapFilePath)
        .then(function () {

          self.push(new gutil.File({
            path: 'npm-shrinkwrap.json',
            contents: new Buffer(JSON.stringify(pkinfo, replacer, 2))
          }));
          cb();

        });
    })
    .catch(function (err) {
      self.emit('error', new gutil.PluginError('gulp-shrinkwrap', err, {showStack: true}));
      return cb();
    });
}

function shrinkwrap(opts) {

  opts = opts || '';

  return through.obj(function (file, enc, cb) {

    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('gulp-shrinkwrap', 'Streaming not supported'));
      return cb();
    }

    _shrinkwrap.call(this, opts, file, cb);
  });
}

module.exports = shrinkwrap;