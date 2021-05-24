import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { rest, server } from '../../mocks/server';
import Todo from '../todo';
import { TodoListComponent } from './todo-list.component';

beforeEach(async () => {
  await render(TodoListComponent, {
    imports: [
      FormsModule,
      HttpClientModule,
      ReactiveFormsModule,
      RouterTestingModule,
      TranslateModule.forRoot({
        loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
      }),
    ],
  });
});

test('should renders as expected', async () => {
  const links = await screen.findAllByRole('link');
  expect(links.length).toBe(3);
  expect(links[0].textContent).toContain('Pay bills');
  expect(links[0].getAttribute('href')).toBe('/todo/1');
  expect(links[1].textContent).toContain('Read a book');
  expect(links[1].getAttribute('href')).toBe('/todo/2');
  expect(links[2].textContent).toContain('Buy eggs');
  expect(links[2].getAttribute('href')).toBe('/todo/3');

  const inputs = screen
    .getAllByRole('checkbox')
    .map((x) => x as HTMLInputElement);
  expect(inputs.length).toBe(3);
  expect(inputs[0].checked).toBeTruthy();
  expect(inputs[1].checked).toBeFalsy();
  expect(inputs[2].checked).toBeFalsy();
});

test('should remove item when delete button clicked', async () => {
  server.use(
    rest.delete('/api/todos/3', (req, res, ctx) => {
      return res(ctx.json(req.body));
    }),
    rest.get('/api/todos', (req, res, ctx) => {
      return res(
        ctx.json([
          new Todo(1, 'Pay bills', '', true),
          new Todo(2, 'Read a book'),
        ])
      );
    })
  );
  const buttons = await screen.findAllByRole('button', { name: /Close/i });
  fireEvent.click(buttons[2]);
  await waitForElementToBeRemoved(
    screen.getByRole('link', { name: /Buy eggs/ })
  );
  expect(screen.getAllByRole('link').length).toBe(2);
});

test('should update item when checkbox checked', async () => {
  const inputs = await screen.findAllByRole('checkbox');
  fireEvent.click(inputs[2]);
  await waitFor(() => {
    expect(screen.getAllByRole('link')[2].getAttribute('class')).toContain(
      'text-decoration-line-through'
    );
  });
});

test('should not add item without any input', async () => {
  fireEvent.click(await screen.findByRole('button'));
  expect((await screen.findAllByRole('link')).length).toBe(3);
});

test('should not add item with blank input', async () => {
  userEvent.type(await screen.findByRole('textbox'), '   ');
  fireEvent.click(await screen.findByRole('button'));
  expect((await screen.findAllByRole('link')).length).toBe(3);
});

test('should add item and clears the input', async () => {
  userEvent.type(await screen.findByRole('textbox'), 'Test');
  fireEvent.click(screen.getByRole('button'));
  await waitFor(() => {
    const link = screen.getByRole('link', { name: /Test/i });
    expect(link.textContent).toContain('Test');
    expect(link.getAttribute('href')).toBe('/todo/4');
  });
});
