# [gulp](http://gulpjs.com/)-shrinkwrap [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

> Locks [`package.json`](https://www.npmjs.org/doc/files/package.json.html#dependencies) dependencies to specific versions and runs [`npm shrinkwrap`](https://www.npmjs.org/doc/cli/npm-shrinkwrap.html)

## Install

```shell
npm install gulp-shrinkwrap --save-dev
```

## Usage

Given

```js
// gulpfile.js
var gulp = require('gulp'),
  shrinkwrap = require('gulp-shrinkwrap');

gulp.task('shrinkwrap', function () {
  return gulp.src('package.json')
    .pipe(shrinkwrap())
    .pipe(gulp.dest('./'));
});
```

Running

```bash
$ gulp shrinkwrap
```

Turns a `package.json` like this

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "dependencies": {
    "gulp-util": "^3.0.0",
    "nopt": "^3.0.1",
    "npmconf": "~1.1.5",
    "through2": "^0.5.1"
  },
  "devDependencies": {
    "gulp": "^3.8.7",
    "mocha": "~1.21.3"
  }
}
```

into this

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

and also generates a [`npm-shrinkwrap.json`](https://www.npmjs.org/doc/cli/npm-shrinkwrap.html) file

[npm-url]: https://npmjs.org/package/gulp-shrinkwrap
[npm-image]: http://img.shields.io/npm/v/gulp-shrinkwrap.svg
[travis-image]: https://travis-ci.org/chmontgomery/gulp-shrinkwrap.svg?branch=master
[travis-url]: https://travis-ci.org/chmontgomery/gulp-shrinkwrap