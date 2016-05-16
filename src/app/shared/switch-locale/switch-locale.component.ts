import {SwitchLocaleController} from './switch-locale.controller';

export class SwitchLocaleComponent implements ng.IComponentOptions {
  public controller: any;
  public template: string;
  constructor() {
    this.controller = SwitchLocaleController;
    this.template = require('./switch-locale.html');
  }
}

angular.module('app.switchLocale').component('switchLocale', new SwitchLocaleComponent());
