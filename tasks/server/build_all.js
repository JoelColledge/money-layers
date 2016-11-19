import gulp from 'gulp';
import runSequence from 'run-sequence';
import {tasks} from '../const';

gulp.task('server.build_all', [
  'server.compile_tsc',
  'server.copy'
]);
