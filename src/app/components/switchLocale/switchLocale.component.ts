import {SwitchLocaleController} from './switchLocale.controller';

export class SwitchLocaleComponent implements ng.IComponentOptions{
    public controller: any;
    public template: string;
    constructor(){
        this.controller = SwitchLocaleController;
        this.template = require('./switchLocale.html');
    }
}