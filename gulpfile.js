var gulp = require('gulp');
var tslint = require('gulp-tslint');
var sass = require('gulp-sass');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var browserSync = require('browser-sync').create();
var merge = require('merge-stream');

var tsProject = ts.createProject('tsconfig.json');

gulp.task('clean', function () {
    return del(['dist']);
});

gulp.task('copy', function () {
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
        }
    ];
    var mergedStreams = merge();
    assets.forEach(function (asset) {
        mergedStreams.add(gulp.src(asset.src).pipe(gulp.dest('dist/' + asset.dest)));
    });
    return mergedStreams;
});

gulp.task('css', function () {
    return gulp.src('src/scss/**/*.{sass,scss,css}')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('tslint', function () {
    return gulp.src('src/**/*.ts')
        .pipe(tslint({
            configuration: 'tslint.json'
        }))
        .pipe(tslint.report());
});

gulp.task('typescript', function () {
    var tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .once('error', function () {
            this.once('finish', () => {
                console.log('Failed compilation...');
                process.exit(1);
            })
        })
    return tsResult.js.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/app'));
});

gulp.task('browsersync', function () {
    browserSync.init({
        server: {
            baseDir: 'dist'
        },
    })
});

/**
 * Watch for changes in TypeScript, HTML and CSS files.
 */
gulp.task('watch', function () {
    gulp.watch(["src/**/*.ts"], ['compile']).on('change', function (e) {
        console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
    });
    gulp.watch(["src/**/*.html", "src/**/*.css"], ['resources']).on('change', function (e) {
        console.log('Resource file ' + e.path + ' has been changed. Updating.');
    });
});

gulp.task('default', ['clean', 'copy', 'css', 'tslint', 'typescript', 'browsersync', 'watch']);
