'use strict';

var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var changed = require('gulp-changed');
var connect = require('gulp-connect');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var ngAnnotate = require('gulp-ng-annotate');
var runSequence = require('run-sequence');
var shell = require('gulp-shell');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var streamify = require('gulp-streamify');
var tsify = require('tsify');
var uglify = require('gulp-uglify');

const sourceRoot = 'src';
const outDir = 'wwwroot';

global.devMode = /dev/.test(process.env.NODE_ENV);

var config = {
  fonts: {
    src: [
      'node_modules/bootstrap-sass/assets/fonts/bootstrap/*',
      'node_modules/font-awesome/fonts/FontAwesome.otf',
      'node_modules/font-awesome/fonts/fontawesome-webfont.*'],
    dest: `${outDir}/fonts`
  },
  styles: {
    src: `${sourceRoot}/app/*.scss`,
    dest: `${outDir}/css`,
    outputName: 'bundle.css'
  },
  scripts: {
    src: [
      `${sourceRoot}/app/app.module.ts`,
      'typings/browser.d.ts'],
    dest: `${outDir}/js`,
    outputName: 'bundle.js',
    watch: `${sourceRoot}/app/**/*.ts`
  }
};

gulp.task('default', function (callback) {
  return runSequence('build', callback);
});

gulp.task('release', function (callback) {
  global.devMode = false;
  return runSequence('build', callback);
});

gulp.task('build', function (callback) {
  if (global.devMode) {
    return runSequence(['assets', 'browserify'], callback);
  }
  return runSequence('clean', ['assets', 'browserify'], callback);
});

gulp.task('clean', function (callback) {
  var del = require('del');
  return del([
    `${outDir}/css/**`,
    `${outDir}/fonts/**`,
    `${outDir}/js/**`,
  ], callback);
});

gulp.task('assets', ['fonts', 'styles', 'constants']);

gulp.task('fonts', function () {
  return gulp.src(config.fonts.src)
    .pipe(changed(config.fonts.dest))
    .pipe(gulp.dest(config.fonts.dest))
    .pipe(connect.reload());
});

gulp.task('styles', function () {
  var sass = require('gulp-sass');
  var merge = require('gulp-merge');
  var concat = require('gulp-concat');
  var cleanCSS = require('gulp-clean-css');
  var autoprefixer = require('gulp-autoprefixer');
  return merge(
    gulp.src(config.styles.src)
      .pipe(gulpif(global.devMode, sourcemaps.init()))
      .pipe(sass({
        outputStyle: global.devMode ? 'nested' : 'compressed',
        includePaths: [
          'node_modules/compass-sass-mixins/lib',
          'node_modules/bootstrap-sass/assets/stylesheets',
          'node_modules/font-awesome/scss']
      }).on('error', sass.logError)),
    gulp.src([
      'node_modules/angular/*.css',
      'node_modules/angular-ui-bootstrap/dist/*.css']))
    .pipe(concat(config.styles.outputName))
    .pipe(gulpif(!global.devMode, autoprefixer()))
    .pipe(gulpif(!global.devMode, cleanCSS({
      advanced: false,
      keepSpecialComments: 0
    })))
    .pipe(gulpif(global.devMode, sourcemaps.write('./')))
    .pipe(gulp.dest(config.styles.dest))
    .pipe(connect.reload());
});

function bundleScript(bundler) {
  return bundler.bundle()
    .on('error', function (err) {
      gutil.log(err.message);
      this.emit('end');
    })
    .pipe(source(config.scripts.outputName))
    .pipe(buffer())
    .pipe(gulpif(global.devMode, sourcemaps.init({ loadMaps: true })))
    .pipe(ngAnnotate())
    .pipe(gulpif(!global.devMode, streamify(uglify())))
    .pipe(gulpif(global.devMode, sourcemaps.write('./')))
    .pipe(gulp.dest(config.scripts.dest))
    .pipe(connect.reload());
}

// https://github.com/gulpjs/gulp/blob/master/docs/recipes/browserify-uglify-sourcemap.md
gulp.task('browserify', ['tslint'], function () {
  var bundler = browserify({
    entries: config.scripts.src,
    debug: global.devMode
  });
  bundler.plugin(tsify);
  return bundleScript(bundler);
});

// https://github.com/gulpjs/gulp/blob/master/docs/recipes/fast-browserify-builds-with-watchify.md
gulp.task('watchify', ['tslint'], function () {
  var watchify = require('watchify');
  var bundler = watchify(browserify(Object.assign({}, watchify.args, {
    entries: config.scripts.src,
    debug: global.devMode
  })));
  bundler.on('update', bundle);
  bundler.on('log', gutil.log);
  bundler.plugin(tsify);
  function bundle() {
    return bundleScript(bundler);
  }
  return bundle();
});

gulp.task('watch', ['assets', 'watchify'], function () {
  // styles
  gulp.watch([config.styles.src], ['styles']);
  // tslint
  gulp.watch([config.scripts.watch], ['tslint']);
  // constants
  gulp.watch(['./constants.json'], ['constants']);
});

gulp.task('serve', ['watch'], function () {
  var open = require('open');
  connect.server({
    root: outDir,
    port: 7000,
    // livereload browser plugin: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
    livereload: true
  });
  open('http://localhost:7000');
});

gulp.task('constants', function () {
  var gulpNgConfig = require('gulp-ng-config');
  var fs = require('fs');
  var packageJson = JSON.parse(fs.readFileSync('./package.json'));
  gulp.src('./constants.json')
    .pipe(gulpNgConfig('app.constants', {
      constants: {
        VERSION: packageJson.version || '1.0.0'
      },
      createModule: false,
      pretty: global.devMode
    }))
    .pipe(gulp.dest(config.scripts.dest))
    .pipe(connect.reload());
});

gulp.task("tslint", function () {
  var tslint = require("gulp-tslint");
  gulp.src(config.scripts.watch)
    .pipe(tslint())
    .pipe(tslint.report("verbose", {
      emitError: false,
      reportLimit: 10
    }));
});

gulp.task("test", ['tslint'], function (done) {
  var karma = require('karma');
  var server = new karma.Server({
    configFile: __dirname + '/karma.conf.js',
  }, done);
  return server.start();
});

gulp.task("test:debug", ['tslint'], function (done) {
  var karma = require('karma');
  var server = new karma.Server({
    configFile: __dirname + '/karma.conf.js',
    browsers: ['Chrome'],
    singleRun: false
  }, done);
  return server.start();
});
