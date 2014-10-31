var gulp = require('gulp'),
  shrinkwrap = require('./index.js');

gulp.task('shrinkwrap', function () {
  return gulp.src('package.json')
    .pipe(shrinkwrap())     // runs `npm shrinkwrap`
    .pipe(gulp.dest('./')); // writes newly modified `package.json`
});