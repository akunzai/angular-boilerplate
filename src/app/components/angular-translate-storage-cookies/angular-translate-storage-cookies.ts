// use $cookies instead of $cookieStore
// https://github.com/angular-translate/angular-translate/blob/master/src/service/storage-cookie.js
export class TranslateCookieStringStorageFactory implements ng.translate.IStorage {
  static $inject = ['$cookies'];
  constructor(protected $cookies : ng.cookies.ICookiesService){
  }
  get(name: string): string{
    return this.$cookies.get(name);
  }
  put(name: string, value: string): void{
    this.$cookies.put(name,value);
  }
}

angular.module('pascalprecht.translate')
.service('$translateCookieStringStorage',TranslateCookieStringStorageFactory);
