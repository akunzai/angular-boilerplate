// declare app.constants module for lazy load
angular.module('app.constants', []);

/*
 app entry point
 */
angular.module('app', [
  'ui.bootstrap',
  'ui.router',
  'ngCookies',
  'ngSanitize',
  'pascalprecht.translate',
  'app.constants',
  'app.home',
  'app.about']);
