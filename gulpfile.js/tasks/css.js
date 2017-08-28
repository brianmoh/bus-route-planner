var gulp = require('gulp');
var sass = require('gulp-sass');
var handleErrors = require('../utils/handle-errors');

var cssTask = function () {
    return gulp.src('src/scss/**/*.{sass,scss,css}')
        .pipe(sass())
        .pipe(gulp.dest('dist/css')).on('error', handleErrors);
};

gulp.task('css', cssTask);
module.exports = cssTask;
