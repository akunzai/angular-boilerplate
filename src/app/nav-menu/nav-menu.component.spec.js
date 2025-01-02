import { provideRouter } from '@angular/router';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
  TranslateService
} from '@ngx-translate/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/angular';
import { NavMenuComponent } from './nav-menu.component';

let translate;

beforeEach(async () => {
  const { fixture } = await render(NavMenuComponent, {
    componentProperties: {
      title: 'Test',
    },
    imports: [
      TranslateModule.forRoot({
        loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
      }),
    ],
    providers: [TranslateService, provideRouter([])],
  });
  translate = fixture.debugElement.injector.get(TranslateService);
  translate.setTranslation('en', {
    'NAV.TOGGLE_MENU': 'Toggle navigation menu',
    'NAV.LANGUAGE_SELECTOR': 'Select language',
    'LANGUAGES.ENGLISH': 'English',
    'LANGUAGES.CHINESE': '中文(繁體)',
  });
  translate.use('en');
});

test('should render with title: Test', async () => {
  expect(await screen.findByText('Test')).toBeInTheDocument();
});

test('support to toggle navigation', async () => {
  const navbar = screen.getByRole('navigation');
  const navbarCollapse = navbar.querySelector('.navbar-collapse');
  expect(navbarCollapse.getAttribute('class')).not.toContain('show');
  fireEvent.click(screen.getByRole('button', { name: /NAV.TOGGLE_MENU/i }));
  expect(navbarCollapse.getAttribute('class')).toContain('show');
});

test('support to switch languages', async () => {
  expect(localStorage.getItem('locale')).toBe('en');
  fireEvent.click(screen.getByRole('button', { name: /LANGUAGES.CHINESE/i }));
  await waitFor(() => {
    expect(localStorage.getItem('locale')).toBe('zh-Hant');
  });
});
