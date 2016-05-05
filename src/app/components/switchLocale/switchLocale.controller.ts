import {Locale} from './locale';

export class SwitchLocaleController {
  public locales: Locale[];
  /*@ngInject*/
  constructor(
    protected $translate: ng.translate.ITranslateService,
    LOCALES: Locale[]
  ) {
    this.locales = LOCALES;
  }

  public switch(locale: string): void {
    this.$translate.use(locale);
  }
}
