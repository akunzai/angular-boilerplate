import { Location } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { fireEvent, render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { provideTranslateTesting } from '../testing/translate';
import { TodoDetailComponent } from './todo-detail.component';

beforeAll(() => {
  vi.spyOn(global.console, 'error').mockImplementation(() => undefined);
});

test('without Todo should render nothing', async () => {
  await render(TodoDetailComponent, {
    imports: [
      ReactiveFormsModule,
      TranslateModule.forRoot(),
    ],
    providers: [
      provideHttpClient(withInterceptorsFromDi()),
      {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            paramMap: { get: vi.fn().mockReturnValue(0) },
          },
        },
      },
      ...provideTranslateTesting(),
    ],
  });
  expect(screen.queryAllByRole('textbox')).toStrictEqual([]);
});

describe('with Todo', () => {
  const location = {
    back: vi.fn(),
    getState: vi.fn(),
    isCurrentPathEqualTo: vi.fn(),
    path: vi.fn(),
    replaceState: vi.fn(),
    subscribe: vi.fn(),
  };
  beforeEach(async () => {
    await render(TodoDetailComponent, {
      imports: [
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: vi.fn().mockReturnValue(1),
              },
            },
          },
        },
        { provide: Location, useFactory: () => location },
        ...provideTranslateTesting(),
      ],
    });
  });

  test('should renders as expected', async () => {
    const title = await screen.findByRole('textbox', {
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
    expect(location.back).toHaveBeenCalled();
  });

  test('should update values and goes back when form submitted', async () => {
    const input = await screen.findByRole('textbox', {
      name: /Title/i,
    });
    await userEvent.clear(input);
    await userEvent.type(input, 'Test');
    fireEvent.click(screen.getByRole('button', { name: /Save/i }));
    expect(location.back).toHaveBeenCalled();
  });
});
