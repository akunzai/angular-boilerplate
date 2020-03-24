import * as angular from 'angular';
import { SwitchLocaleController } from './switch-locale.controller';
import { Injectable, IControllerConstructor } from 'angular';

export class SwitchLocaleComponent implements ng.IComponentOptions {
  public controller: string | Injectable<IControllerConstructor>;
  public template: string;
  constructor() {
    this.controller = SwitchLocaleController;
    this.template = require('./switch-locale.html');
  }
}

angular
  .module('app.switchLocale')
  .component('switchLocale', new SwitchLocaleComponent());
