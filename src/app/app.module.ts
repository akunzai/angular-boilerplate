import * as jQuery from 'jquery';
global['$'] = global['jQuery'] = jQuery;
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

import './services/cookies-storage.service';
import './components/hello.module';
import './components/initial-value.module';
import './layout/switch-locale.module';
import './home/home.module';
import './about/about.module';

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

import './app.config';
