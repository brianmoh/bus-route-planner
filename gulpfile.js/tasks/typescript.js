var gulp = require('gulp');
var gulpif = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var handleErrors = require('../utils/handle-errors');

var tsProject = ts.createProject('tsconfig.json');

var typescriptTask = function () {
    var tsResult = gulp.src('src/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .on('error', handleErrors)
    return tsResult.js.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
        .on('error', handleErrors);
};

gulp.task('typescript', typescriptTask);
module.exports = typescriptTask;
