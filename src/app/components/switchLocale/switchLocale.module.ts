import {SwitchLocaleComponent} from './switchLocale.component';

angular.module('app.components.switchLocale', ['pascalprecht.translate'])
  .component('switchLocale', new SwitchLocaleComponent());