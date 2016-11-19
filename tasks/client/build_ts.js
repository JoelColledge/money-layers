import gulp from 'gulp';
import debug from 'gulp-debug';
import tsc from 'gulp-typescript';
import sourcemaps from 'gulp-sourcemaps';
import {path, tasks} from '../const';

const TS_CONFIG = path.ROOT + 'tsconfig-client.json';

gulp.task(tasks.CLIENT_BUILD_TS, () => {
  let _tsProject = tsc.createProject(TS_CONFIG);

  return _tsProject.src()
      .pipe(sourcemaps.init())
      .pipe(_tsProject())
      .js
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(path.CLIENT_BUILD));
});
