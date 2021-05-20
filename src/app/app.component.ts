import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Angular Boilerplate';
  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'zh-Hant']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserCultureLang();
    translate.use(browserLang.match(/zh/) ? 'zh-Hant' : 'en');
  }
}
