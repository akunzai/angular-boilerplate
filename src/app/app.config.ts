import * as angular from 'angular';
import { UrlService } from '@uirouter/angularjs';

angular.module('app')
.constant('LOCALES', {
  'en': 'English',
  'zh-TW': '正體中文',
  'ja': '日文',
})
.config(
(
  $urlServiceProvider: UrlService,
  $translateProvider: ng.translate.ITranslateProvider,
) => {

  $urlServiceProvider.rules.otherwise('/home');

  $translateProvider
    .useStaticFilesLoader({
      prefix: 'locales/',
      suffix: '.json',
    })
    // prevent FOUC - Flash of untranslated content
    .useLoaderCache('$translationCache')
    // https://angular-translate.github.io/docs/#/guide/19_security
    .useSanitizeValueStrategy('escape')
    // enable BCP-47, must be before determinePreferredLanguage!
    .uniformLanguageTag('bcp47')
    .registerAvailableLanguageKeys(['en', 'zh-TW', 'ja'], {
      'zh*': 'zh-TW',
      'ja*': 'ja',
    })
    .determinePreferredLanguage(() => {
      // queryString has higher priority
      const matches: RegExpExecArray = /\?locale=([\w\-]+)/.exec(
        location.search,
      );
      return matches
        ? matches[1]
        : $translateProvider.resolveClientLocale();
    })
    .fallbackLanguage('en')
    .useCookieStorage()
    .storageKey('locale');
})
.run(($translationCache: ng.ICacheObject, LOCALES: {[key: string]: string}) => {
  for (const locale in LOCALES) {
    if (LOCALES.hasOwnProperty(locale)) {
      $translationCache.put(
        `locales/${locale}.json`,
        JSON.stringify(require(`./locales/${locale}.json`)),
      );
    }
  }
});
