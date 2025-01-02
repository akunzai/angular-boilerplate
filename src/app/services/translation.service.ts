import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLang = new BehaviorSubject<string>('en');
  currentLang$ = this.currentLang.asObservable();

  constructor(private translate: TranslateService) {
    this.initializeLanguage();
  }

  private async initializeLanguage() {
    // Set available languages
    this.translate.addLangs(['en', 'zh-Hant']);
    this.translate.setDefaultLang('en');

    // Load saved language or detect browser language
    const savedLang = localStorage.getItem('locale');
    const langToUse = savedLang || this.getBrowserLanguage();

    await this.setLanguage(langToUse);
  }

  private getBrowserLanguage(): string {
    const browserLang = this.translate.getBrowserCultureLang();
    return browserLang?.match(/zh/) ? 'zh-Hant' : 'en';
  }

  async setLanguage(lang: string): Promise<void> {
    if (!this.translate.getLangs().includes(lang)) {
      lang = 'en';
    }

    // Dynamically import translations
    try {
      const translations = await import(`../../locales/${lang}.json`);
      this.translate.setTranslation(lang, translations.default);
      await this.translate.use(lang).toPromise();
      localStorage.setItem('locale', lang);
      this.currentLang.next(lang);
    } catch (error) {
      console.error(`Failed to load translations for ${lang}`, error);
      // Fallback to English
      if (lang !== 'en') {
        await this.setLanguage('en');
      }
    }
  }

  instant(key: string, params?: object): string {
    return this.translate.instant(key, params);
  }
}
