# [gulp](http://gulpjs.com/)-shrinkwrap

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