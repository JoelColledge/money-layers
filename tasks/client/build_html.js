import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import rev from 'gulp-rev-append';
import {path, tasks} from '../const';

const VIEWS = path.CLIENT_APP + '**/*.html';

gulp.task(tasks.CLIENT_BUILD_VIEWS, () => {
  return gulp.src(VIEWS, {base: path.CLIENT_APP})
             .pipe(rev())
			       .pipe(htmlmin({
               collapseWhitespace: true,
               caseSensitive: true
             }))
             .pipe(gulp.dest(path.CLIENT_BUILD));
});
