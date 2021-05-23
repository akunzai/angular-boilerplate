import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { fireEvent, render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { rest, server } from '../../mocks/server';
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
  const links = await screen.findAllByTestId('todo-item-link');
  expect(links.length).toBe(3);
  expect(links[0].textContent).toContain('Pay bills');
  expect(links[0].getAttribute('href')).toBe('/todo/1');
  expect(links[1].textContent).toContain('Read a book');
  expect(links[1].getAttribute('href')).toBe('/todo/2');
  expect(links[2].textContent).toContain('Buy eggs');
  expect(links[2].getAttribute('href')).toBe('/todo/3');

  const inputs = screen
    .getAllByTestId('todo-item-done')
    .map((x) => x as HTMLInputElement);
  expect(inputs.length).toBe(3);
  expect(inputs[0].checked).toBeTruthy();
  expect(inputs[1].checked).toBeFalsy();
  expect(inputs[2].checked).toBeFalsy();
});

test('should remove item when delete button clicked', async () => {
  server.use(
    rest.delete('/api/todos/3', (req, res, ctx) => {
      return res(ctx.status(200));
    })
  );
  const buttons = await screen.findAllByTestId('remove-button');
  fireEvent.click(buttons[2]);
  const links = screen.getAllByTestId('todo-item-link');
  expect(links.length).toBe(2);
});

test('should update item when checkbox checked', async () => {
  const inputs = await screen.findAllByTestId('todo-item-done');
  fireEvent.click(inputs[2]);
  const links = await screen.findAllByTestId('todo-item-link');
  expect(links[2].getAttribute('class')).toContain(
    'text-decoration-line-through'
  );
});

test('should not add item without any input', async () => {
  const button = await screen.findByTestId('add-button');
  fireEvent.click(button);
  const links = await screen.findAllByTestId('todo-item-link');
  expect(links.length).toBe(3);
});

test('should not add item with blank input', async () => {
  const input = await screen.findByTestId('title');
  userEvent.type(input, '   ');
  const button = screen.getByTestId('add-button');
  fireEvent.click(button);
  const links = await screen.findAllByTestId('todo-item-link');
  expect(links.length).toBe(3);
});

test('should add item and clears the input', async () => {
  const input = await screen.findByTestId('title');
  userEvent.type(input, 'Test');
  const button = screen.getByTestId('add-button');
  fireEvent.click(button);
  const links = await screen.findAllByTestId('todo-item-link');
  expect(links.length).toBe(4);
  expect(links[3].textContent).toContain('Test');
  expect(links[3].getAttribute('href')).toBe('/todo/4');
});
