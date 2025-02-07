import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { ClickOutsideDirective } from '../click-outside.directive';
import { AsyncPipe, NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslationService } from '../services/translation.service';
import { TranslateModule } from '@ngx-translate/core';

type Language = 'en' | 'zh-Hant';

@Component({
    selector: 'app-nav-menu',
    templateUrl: './nav-menu.component.html',
    styleUrls: ['./nav-menu.component.css'],
    imports: [
      RouterLink,
      NgClass,
      RouterLinkActive,
      ClickOutsideDirective,
      AsyncPipe,
      TranslateModule
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavMenuComponent {
  @Input() title: string | undefined;

  private readonly isCollapsed = signal(true);
  private readonly isExpanded = signal(false);

  readonly currentLang$ = this.translationService.currentLang$;

  constructor(private translationService: TranslationService) {}

  get collapsed(): boolean {
    return this.isCollapsed();
  }

  get expanded(): boolean {
    return this.isExpanded();
  }

  toggleCollapsed(): void {
    this.isCollapsed.update(value => !value);
  }

  toggleExpanded(): void {
    this.isExpanded.update(value => !value);
  }

  onOutsideClick(): void {
    this.isExpanded.set(false);
  }

  isCurrentLanguage(pattern: string): boolean {
    return new RegExp(pattern).test(this.translationService.instant('LANGUAGE'));
  }

  switchLanguage(lang: Language): void {
    this.translationService.setLanguage(lang);
    this.isExpanded.set(false);
  }
}
