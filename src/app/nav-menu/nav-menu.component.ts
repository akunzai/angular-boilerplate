import { Component, Input } from '@angular/core';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenuComponent {
  @Input() title: string | undefined;

  isCollapsed = true;
  isExpanded = false;

  constructor(private translate: TranslateService) {
    translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
      localStorage.setItem('locale', event.lang);
    });
  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleExpanded(): void {
    this.isExpanded = !this.isExpanded;
  }

  onOutsideClick(): void {
    this.isExpanded = false;
  }

  isCurrentLanguage(pattern: string): boolean {
    return new RegExp(pattern).test(this.translate.currentLang);
  }

  switchLanguage = (lang: string): void => {
    this.translate.use(lang);
    this.isExpanded = false;
  };
}
