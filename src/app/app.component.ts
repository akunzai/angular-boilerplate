import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { TranslationService } from './services/translation.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [NavMenuComponent, RouterOutlet],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = document.title;

  constructor(private translationService: TranslationService) {}
}
