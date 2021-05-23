import { Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
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

const locationMock = {
  back: jest.fn(),
};
const setup = async (activatedRouteFactory: Function) => {
  await render(TodoDetailComponent, {
    imports: [
      FormsModule,
      HttpClientModule,
      ReactiveFormsModule,
      TranslateModule.forRoot({
        loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
      }),
    ],
    providers: [
      { provide: ActivatedRoute, useFactory: activatedRouteFactory },
      { provide: Location, useFactory: () => locationMock },
    ],
  });
};

beforeAll(() => {
  jest.spyOn(global.console, 'error').mockImplementation(() => {});
});

test('without Todo should render not thing', async () => {
  let activatedRouteMock = {
    snapshot: {
      paramMap: {
        get: jest.fn().mockReturnValue(0),
      },
    },
  };
  await setup(() => activatedRouteMock);

  await waitFor(() => {
    expect(screen.queryAllByTestId('title')).toStrictEqual([]);
  });
});

describe('with Todo', () => {
  let activatedRouteMock = {
    snapshot: {
      paramMap: {
        get: jest.fn().mockReturnValue(1),
      },
    },
  };
  beforeEach(async () => {
    await setup(() => activatedRouteMock);
  });

  test('should renders as expected', async () => {
    const title = (await screen.findByTestId('title')) as HTMLInputElement;
    expect(title.value).toBe('Pay bills');
    const description = (await screen.findByTestId(
      'description'
    )) as HTMLAreaElement;
    expect(description.textContent).toBe('');
    const done = (await screen.findByTestId('done')) as HTMLInputElement;
    expect(done.checked).toBeTruthy();
    expect(activatedRouteMock.snapshot.paramMap.get).toBeCalled();
  });

  test('should goes back when close button clicked', async () => {
    fireEvent.click(await screen.findByTestId('close-button'));
    expect(locationMock.back).toBeCalled();
  });

  test('should update values and goes back when form submitted', async () => {
    const input = await screen.findByTestId('title');
    userEvent.clear(input);
    userEvent.type(input, 'Test');
    fireEvent.click(screen.getByTestId('submit-button'));
    expect(locationMock.back).toBeCalled();
  });
});
