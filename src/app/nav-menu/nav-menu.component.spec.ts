import { RouterTestingModule } from '@angular/router/testing';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
  TranslateService
} from '@ngx-translate/core';
import { fireEvent, render, screen } from '@testing-library/angular';
import { ClickOutsideDirective } from '../click-outside.directive';
import { NavMenuComponent } from './nav-menu.component';

beforeEach(async () => {
  await render(NavMenuComponent, {
    componentProperties: {
      title: 'Test',
    },
    imports: [
      RouterTestingModule,
      TranslateModule.forRoot({
        loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
      }),
    ],
    declarations: [ClickOutsideDirective],
    providers: [TranslateService],
  });
});

test('should render with title: Test', () => {
  expect(screen.getByText('Test')).toBeInTheDocument();
});

test('support to toggle navigation', () => {
  const navbar = screen.getByRole('menu');
  expect(navbar.getAttribute('class')).not.toContain('show');
  fireEvent.click(screen.getByRole('button', { name: /Toggle navigation/i }));
  expect(navbar.getAttribute('class')).toContain('show');
});

test('support to switch languages', () => {
  fireEvent.click(screen.getByRole('button', { name: /Toggle Languages/i }));
  fireEvent.click(screen.getByRole('button', { name: /English/i }));
  expect(localStorage.getItem('locale')).toBe('en');
  fireEvent.click(screen.getByRole('button', { name: /正體中文/i }));
  expect(localStorage.getItem('locale')).toBe('zh-Hant');
});
