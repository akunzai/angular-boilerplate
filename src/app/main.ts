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

import './shared';
import './home';
import './about';

import './app.module';
import './app.config';
