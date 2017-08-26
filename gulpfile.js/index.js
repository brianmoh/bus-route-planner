'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var requireDir = require('require-dir');
var browserSync = require('browser-sync').create();

requireDir('./tasks', { recurse: true });

gulp.task('default', function (done) {
    runSequence('build', 'webserver', function () {
        gulp.watch('src/**/*.scss',
            function () {
                runSequence('css', function () {
                    // Reload doesn't work for some reason...need to figure out why.
                    browserSync.reload();
                });
            }
        );

        gulp.watch(['src/**/*', '!src/scss/**/*'],
            function () {
                runSequence('copy', 'tslint', 'typescript', function () {
                    browserSync.reload();
                });
            }
        );
        done();
    });
});
