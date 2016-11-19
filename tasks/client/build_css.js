import gulp from 'gulp';
import cssmin from 'gulp-clean-css';
import {path, tasks} from '../const';

const CSS = path.CLIENT_APP + '**/*.css';

gulp.task(tasks.CLIENT_BUILD_CSS, () => {
  return gulp.src(CSS, {base: path.CLIENT_APP})
             .pipe(cssmin())
             .pipe(gulp.dest(path.CLIENT_BUILD_CLIENT));
});
