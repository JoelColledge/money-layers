import gulp from 'gulp';

var HubRegistry = require('gulp-hub');
var hub = new HubRegistry(['tasks/build_all.js']);
gulp.registry(hub);
