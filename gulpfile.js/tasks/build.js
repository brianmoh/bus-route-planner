var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', function (done) {
    runSequence('clean', 'copy', 'css', 'tslint', 'typescript', done);
});
