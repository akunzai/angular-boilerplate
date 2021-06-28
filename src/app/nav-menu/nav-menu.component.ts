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

  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }

  clickOutside($event: Event) {
    this.isExpanded = false;
  }

  isCurrentLanguage(pattern: string) {
    return this.translate.currentLang?.match(pattern);
  }

  switchLanguage = (lang: string) => {
    this.translate.use(lang);
    this.isExpanded = false;
  };
}
