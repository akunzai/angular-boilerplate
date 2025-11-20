import { TranslateModule } from '@ngx-translate/core';
import { render, screen } from '@testing-library/angular';
import { provideTranslateTesting } from '../testing/translate';
import { HomeComponent } from './home.component';

it('should render with title: Welcome!', async () => {
  await render(HomeComponent, {
    imports: [
      TranslateModule.forRoot(),
    ],
    providers: [...provideTranslateTesting()],
  });
  expect(screen.getByText('Welcome!')).toBeInTheDocument();
});
