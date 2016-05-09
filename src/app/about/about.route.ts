angular.module('app.about').config(($stateProvider: ng.ui.IStateProvider) => {
    $stateProvider.state('about', {
      template: require('./about.html'),
      url: '/about',
    });
  });
