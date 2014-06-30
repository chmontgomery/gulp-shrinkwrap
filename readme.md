# [gulp](http://gulpjs.com/)-shrinkwrap

> Locks package.json dependencies to specific versions and runs npm shrinkwrap

## Usage

```js
// gulpfile.js
var gulp = require('gulp');
var shrinkwrap = require('gulp-shrinkwrap');

gulp.task('shrinkwrap', function () {
  return gulp.src('package.json')
    .pipe(shrinkwrap());
});
```