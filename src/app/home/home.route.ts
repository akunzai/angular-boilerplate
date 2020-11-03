import * as angular from 'angular';
import { StateProvider } from '@uirouter/angularjs';

angular.module('app.home').config(($stateProvider: StateProvider) => {
  'ngInject';
  $stateProvider.state('home', {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    template: require('./home.html') as string,
    url: '/home',
  });
});
