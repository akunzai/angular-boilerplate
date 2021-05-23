import { ClickOutsideModule } from 'ng-click-outside';

import { RouterTestingModule } from '@angular/router/testing';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { render, screen } from '@testing-library/angular';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

it('renders without crashing', async () => {
  document.title = 'Angular Boilerplate';
  await render(AppComponent, {
    imports: [
      ClickOutsideModule,
      RouterTestingModule,
      TranslateModule.forRoot({
        loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
      }),
    ],
    declarations: [NavMenuComponent],
  });
  expect(await screen.findByText('Angular Boilerplate')).toBeTruthy();
});
