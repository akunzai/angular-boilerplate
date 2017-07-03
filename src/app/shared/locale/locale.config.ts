angular.module('app.locale').run(
  (
    $translationCache: ng.ICacheObject,
  ) => {
    ['en', 'zh-TW'].forEach((locale) => {
      $translationCache.put(`locale/messages.${locale}.json`, JSON.stringify(require(`../../../locale/messages.${locale}.json`)));
    });
  });
