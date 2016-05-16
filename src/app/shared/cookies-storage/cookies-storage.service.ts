// use $cookies instead of $cookieStore
// https://github.com/angular-translate/angular-translate/blob/master/src/service/storage-cookie.js
export class TranslateCookiesStorage implements ng.translate.IStorage {
  /*@ngInject*/
  constructor(protected $cookies: ng.cookies.ICookiesService) {
  }
  public get(name: string): string {
    return this.$cookies.get(name);
  }
  public put(name: string, value: string): void {
    this.$cookies.put(name, value);
  }
}

angular.module('pascalprecht.translate').service('$translateCookiesStorage', TranslateCookiesStorage);
