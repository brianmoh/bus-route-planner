var gutil = require('gulp-util');

module.exports = function(errorObject, callback) {
  gutil.log(errorObject.toString());
  if (typeof this.emit === 'function') {
      this.emit('end')
  }
}
