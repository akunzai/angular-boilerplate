import * as angular from 'angular';

export class HelloComponent implements ng.IComponentOptions {
  public bindings: { [boundProperty: string]: string };
  public template: string;

  constructor() {
    this.bindings = {
      // https://docs.angularjs.org/api/ng/service/$compile#-scope-
      // value: '@'
      // one-way binding: '<'
      // two-way binding: '='
      // callback: '&'
      userName: '@'
    };

    this.template = require('./hello.html') as string;
  }
}

angular.module('app.hello').component('hello', new HelloComponent());
