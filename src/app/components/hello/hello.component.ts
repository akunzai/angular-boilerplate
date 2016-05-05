export class HelloComponent implements ng.IComponentOptions {
  public bindings: any;
  public template: string;

  constructor() {
    this.bindings = {
      // https://docs.angularjs.org/api/ng/service/$compile#-scope-
      // value: '@'
      // one-way binding: '<'
      // two-way binding: '='
      // callback: '&'
      userName: '@',
    };
    this.template = require('./hello.html');
  }
}

angular.module('app.components.hello').component('hello', new HelloComponent());
