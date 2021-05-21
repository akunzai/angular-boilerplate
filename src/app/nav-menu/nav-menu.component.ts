import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenuComponent implements OnInit {
  @Input() title: string | undefined;

  isCollapsed = true;
  isExpanded = false;

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {}

  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }

  clickOutside($event: Event) {
    // $event.preventDefault();
    console.log('clickOutside:', $event);
    this.isExpanded = false;
  }

  isCurrentLanguage(lang: string) {
    return this.translate.currentLang?.startsWith(lang);
  }

  switchLanguage = (lang: string) => {
    this.translate.use(lang);
  };
}
