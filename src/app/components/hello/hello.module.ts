import {HelloComponent} from './hello.component';

angular.module('app.components.hello',['pascalprecht.translate'])
.component('helloComponent',new HelloComponent());