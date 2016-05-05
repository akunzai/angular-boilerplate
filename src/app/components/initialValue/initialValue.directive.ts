/**
 * init ngModel from default value
 * example: <input type="email" ng-model="email" ng-initial value="user@example.com">
 */
export class InitialValueDirective implements ng.IDirective {
  constructor(protected $parse: ng.IParseService) {
  }
  require: string = 'ngModel';
  restrict: string = 'A';
  link: ng.IDirectiveLinkFn = (
    scope: ng.IScope,
    instanceElement: ng.IAugmentedJQuery,
    instanceAttributes: ng.IAttributes
  ) => {
    let val = instanceAttributes['ngInitial'] || instanceElement.val();
    this.$parse(instanceAttributes['ngModel']).assign(scope, val);
  }
  static factory(): ng.IDirectiveFactory {
    /*@ngInject*/
    let factory: ng.IDirectiveFactory =
      ($parse: ng.IParseService) => new InitialValueDirective($parse);
    return factory;
  }
}
