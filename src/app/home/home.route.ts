import angular = require('angular');
import { StateProvider } from '@uirouter/angularjs';

angular.module('app.home').config(($stateProvider: StateProvider) => {
    $stateProvider.state('home', {
      template: require('./home.html'),
      url: '/home',
    });
  });
