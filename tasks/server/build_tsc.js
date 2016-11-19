import gulp from 'gulp';
import debug from 'gulp-debug';
import tsc from 'gulp-typescript';

import {path} from '../const';

const TS_CONFIG = './tsconfig-server.json';

gulp.task('server.compile_tsc', () => {
  let tsProject = tsc.createProject(TS_CONFIG);

  return tsProject.src()
                    .pipe(debug({title: 'server ts src:'}))
                    .pipe(tsProject())
                    .js
                    .pipe(debug({title: 'server ts js:'}))
                    .pipe(gulp.dest(path.SERVER_BUILD));
});
