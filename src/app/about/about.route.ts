import * as angular from 'angular';
import { StateProvider } from '@uirouter/angularjs';

angular.module('app.about').config(($stateProvider: StateProvider) => {
  'ngInject';
  $stateProvider.state('about', {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    template: require('./about.html') as string,
    url: '/about',
  });
});
