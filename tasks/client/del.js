import gulp from 'gulp';
import del from 'del';
import {path, tasks} from '../const';

gulp.task(tasks.CLIENT_DEL_DIST, () => del.sync([path.CLIENT_DIST]));
