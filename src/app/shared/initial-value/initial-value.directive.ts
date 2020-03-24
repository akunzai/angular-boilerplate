import * as angular from 'angular';

/**
 * init ngModel from default value
 * example: <input type="email" ng-model="email" ng-initial value="user@example.com">
 */
export class InitialValueDirective implements ng.IDirective {
  public static factory(): ng.IDirectiveFactory {
    const factory: ng.IDirectiveFactory = ($parse: ng.IParseService) => {
      'ngInject';
      return new InitialValueDirective($parse);
    };
    return factory;
  }

  public require = 'ngModel';
  public restrict = 'A';

  constructor(protected $parse: ng.IParseService) {}

  public link: ng.IDirectiveLinkFn = (
    scope: ng.IScope,
    instanceElement: ng.IAugmentedJQuery,
    instanceAttributes: ng.IAttributes
  ) => {
    const val: unknown =
      instanceAttributes['ngInitial'] || instanceElement.val();
    this.$parse(instanceAttributes['ngModel']).assign(scope, val);
  };
}

angular
  .module('app.initialValue')
  .directive('ngInitial', InitialValueDirective.factory());
