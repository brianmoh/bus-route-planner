var gulp = require('gulp');
var tslint = require('gulp-tslint');
var handleErrors = require('../utils/handle-errors');

var tslintTask = function () {
    return gulp.src('src/**/*.ts')
        .pipe(tslint({
            configuration: 'tslint.json'
        }))
        .pipe(tslint.report())
        .on('error', handleErrors);
};

gulp.task('tslint', tslintTask);
module.exports = tslintTask;
