var gulp = require('gulp');
var browserSync = require('browser-sync').create();

var webserverTask = function(done) {
    browserSync.init({
        server: {
            baseDir: 'dist'
        },
    }, done);
};

gulp.task('webserver', webserverTask);
module.exports = webserverTask;