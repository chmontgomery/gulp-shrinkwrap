# [gulp](http://gulpjs.com/)-shrinkwrap [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

> Locks [`package.json`](https://www.npmjs.org/doc/files/package.json.html#dependencies) dependencies to specific versions and runs [`npm shrinkwrap`](https://www.npmjs.org/doc/cli/npm-shrinkwrap.html)

## Install

```shell
npm install gulp-shrinkwrap --save-dev
```

## Usage

See [the API documentation](docs/API.md) for more details.

### shrinkwrap([options])

Given a `gulpfile.js`

```js
var gulp = require('gulp'),
  shrinkwrap = require('gulp-shrinkwrap');

gulp.task('shrinkwrap', function () {
  return gulp.src('package.json')
    .pipe(shrinkwrap())           // just like running `npm shrinkwrap`
    .pipe(gulp.dest('./'));       // writes newly created `npm-shrinkwrap.json` to the location of your choice
});
```

When running

```bash
$ gulp shrinkwrap
```

Then a [`npm-shrinkwrap.json`](https://www.npmjs.org/doc/cli/npm-shrinkwrap.html) file will generated at the
destination of your choice.

#### Important Notes

1. Without the call to `gulp.dest`, a `npm-shrinkwrap.json` file will not be created.
2. By default, `npm shrinkwrap` will be executed at the path where the supplied `package.json` file resides. If you want it run in a different context you must supply the `prefix` option.

### shrinkwrap.lock([options])

Given a `gulpfile.js`

```js
var gulp = require('gulp'),
  shrinkwrap = require('gulp-shrinkwrap');

gulp.task('shrinkwrap', function () {
  return gulp.src('package.json')
    .pipe(shrinkwrap.lock())      // modifies dependencies and devDependencies in package.json to specific versions 
    .pipe(gulp.dest('./'));       // writes newly modified `package.json`
});
```

And a `package.json`

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "dependencies": {
    "gulp-util": "^3.0.0",
    "nopt": "^3.0.1",
    "npmconf": "~1.1.5",
    "through2": "0.5.1"
  },
  "devDependencies": {
    "gulp": "^3.8.7",
    "mocha": "~1.21.3"
  }
}
```

When running

```bash
$ gulp shrinkwrap
```

Then the `package.json` file will be modified to be this

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "dependencies": {
    "gulp-util": "3.0.0",
    "nopt": "3.0.1",
    "npmconf": "1.1.5",
    "through2": "0.5.1"
  },
  "devDependencies": {
    "gulp": "3.8.7",
    "mocha": "1.21.3"
  }
}
```

### All together

```js
// gulpfile.js
var gulp = require('gulp'),
  shrinkwrap = require('gulp-shrinkwrap');

gulp.task('shrinkwrap', function () {
  return gulp.src('./custom/package.json')
    .pipe(shrinkwrap.lock({devDependencies: false}))  // locks dependencies only in `package.json` to specific versions 
    .pipe(gulp.dest('./new-location'))                // writes newly modified `package.json`
    .pipe(shrinkwrap())                               // just like running `npm shrinkwrap`
    .pipe(gulp.dest('./my-custom-dest'));             // writes newly created `npm-shrinkwrap.json` to the location of your choice
});
```

## Always keep your shrinkwrap up to date

You'll want to update your `npm-shrinkwrap.json` every time you install a new dependency.
An easy way to do this automatically is via a `pre-commit` [git hook](https://www.kernel.org/pub/software/scm/git/docs/githooks.html)

```shell
#!/bin/sh
#
# Run gulp shrinkwrap on every commit so that we always have the most recent
# dependencies checked in.
 
npm prune > /dev/null
error=$(gulp shrinkwrap)
if [[ $? -ne 0 ]] ; then
  echo "$error"
  exit 1
fi
 
# If modified adds file(s) and includes them in commit.
git add package.json
git add npm-shrinkwrap.json
```

## License

[MIT](http://opensource.org/licenses/MIT) © [Chris Montgomery](http://www.chrismontgomery.info/)

[npm-url]: https://npmjs.org/package/gulp-shrinkwrap
[npm-image]: http://img.shields.io/npm/v/gulp-shrinkwrap.svg
[travis-image]: https://travis-ci.org/chmontgomery/gulp-shrinkwrap.svg?branch=master
[travis-url]: https://travis-ci.org/chmontgomery/gulp-shrinkwrap