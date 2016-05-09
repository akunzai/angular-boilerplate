angular.module('app.home').config(($stateProvider: ng.ui.IStateProvider) => {
    $stateProvider.state('home', {
      template: require('./home.html'),
      url: '/home',
    });
  });
