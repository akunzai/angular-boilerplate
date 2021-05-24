import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = document.title;
  constructor(public translate: TranslateService) {
    translate.setTranslation('en', require('../locales/en.json'));
    translate.setTranslation('zh-Hant', require('../locales/zh-Hant.json'));
    translate.addLangs(['en', 'zh-Hant']);
    translate.setDefaultLang('en');
    const locale = localStorage.getItem('locale');
    if (locale !== null) {
      translate.use(locale);
    } else {
      const browserLang = translate.getBrowserCultureLang();
      translate.use(browserLang.match(/zh/) ? 'zh-Hant' : 'en');
    }
  }
}
