import {HelloComponent} from './hello.component';

angular.module('app.components.hello',['pascalprecht.translate'])
.component('hello',new HelloComponent());