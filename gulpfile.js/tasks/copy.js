var gulp = require('gulp');
var merge = require('merge-stream');
var handleErrors = require('../utils/handle-errors');

var copyTask = function () {
    var assets = [
        // HTML
        {
            src: 'src/**/*.html',
            dest: ''
        },
        // JS
        {
            src: 'src/js/**/*.js',
            dest: 'js'
        },
        // Images
        {
            src: 'src/img/**/*',
            dest: 'img'
        },
        // Libs
        {
            src: 'node_modules/core-js/client/shim.min.js',
            dest: 'js/lib'
        }, {
            src: 'node_modules/zone.js/dist/zone*.{js,map}',
            dest: 'js/lib'
        }, {
            src: 'node_modules/reflect-metadata/Reflect.js',
            dest: 'js/lib'
        }, {
            src: 'node_modules/systemjs/dist/system.src.js',
            dest: 'js/lib'
        }, {
            src: 'node_modules/@angular/**/*',
            dest: 'js/lib/@angular'
        }, {
            src: 'node_modules/rxjs/**/*',
            dest: 'js/lib/rxjs'
        }, {
            src: 'node_modules/leaflet/dist/leaflet.js',
            dest: 'js/lib'
        }
    ];
    var mergedStreams = merge();
    assets.forEach(function (asset) {
        mergedStreams.add(gulp.src(asset.src).pipe(gulp.dest('dist/' + asset.dest)).on('error', handleErrors));
    });
    return mergedStreams;
};

gulp.task('copy', copyTask);
module.exports = copyTask;
