import * as angular from 'angular';
import 'angular-mocks';
import 'angular-translate';
import './locale.module';
import './locale.config';

describe('locale-config', () => {
  let cache: ng.ICacheObject;
  beforeEach(angular.mock.module('app.locale'));
  beforeEach(inject(($translationCache: ng.ICacheObject) => {
    cache = $translationCache;
  }));

  it('should be defined', () => {
    expect(cache).toBeDefined();
  });

  it('should contains key of [locale/messages.en.json]', () => {
    let value: any = cache.get('locale/messages.en.json');
    expect(value).toBeDefined();
  });

  it('should contains key of [locale/messages.zh-TW.json]', () => {
    let value: any = cache.get('locale/messages.zh-TW.json');
    expect(value).toBeDefined();
  });

});
