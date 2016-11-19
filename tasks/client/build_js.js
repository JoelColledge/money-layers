import gulp from 'gulp';
import uglify from 'gulp-uglify';
import {path, tasks} from '../const';

const JS = path.CLIENT_APP + '**/*.js';

gulp.task(tasks.CLIENT_BUILD_JS, () => {
  return gulp.src(JS, {base: path.CLIENT_APP})
             .pipe(uglify())
             .pipe(gulp.dest(path.CLIENT_BUILD));
});
