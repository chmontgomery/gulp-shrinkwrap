# [gulp](http://gulpjs.com/)-shrinkwrap [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

> Locks package.json dependencies to specific versions and runs npm shrinkwrap

## Install

```shell
npm install gulp-shrinkwrap --save-dev
```

## Usage

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

[npm-url]: https://npmjs.org/package/gulp-shrinkwrap
[npm-image]: http://img.shields.io/npm/v/gulp-shrinkwrape.svg
[travis-image]: https://travis-ci.org/chmontgomery/gulp-shrinkwrap.svg?branch=master
[travis-url]: https://travis-ci.org/chmontgomery/gulp-shrinkwrap