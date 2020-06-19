import * as angular from 'angular';
import { StateProvider } from '@uirouter/angularjs';

angular.module('app.home').config(($stateProvider: StateProvider) => {
  'ngInject';
  $stateProvider.state('home', {
    template: require('./home.html') as string,
    url: '/home',
  });
});
