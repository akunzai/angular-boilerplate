import { RouterTestingModule } from '@angular/router/testing';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { render, screen } from '@testing-library/angular';
import { AppComponent } from './app.component';

it('renders without crashing', async () => {
  document.title = 'Angular Boilerplate';
  await render(AppComponent, {
    imports: [
      RouterTestingModule,
      TranslateModule.forRoot({
        loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
      }),
    ],
  });
  expect(await screen.findByText('Angular Boilerplate')).toBeInTheDocument();
});
