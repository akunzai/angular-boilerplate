import {SwitchLocaleComponent} from './switchLocale.component';

angular.module('app.components.switchLocale', [
  'pascalprecht.translate',
  'app.config'
  ])
  .component('switchLocale', new SwitchLocaleComponent());