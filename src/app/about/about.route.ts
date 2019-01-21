import angular = require('angular');
import { StateProvider } from '@uirouter/angularjs';

angular.module('app.about').config(($stateProvider: StateProvider) => {
    $stateProvider.state('about', {
      template: require('./about.html'),
      url: '/about',
    });
  });
