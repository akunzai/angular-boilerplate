import { Location } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  TranslateLoader,
  TranslateModule,
  provideTranslateService,
  provideTranslateLoader,
} from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { fireEvent, render, screen, waitFor } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { TodoDetailComponent } from './todo-detail.component';

class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of({});
  }
}

beforeAll(() => {
  jest.spyOn(global.console, 'error').mockImplementation(() => undefined);
});

test('without Todo should render nothing', async () => {
  await render(TodoDetailComponent, {
    imports: [
      ReactiveFormsModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useClass: FakeLoader
        }
      }),
    ],
    providers: [
      provideHttpClient(withInterceptorsFromDi()),
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
    getState: jest.fn(),
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
          loader: {
            provide: TranslateLoader,
            useClass: FakeLoader
          }
        }),
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
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
