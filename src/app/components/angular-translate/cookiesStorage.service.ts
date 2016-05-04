// use $cookies instead of $cookieStore
// https://github.com/angular-translate/angular-translate/blob/master/src/service/storage-cookie.js
export class TranslateCookiesStorageFactory implements ng.translate.IStorage {
    /*@ngInject*/
    constructor(protected $cookies: ng.cookies.ICookiesService) {
    }
    get(name: string): string {
        return this.$cookies.get(name);
    }
    put(name: string, value: string): void {
        this.$cookies.put(name, value);
    }
}