import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RouterOutlet } from '@angular/router';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [NavMenuComponent, RouterOutlet],
})
export class AppComponent {
  title = document.title;
  constructor(public translate: TranslateService) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    translate.setTranslation('en', require('../locales/en.json'));
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    translate.setTranslation('zh-Hant', require('../locales/zh-Hant.json'));
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
