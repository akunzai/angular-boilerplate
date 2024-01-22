import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RouterOutlet } from '@angular/router';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import enTranslations from '../locales/en.json';
import zhHantTranslations from '../locales/zh-Hant.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [NavMenuComponent, RouterOutlet],
})
export class AppComponent {
  title = document.title;
  constructor(public translate: TranslateService) {
    translate.setTranslation('en', enTranslations);
    translate.setTranslation('zh-Hant', zhHantTranslations);
    translate.addLangs(['en', 'zh-Hant']);
    translate.setDefaultLang('en');
    const locale = localStorage.getItem('locale');
    if (locale !== null) {
      translate.use(locale);
    } else {
      const browserLang = translate.getBrowserCultureLang();
      translate.use(browserLang?.match(/zh/) ? 'zh-Hant' : 'en');
    }
  }
}
