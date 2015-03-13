var gulp = require('gulp'),
  del = require('del'),
  shrinkwrap = require('./index.js');

gulp.task('clean:shrinkwrap', function (cb) {
  del(['./npm-shrinkwrap.json'], cb);
});

gulp.task('shrinkwrap', ['clean:shrinkwrap'], function () {
  return gulp.src('package.json')
    .pipe(shrinkwrap.lock({devDependencies: false}))  // locks only dependencies in package.json to specific versions
    .pipe(gulp.dest('./'))                            // writes newly modified `package.json`
    .pipe(shrinkwrap())                               // runs `npm shrinkwrap`
    .pipe(gulp.dest('./'));                           // writes newly modified `npm-shrinkwrap.json`
});

gulp.task('default', ['shrinkwrap']);