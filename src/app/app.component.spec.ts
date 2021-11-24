import { RouterTestingModule } from '@angular/router/testing';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule
} from '@ngx-translate/core';
import { render, screen } from '@testing-library/angular';
import { AppComponent } from './app.component';
import { ClickOutsideDirective } from './click-outside.directive';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

it('renders without crashing', async () => {
  document.title = 'Angular Boilerplate';
  await render(AppComponent, {
    imports: [
      RouterTestingModule,
      TranslateModule.forRoot({
        loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
      }),
    ],
    declarations: [NavMenuComponent, ClickOutsideDirective],
  });
  expect(await screen.findByText('Angular Boilerplate')).toBeInTheDocument();
});
