/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../../node_modules/retyped-angularjs-tsd-ambient/angular-cookies.d.ts" />

global['jQuery'] = global['$'] = require('jquery');
import 'lodash';
import 'bootstrap-sass';
import 'angular';
import 'angular-cookies';
import 'angular-ui-router';
import 'angular-ui-bootstrap';
import 'angular-animate';
import 'angular-messages';
import 'angular-sanitize';
import 'angular-translate';
import 'angular-translate-loader-static-files';

import './components/angular-translate-storage-cookies/angular-translate-storage-cookies';
import './components/hello/hello.module';
import './components/switchLocale/switchLocale.module';
import './home/home.module';
import './about/about.module';

/*
 app entry point
 */
angular.module('app', [
  'ui.bootstrap',
  'ui.router',
  'ngCookies',
  'ngSanitize',
  'pascalprecht.translate',
  'app.home',
  'app.about'])
  .config((
    $urlRouterProvider: ng.ui.IUrlRouterProvider,
    $translateProvider: ng.translate.ITranslateProvider) => {
      $urlRouterProvider.otherwise('/home');
  ($translateProvider as any).uniformLanguageTag('bcp47') //since 2.7
  $translateProvider
    .useStorage('$translateCookieStringStorage')
    .storageKey('locale');
  $translateProvider.useStaticFilesLoader({
    prefix: 'locales/',
    suffix: '.json'
  })
    .useLoaderCache(true)
    .useSanitizeValueStrategy('sanitizeParameters')
    .usePostCompiling(true)
    .determinePreferredLanguage()
    .fallbackLanguage('en');
});
