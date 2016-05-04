'use strict';

var changed = require('gulp-changed');
var connect = require('gulp-connect');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var runSequence = require('run-sequence');
var shell = require('gulp-shell');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

const sourceRoot = 'src';
const outDir = 'wwwroot';

global.watch = false;
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
    src: `${sourceRoot}/sass/*.scss`,
    dest: `${outDir}/css`,
    outputName: 'bundle.css'
  },
  scripts: {
    src: `${sourceRoot}/app/main.ts`,
    dest: `${outDir}/js`,
    outputName: 'bundle.js'
  },
  assets: {
    src: [
      `${sourceRoot}/index.html`,
      `${sourceRoot}/locales/*.json`],
    base: sourceRoot,
    dest: `${outDir}`
  }
};

gulp.task('default', function (callback) {
  return runSequence('install', 'build', callback);
});

gulp.task('release', function (callback) {
  global.devMode = false;
  return runSequence('install', 'build', callback);
});

gulp.task('install', shell.task([
  'tsdm rewire'
]));

gulp.task('build', function (callback) {
  if (global.devMode) {
    return runSequence(['fonts', 'assets', 'styles', 'scripts'], callback);
  }
  return runSequence('clean', ['fonts', 'assets', 'styles', 'scripts'], callback);
});

gulp.task('clean', function (callback) {
  var del = require('del');
  return del([`${outDir}/**`], callback);
});

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

gulp.task('scripts', ['browserify']);

// https://github.com/gulpjs/gulp/blob/master/docs/recipes/browserify-uglify-sourcemap.md
// https://github.com/gulpjs/gulp/blob/master/docs/recipes/fast-browserify-builds-with-watchify.md
function buildScript(opts, watch, dest, outputName) {
  var bundler;
  var gutil = require('gulp-util');
  var buffer = require('vinyl-buffer');
  var browserify = require('browserify');
  var source = require('vinyl-source-stream');
  var streamify = require('gulp-streamify');
  var tsify = require('tsify');
  var ngAnnotate = require('gulp-ng-annotate');
  if (watch) {
    var watchify = require('watchify');
    bundler = watchify(browserify(Object.assign({}, watchify.args, opts)));
    bundler.on('update', bundle);
    bundler.on('log', gutil.log);
  } else {
    bundler = browserify(opts);
  }
  bundler.plugin(tsify);
  function bundle() {
    return bundler.bundle()
      .on('error', function (err) {
        gutil.log(err.message);
        this.emit('end');
      })
      .pipe(source(outputName))
      .pipe(buffer())
      .pipe(gulpif(global.devMode, sourcemaps.init({ loadMaps: true })))
      .pipe(ngAnnotate())
      .pipe(gulpif(!global.devMode, streamify(uglify())))
      .pipe(gulpif(global.devMode, sourcemaps.write('./')))
      .pipe(gulp.dest(dest))
      .pipe(connect.reload());
  }
  return bundle();
}

gulp.task('browserify', function () {
  return buildScript(
    {
      entries: config.scripts.src,
      debug: global.devMode
    },
    global.watch,
    config.scripts.dest,
    config.scripts.outputName
  );
});

gulp.task('assets', function () {
  return gulp.src(config.assets.src, { base: config.assets.base })
    .pipe(changed(config.assets.dest))
    .pipe(gulp.dest(config.assets.dest))
    .pipe(connect.reload());
});

gulp.task('watch', function (callback) {
  global.watch = true;
  // assets
  gulp.watch(config.assets.src, ['assets']);
  // styles
  gulp.watch([config.styles.src], ['styles']);
  return runSequence('install', 'build', callback);
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