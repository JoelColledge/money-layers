import gulp from 'gulp';
import {path} from './const';

const FILES = path.SERVER_APP + '**/*.json';

function server_copy() {
  return gulp.src(FILES, {base: path.SERVER_APP})
             .pipe(gulp.dest(path.SERVER_BUILD_SERVER));
};

gulp.task('server.copy', server_copy);
