import gulp from 'gulp';
import imageMin from 'gulp-imagemin';
import {path, tasks} from '../const';

const IMAGES = path.CLIENT_APP + '**/*.{png,jpg,jpeg,svg,gif}';

gulp.task(tasks.CLIENT_BUILD_IMAGE, () => {
  return gulp.src(IMAGES, {base: path.CLIENT_APP})
			       .pipe(imageMin())
             .pipe(gulp.dest(path.CLIENT_BUILD_CLIENT));
});
