import gulp from 'gulp';

gulp.task('server.build_all', [
  'server.compile_tsc',
  'server.copy'
]);
