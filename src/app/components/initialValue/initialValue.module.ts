import {InitialValueDirective} from "./initialValue.directive";

angular.module('app.components.initialValue',[])
  .directive('ngInitial',InitialValueDirective.factory());