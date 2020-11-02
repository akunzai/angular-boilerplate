import * as angular from 'angular';
import 'angular-mocks';
import 'angular-translate';

import './switch-locale.module';
import './switch-locale.component';
import { SwitchLocaleController } from './switch-locale.controller';

angular.module('app.switchLocale').constant('LOCALES', {
  en: 'English',
  'zh-TW': '正體中文',
});

describe('SwitchLocaleController', () => {
  let controller: SwitchLocaleController;
  let translate: ng.translate.ITranslateService;
  beforeEach(() => {
    angular.mock.module(
      'app.switchLocale',
      (
        $qProvider: ng.IQProvider,
        $translateProvider: ng.translate.ITranslateProvider
      ) => {
        $qProvider.errorOnUnhandledRejections(false);
        $translateProvider.translations('en', {
          test: 'Test',
        });
        $translateProvider.translations('zh-TW', {
          test: '測試',
        });
        $translateProvider.preferredLanguage('en');
      }
    );
    angular.mock.inject(
      (
        $translate: ng.translate.ITranslateService,
        $componentController: ng.IComponentControllerService
      ) => {
        translate = $translate;
        controller = $componentController('switchLocale', {});
      }
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('switch locale to en', () => {
    void controller.switch('en');
    void translate('test').then(data=>{
        expect(data).toBe('Test');
    })
  });

  it('switch locale to zh-TW', () => {
    void controller.switch('zh-TW');
    void translate('test').then(data=>{
        expect(data).toBe('測試');
    })
  });
});
