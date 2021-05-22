import { ClickOutsideModule } from 'ng-click-outside';

import { RouterTestingModule } from '@angular/router/testing';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { fireEvent, render, screen } from '@testing-library/angular';

import { NavMenuComponent } from './nav-menu.component';

beforeAll(() => {
  jest.spyOn(global.console, 'log').mockImplementation(() => {});
});
beforeEach(async () => {
  await render(NavMenuComponent, {
    componentProperties: {
      title: 'Test',
    },
    imports: [
      RouterTestingModule,
      ClickOutsideModule,
      TranslateModule.forRoot({
        loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
      }),
    ],
    providers: [TranslateService],
  });
});

test('should render with title: Test', () => {
  const title = screen.getByTestId('title');
  expect(title.textContent).toBe('Test');
});

test('support to toggle navigation', () => {
  const navbar = screen.getByTestId('navbar-collapse');
  expect(navbar.getAttribute('class')).not.toContain('show');
  const toggler = screen.getByTestId('navbar-toggler');
  fireEvent.click(toggler);
  expect(navbar.getAttribute('class')).toContain('show');
});

test('support to switch languages', () => {
  expect(localStorage.length).toBe(0);
  const toggler = screen.getByTestId('i18n-toggler');
  fireEvent.click(toggler);
  const switchEn = screen.getByTestId('i18n-switch-en');
  fireEvent.click(switchEn);
  expect(localStorage.getItem('locale')).toBe('en');
  const switchZh = screen.getByTestId('i18n-switch-zh');
  fireEvent.click(switchZh);
  expect(localStorage.getItem('locale')).toBe('zh-Hant');
});
