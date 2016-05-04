import {Locale} from './locale';

export class SwitchLocaleController {
    public locales: Locale[];
    
    /*@ngInject*/
    constructor(protected $translate: ng.translate.ITranslateService) {
        this.locales = [
            new Locale('English', 'en'),
            new Locale('正體中文', 'zh-TW')
        ];
    }

    public switch(locale: string): void {
        this.$translate.use(locale);
    }
}