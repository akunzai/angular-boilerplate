import * as angular from 'angular';
import 'angular-mocks';
import 'angular-translate';
import './i18n.module';
import './i18n.config';

describe('i18n-config', () => {
  let cache: ng.ICacheObject;
  beforeEach(angular.mock.module('app.i18n'));
  beforeEach(inject(($translationCache: ng.ICacheObject) => {
    cache = $translationCache;
  }));

  it('should be defined', () => {
    expect(cache).toBeDefined();
  });

  it('should contains key of [i18n/en.json]', () => {
    let value: any = cache.get('i18n/en.json');
    expect(value).toBeDefined();
  });

  it('should contains key of [i18n/zh-TW.json]', () => {
    let value: any = cache.get('i18n/zh-TW.json');
    expect(value).toBeDefined();
  });

});
