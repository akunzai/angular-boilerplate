angular.module('app').config(
(
  $urlRouterProvider: ng.ui.IUrlRouterProvider,
  $translateProvider: ng.translate.ITranslateProvider,
) => {

  $urlRouterProvider.otherwise('/home');

  ($translateProvider as any).uniformLanguageTag('bcp47'); // since 2.7
  $translateProvider
    .useStorage('$translateCookiesStorage')
    .storageKey('locale');
  $translateProvider.useStaticFilesLoader({
    prefix: 'locale/messages',
    suffix: '.json',
  })
    .useLoaderCache('$translationCache')
    .useSanitizeValueStrategy('escape')
    .determinePreferredLanguage()
    .fallbackLanguage('en');
});
