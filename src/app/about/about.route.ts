import * as angular from 'angular';
import { StateProvider } from '@uirouter/angularjs';

angular.module('app.about').config(($stateProvider: StateProvider) => {
  'ngInject';
  $stateProvider.state('about', {
    template: require('./about.html') as string,
    url: '/about',
  });
});
