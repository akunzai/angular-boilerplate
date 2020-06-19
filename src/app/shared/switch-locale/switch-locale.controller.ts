import { Locale } from './locale.model';

export class SwitchLocaleController {
  public locales: Locale[];
  constructor(
    protected $translate: ng.translate.ITranslateService,
    LOCALES: Locale[],
  ) {
    'ngInject';
    this.locales = LOCALES;
  }

  public switch(locale: string): void {
    void Promise.resolve(this.$translate.use(locale));
  }
}
