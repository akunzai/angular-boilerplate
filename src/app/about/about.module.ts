angular.module('app.about', [
  'ui.router',
  'app.components.initialValue',
])
  .config(($stateProvider: ng.ui.IStateProvider) => {
    $stateProvider.state('about', {
      template: require('./about.html'),
      url: '/about',
    });
  });
