import gulp from 'gulp';
import runSequence from 'run-sequence';
import {tasks} from '../const';

gulp.task(tasks.CLIENT_BUILD_ALL, [
  tasks.CLIENT_BUILD_CSS,
  tasks.CLIENT_BUILD_JS,
  tasks.CLIENT_BUILD_VIEWS,
  tasks.CLIENT_BUILD_IMAGE,
  tasks.CLIENT_BUILD_TS
]);
