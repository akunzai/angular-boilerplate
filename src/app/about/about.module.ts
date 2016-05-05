angular.module('app.about',[
    'ui.router',
    'app.components.initialValue'
])
.config(($stateProvider: ng.ui.IStateProvider)=>{
   $stateProvider.state('about', {
       url: '/about',
       template: require('./about.html')
   }) 
});