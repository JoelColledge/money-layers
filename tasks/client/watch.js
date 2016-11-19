import gulp from 'gulp';
import browserSync from 'browser-sync';
import {path, tasks} from '../const';

const TS = path.CLIENT_APP + '**/*.ts';
const CSS = path.CLIENT_APP + '**/*.css';
const HTML = path.CLIENT_APP + '**/*.html';

gulp.task(tasks.CLIENT_RELOAD, () => {
  return browserSync.reload();
});

gulp.task(tasks.CLIENT_WATCH, [tasks.CLIENT_BUILD_ALL], () => {

  browserSync({proxy: "http://localhost:3333", reloadDelay: 1000, logLevel: "debug"});


  let _watchable = [];

  _watchable.push(TS);
  _watchable.push(CSS);
  _watchable.push(HTML);

  return gulp.watch(_watchable, [tasks.CLIENT_BUILD_ALL, tasks.CLIENT_RELOAD]);
});
