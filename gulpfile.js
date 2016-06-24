'use strict';

var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var changed = require('gulp-changed');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var refresh = require('gulp-refresh');
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
  i18n: {
    src: `${sourceRoot}/app/shared/i18n/*.json`,
    dest: `${outDir}/js`,
    outputName: 'i18n.js',
  },
  styles: {
    src: `${sourceRoot}/app/main.scss`,
    dest: `${outDir}/css`,
    outputName: 'bundle.css',
    watch: `${sourceRoot}/app/**/*.scss`
  },
  scripts: {
    src: [
      `${sourceRoot}/app/main.ts`,
      'typings/index.d.ts'],
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

gulp.task('assets', ['fonts', 'styles', 'constants', 'i18n']);

gulp.task('fonts', function () {
  return gulp.src(config.fonts.src)
    .pipe(changed(config.fonts.dest))
    .pipe(gulp.dest(config.fonts.dest))
    .pipe(refresh());
});

gulp.task('styles', function () {
  var sass = require('gulp-sass');
  var concat = require('gulp-concat');
  var cleanCSS = require('gulp-clean-css');
  var autoprefixer = require('gulp-autoprefixer');
  return gulp.src(config.styles.src)
      .pipe(gulpif(global.devMode, sourcemaps.init()))
      .pipe(sass({
        outputStyle: global.devMode ? 'nested' : 'compressed'
      }).on('error', sass.logError))
    .pipe(concat(config.styles.outputName))
    .pipe(gulpif(!global.devMode, autoprefixer()))
    .pipe(gulpif(!global.devMode, cleanCSS({
      advanced: false,
      keepSpecialComments: 0
    })))
    .pipe(gulpif(global.devMode, sourcemaps.write('./')))
    .pipe(gulp.dest(config.styles.dest))
    .pipe(refresh());
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
    .pipe(refresh());
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
  // livereload browser plugin: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
  refresh.listen();
  // styles
  gulp.watch(config.styles.watch, ['styles']);
  // tslint
  gulp.watch(config.scripts.watch, ['tslint']);
  // constants
  gulp.watch('./constants.json', ['constants']);
  // i18n
  gulp.watch(config.i18n.src, ['i18n']);
});

gulp.task('serve', ['watch'], function () {
  var connect = require('gulp-connect');
  var open = require('open');
  var port = process.env.NODE_PORT || 8080;
  connect.server({
    root: outDir,
    port: port
  });
  open(`http://localhost:${port}`);
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
    .pipe(refresh());
});

gulp.task("i18n", function() {
  var concat = require('gulp-concat');
  var jsonMinify = require('gulp-jsonminify');
  var ngLang2Js = require('gulp-ng-lang2js');
  return gulp.src(config.i18n.src)
    .pipe(jsonMinify())
    .pipe(ngLang2Js({
      moduleName: 'app.i18n',
      declareModule: false,
      prefix: 'i18n/'
    }))
    .pipe(gulpif(!global.devMode, streamify(uglify())))
    .pipe(concat(config.i18n.outputName))
    .pipe(gulp.dest(config.i18n.dest))
    .pipe(refresh());
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
