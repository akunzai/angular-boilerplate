import 'angular';
import 'angular-mocks';
import 'angular-cookies';
import 'angular-translate';
import {TranslateCookiesStorageFactory} from './cookies-storage.service';

describe('cookies-storage', () => {
  const KEY: string = 'locale';
  let cookies: ng.cookies.ICookiesService;
  let storage: ng.translate.IStorage;

  beforeEach(angular.mock.module('pascalprecht.translate', 'ngCookies'));
  beforeEach(inject(($cookies: ng.cookies.ICookiesService) => {
    cookies = $cookies;
    storage = new TranslateCookiesStorageFactory(cookies);
  }));

  it('should get undefined from $cookies', () => {
    expect(storage.get(KEY)).toBe(undefined);
  });

  it('should get "zh-TW" from $cookies', () => {
    cookies.put(KEY, 'zh-TW');
    expect(storage.get(KEY)).toBe('zh-TW');
  });

  it('should put "en" to $cookies', () => {
    storage.put(KEY, 'en');
    expect(cookies.get(KEY)).toBe('en');
  });

});
