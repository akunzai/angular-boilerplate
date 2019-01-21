import * as angular from 'angular';

/**
 * init ngModel from default value
 * example: <input type="email" ng-model="email" ng-initial value="user@example.com">
 */
export class InitialValueDirective implements ng.IDirective {
  public require: string = 'ngModel';
  public restrict: string = 'A';

  constructor(protected $parse: ng.IParseService) {
  }

  public link: ng.IDirectiveLinkFn = (
    scope: ng.IScope,
    instanceElement: ng.IAugmentedJQuery,
    instanceAttributes: ng.IAttributes,
  ) => {
    const val: any = instanceAttributes['ngInitial'] || instanceElement.val();
    this.$parse(instanceAttributes['ngModel']).assign(scope, val);
  }

  public static factory(): ng.IDirectiveFactory {
    /* @ngInject */
    const factory: ng.IDirectiveFactory =
      ($parse: ng.IParseService) => new InitialValueDirective($parse);
    return factory;
  }
}

angular.module('app.initialValue').directive('ngInitial', InitialValueDirective.factory());
