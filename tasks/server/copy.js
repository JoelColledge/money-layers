import gulp from 'gulp';
import {path} from '../const';

const FILES = path.SERVER_APP + '**/*.json';

gulp.task('server.copy', () => {
  return gulp.src(FILES, {base: path.SERVER_APP})
             .pipe(gulp.dest(path.SERVER_BUILD_SERVER));
});
