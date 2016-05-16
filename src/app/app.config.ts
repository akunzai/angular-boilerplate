angular.module('app').config(
(
  $urlRouterProvider: ng.ui.IUrlRouterProvider,
  $translateProvider: ng.translate.ITranslateProvider
) => {

  $urlRouterProvider.otherwise('/home');

  ($translateProvider as any).uniformLanguageTag('bcp47'); // since 2.7
  $translateProvider
    .useStorage('$translateCookiesStorage')
    .storageKey('locale');
  $translateProvider.useStaticFilesLoader({
    prefix: 'locales/',
    suffix: '.json',
  })
    .useLoaderCache(true)
    .useSanitizeValueStrategy('escape')
    .usePostCompiling(true)
    .determinePreferredLanguage()
    .fallbackLanguage('en');
});
