import {
  TranslateFakeLoader,
  TranslateModule,
  provideTranslateService,
  provideTranslateLoader
} from '@ngx-translate/core';
import { render, screen } from '@testing-library/angular';
import { HomeComponent } from './home.component';

it('should render with title: Welcome!', async () => {
  await render(HomeComponent, {
    imports: [
      TranslateModule.forRoot({
        providers: [
          provideTranslateService({
            loader: provideTranslateLoader(TranslateFakeLoader)
          })
        ]
      }),
    ],
  });
  expect(screen.getByText('Welcome!')).toBeInTheDocument();
});
