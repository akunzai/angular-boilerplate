angular.module('app.home',[
    'ui.router',
    'app.components.hello',
    'app.components.switchLocale'
])
.config(($stateProvider: ng.ui.IStateProvider)=>{
   $stateProvider.state('home', {
       url: '/home',
       template: require('./home.html')
   }) 
});