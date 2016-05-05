angular.module('app.home', [
  'ui.router',
  'app.components.hello',
  'app.components.switchLocale',
])
  .config(($stateProvider: ng.ui.IStateProvider) => {
    $stateProvider.state('home', {
      template: require('./home.html'),
      url: '/home',
    });
  });
