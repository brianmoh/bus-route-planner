var gulp = require('gulp');
var del = require('del');

var cleanTask = function() {
  return del('dist/**/*');
};

gulp.task('clean', cleanTask);
module.exports = cleanTask;
