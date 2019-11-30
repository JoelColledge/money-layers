import gulp from 'gulp';

var HubRegistry = require('gulp-hub');
var hub = new HubRegistry(['build_tsc.js', 'copy.js']);
gulp.registry(hub);

gulp.task('server.build_all', gulp.series(
  'server.compile_tsc',
  'server.copy'
));
