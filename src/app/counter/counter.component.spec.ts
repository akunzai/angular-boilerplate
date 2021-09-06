import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule
} from '@ngx-translate/core';
import { fireEvent, render, screen } from '@testing-library/angular';
import { CounterComponent } from './counter.component';

beforeEach(async () => {
  await render(CounterComponent, {
    imports: [
      TranslateModule.forRoot({
        loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
      }),
    ],
  });
});

test('should render counter with 0', async () => {
  expect(screen.getByText(/Current count:/).textContent).toContain(
    'Current count: 0'
  );
});

test('should increment the counter on click', async () => {
  fireEvent.click(screen.getByRole('button'));
  expect(screen.getByText(/Current count:/).textContent).toContain(
    'Current count: 1'
  );
});
