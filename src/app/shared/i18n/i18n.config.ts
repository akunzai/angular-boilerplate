angular.module('app.i18n').run(
  (
    $translationCache: ng.ICacheObject
  ) => {
    ['en', 'zh-TW'].forEach(lang => {
      $translationCache.put(`i18n/${lang}.json`, JSON.stringify(require(`./${lang}.json`)));
    });
  });
