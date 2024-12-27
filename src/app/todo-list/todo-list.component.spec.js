import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
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
import { http, HttpResponse } from 'msw';
import userEvent from '@testing-library/user-event';
import { server } from '../../mocks/node';
import { TodoListComponent } from './todo-list.component';

beforeEach(async () => {
  await render(TodoListComponent, {
    imports: [
      FormsModule,
      ReactiveFormsModule,
      TranslateModule.forRoot({
        loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
      }),
    ],
    providers: [provideRouter([]), provideHttpClient(withInterceptorsFromDi())],
  });
});

test('should renders as expected', async () => {
  const links = await screen.findAllByRole('link', { name: /TODO.VIEW_DETAILS/i });
  expect(links.length).toBe(3);
  const todos = links.map(link => link.textContent.trim());
  expect(todos).toContain('Pay bills');
  expect(todos).toContain('Read a book');
  expect(todos).toContain('Buy eggs');
  
  const inputs = screen.getAllByRole('checkbox');
  expect(inputs.length).toBe(3);
  const checkedInputs = inputs.filter(input => input.checked);
  expect(checkedInputs.length).toBe(1);
});

test('should remove item when delete button clicked', async () => {
  server.use(
    http.delete('/api/todos/3', () => {
      return HttpResponse.json({});
    })
  );
  const links = await screen.findAllByRole('link', { name: /TODO.VIEW_DETAILS/i });
  const initialCount = links.length;
  const buttons = screen.getAllByRole('button', { name: /TODO.DELETE/i });
  fireEvent.click(buttons[2]);
  
  await waitFor(() => {
    const updatedLinks = screen.queryAllByRole('link', { name: /TODO.VIEW_DETAILS/i });
    expect(updatedLinks.length).toBe(initialCount - 1);
  });
});

test('should update item when checkbox checked', async () => {
  server.use(
    http.put('/api/todos/3', () => {
      return HttpResponse.json({ id: 3, title: 'Buy eggs', done: true });
    })
  );
  await screen.findAllByRole('link');
  const inputs = screen.getAllByRole('checkbox');
  const todoItems = screen.getAllByRole('listitem');
  const todoLink = todoItems[todoItems.length - 1].querySelector('a');
  expect(todoLink.className).not.toContain('text-decoration-line-through');
  
  fireEvent.click(inputs[inputs.length - 1]);
  
  await waitFor(() => {
    expect(screen.getAllByRole('listitem')[todoItems.length - 1].querySelector('a').className).toContain('text-decoration-line-through');
  });
});

test('should not add item without any input', async () => {
  await screen.findAllByRole('link');
  const beforeCount = screen.getAllByRole('link').length;
  const addButton = screen.getByRole('button', { name: /COMMON.ADD/i });
  fireEvent.click(addButton);
  await waitFor(() => {
    expect(screen.getAllByRole('link').length).toBe(beforeCount);
  });
});

test('should not add item with blank input', async () => {
  await screen.findAllByRole('link');
  const beforeCount = screen.getAllByRole('link').length;
  const input = screen.getByRole('textbox');
  await userEvent.type(input, '   ');
  const addButton = screen.getByRole('button', { name: /COMMON.ADD/i });
  fireEvent.click(addButton);
  await waitFor(() => {
    expect(screen.getAllByRole('link').length).toBe(beforeCount);
  });
});

test('should add item and clears the input', async () => {
  server.use(
    http.post('/api/todos', async ({ request }) => {
      const todo = await request.json();
      return HttpResponse.json({
        ...todo,
        id: 4,
        createdAt: '2024-12-28T03:55:04+08:00',
        updatedAt: '2024-12-28T03:55:04+08:00'
      });
    })
  );
  
  await screen.findAllByRole('link');
  const input = screen.getByRole('textbox');
  await userEvent.type(input, 'Test');
  const addButton = screen.getByRole('button', { name: /COMMON.ADD/i });
  fireEvent.click(addButton);
  
  await waitFor(() => {
    const links = screen.getAllByRole('link', { name: /TODO.VIEW_DETAILS/i });
    const newLink = links[links.length - 1];
    expect(newLink.textContent.trim()).toBe('Test');
    expect(newLink.getAttribute('href')).toBe('/todo/4');
  });
  expect(screen.getByRole('textbox').value).toBe('');
});

test('should add item with valid input', async () => {
  server.use(
    http.post('/api/todos', async ({ request }) => {
      const todo = await request.json();
      return HttpResponse.json({
        ...todo,
        id: 4,
        createdAt: '2024-12-28T03:55:04+08:00',
        updatedAt: '2024-12-28T03:55:04+08:00'
      });
    })
  );
  
  await screen.findAllByRole('link');
  const beforeCount = screen.getAllByRole('link', { name: /TODO.VIEW_DETAILS/i }).length;
  const input = screen.getByRole('textbox');
  await userEvent.type(input, 'Test new todo');
  const addButton = screen.getByRole('button', { name: /COMMON.ADD/i });
  fireEvent.click(addButton);
  
  await waitFor(() => {
    const links = screen.getAllByRole('link', { name: /TODO.VIEW_DETAILS/i });
    expect(links.length).toBe(beforeCount + 1);
    expect(links[links.length - 1].textContent.trim()).toBe('Test new todo');
  });
});

afterEach(() => {
  server.resetHandlers();
});
