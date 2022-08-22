import { Location } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { TodoDetailComponent } from './todo-detail.component';

beforeAll(() => {
  jest.spyOn(global.console, 'error').mockImplementation(() => undefined);
});

test('without Todo should render nothing', async () => {
  await render(TodoDetailComponent, {
    imports: [
      ReactiveFormsModule,
      TranslateModule.forRoot({
        loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
      }),
    ],
    providers: [
      {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            paramMap: { get: jest.fn().mockReturnValue(0) },
          },
        },
      },
    ],
  });
  expect(screen.queryAllByRole('textbox')).toStrictEqual([]);
});

describe('with Todo', () => {
  const location = {
    back: jest.fn(),
    isCurrentPathEqualTo: jest.fn(),
    path: jest.fn(),
    replaceState: jest.fn(),
    subscribe: jest.fn(),
  };
  beforeEach(async () => {
    await render(TodoDetailComponent, {
      imports: [
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: jest.fn().mockReturnValue(1),
              },
            },
          },
        },
        { provide: Location, useFactory: () => location },
      ],
    });
    await waitFor(() => {
      expect(screen.getByDisplayValue('Pay bills')).toBeInTheDocument();
    });
  });

  test('should renders as expected', async () => {
    const title = screen.getByRole('textbox', {
      name: /Title/i,
    }) as HTMLInputElement;
    expect(title.value).toBe('Pay bills');
    const description = await screen.findByRole('textbox', {
      name: /Description/i,
    });
    expect(description.textContent).toBe('');
    const done = screen.getByRole('checkbox') as HTMLInputElement;
    expect(done.checked).toBeTruthy();
  });

  test('should goes back when close button clicked', async () => {
    fireEvent.click(await screen.findByRole('button', { name: /Close/i }));
    expect(location.back).toBeCalled();
  });

  test('should update values and goes back when form submitted', async () => {
    const input = await screen.findByRole('textbox', {
      name: /Title/i,
    });
    await userEvent.clear(input);
    await userEvent.type(input, 'Test');
    fireEvent.click(screen.getByRole('button', { name: /Save/i }));
    expect(location.back).toBeCalled();
  });
});
