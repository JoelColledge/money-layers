
import gulp from 'gulp';
import {tasks} from './const';

gulp.task('default', [tasks.CLIENT_WATCH]);

require('require-dir')('client');


require('require-dir')('server');
