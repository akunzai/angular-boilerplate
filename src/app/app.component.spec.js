import { provideRouter } from '@angular/router';
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
      TranslateModule.forRoot({
        loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
      }),
    ],
    providers: [provideRouter([])],
  });
  expect(await screen.findByText('Angular Boilerplate')).toBeInTheDocument();
});
