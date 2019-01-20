angular.module('app').config(
(
  $urlRouterProvider: ng.ui.IUrlRouterProvider,
  $translateProvider: ng.translate.ITranslateProvider,
) => {

  $urlRouterProvider.otherwise('/home');

  $translateProvider
    // prevent FOUC - Flash of untranslated content
    .translations('en', {
      about: 'Angular Demo Site',
      hello: 'Hello {{ userName }}!',
    })
    .translations('zh-TW', {
      about: 'Angular 示範網站',
      hello: '你好，{{ userName }}！',
    })
    // https://angular-translate.github.io/docs/#/guide/19_security
    .useSanitizeValueStrategy('escape')
    // enable BCP-47, must be before determinePreferredLanguage!
    .uniformLanguageTag('bcp47')
    .determinePreferredLanguage()
    .fallbackLanguage('en')
    .useCookieStorage()
    .storageKey('locale');
});
