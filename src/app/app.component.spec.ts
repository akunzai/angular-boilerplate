import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { render, screen } from '@testing-library/angular';
import { provideTranslateTesting } from './testing/translate';
import { AppComponent } from './app.component';

it('renders without crashing', async () => {
  document.title = 'Angular Boilerplate';
  await render(AppComponent, {
    imports: [
      TranslateModule.forRoot(),
    ],
    providers: [
      provideRouter([]),
      ...provideTranslateTesting(),
    ],
  });
  expect(await screen.findByText('Angular Boilerplate')).toBeInTheDocument();
});
