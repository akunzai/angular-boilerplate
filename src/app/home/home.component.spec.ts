import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { render, screen } from '@testing-library/angular';

import { HomeComponent } from './home.component';

it('should render with title: Welcome!', async () => {
  await render(HomeComponent, {
    imports: [
      TranslateModule.forRoot({
        loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
      }),
    ],
  });
  const title = screen.getByTestId('title');
  expect(title.textContent).toBe('Welcome!');
});
