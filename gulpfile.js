var gulp = require('gulp'),
  shrinkwrap = require('./index.js');

gulp.task('shrinkwrap', function () {
  return gulp.src('package.json')
    .pipe(shrinkwrap())
    .pipe(gulp.dest('./'));
});