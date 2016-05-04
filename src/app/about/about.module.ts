angular.module('app.about',[
    'ui.router'
])
.config(($stateProvider: ng.ui.IStateProvider)=>{
   $stateProvider.state('about', {
       url: '/about',
       template: require('./about.html')
   }) 
});