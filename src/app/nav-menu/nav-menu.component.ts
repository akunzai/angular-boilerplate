import { ChangeDetectionStrategy, Component, computed, Input, signal, inject } from '@angular/core';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { ClickOutsideDirective } from '../click-outside.directive';
import { NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
  imports: [RouterLink, NgClass, RouterLinkActive, ClickOutsideDirective],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavMenuComponent {
  private translate = inject(TranslateService);

  @Input() title: string | undefined;

  private readonly collapsed = signal(true);
  private readonly expanded = signal(false);
  isCollapsed = computed(() => this.collapsed());
  isExpanded = computed(() => this.expanded());
  constructor() {
    const translate = this.translate;

    translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
      localStorage.setItem('locale', event.lang);
    });
  }

  toggleCollapsed(): void {
    this.collapsed.update(value => !value);
  }

  toggleExpanded(): void {
    this.expanded.update(value => !value);
  }

  onOutsideClick(): void {
    this.expanded.set(false);
  }

  isCurrentLanguage(pattern: string): boolean {
    return new RegExp(pattern).test(this.translate.currentLang);
  }

  switchLanguage = (lang: string): void => {
    this.translate.use(lang);
    this.expanded.set(false);
  };
}
