export const path = {
  ROOT: './',
  CLIENT_APP: './client/dev/',
  CLIENT_BUILD: './build/client/dev/',
  CLIENT_DIST: './build/client/dist/',
  SERVER_APP: './server/',
  SERVER_BUILD: './build/server/',
  SERVER_BUILD_SERVER: './build/server/server/',
  TEST: './tests/'
}

export const tasks = {
  CLIENT_BUILD_DEV: 'client.build:dev',
  CLIENT_BUILD_DIST: 'client.build:dist',

  CLIENT_BUILD_ALL: 'client.build_all',
  CLIENT_BUILD_CSS: 'client.build_css',
  CLIENT_BUILD_JS: 'client.build_js',
  CLIENT_BUILD_VIEWS: 'client.views',
  CLIENT_BUILD_IMAGE: 'client.imgs',

  CLIENT_DEL_DIST: 'client.del:dist',

  CLIENT_COPY: 'client.copy',

  CLIENT_UNIT_TEST: 'client.unit_test',
  CLIENT_COVERAGE: 'client.coverage',

  CLIENT_RELOAD: 'client.reload',

  CLIENT_WATCH: 'client.watch',

  CLIENT_BUILD_TS: 'client.build_ts'
}
