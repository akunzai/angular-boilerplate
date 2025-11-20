import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { http, HttpResponse } from 'msw';
import TodoService from './todo.service';
import { Todo } from './types';

let service: TodoService;

beforeAll(() => {
  vi.spyOn(global.console, 'error').mockImplementation(() => undefined);
});

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [],
    providers: [TodoService, provideHttpClient(withInterceptorsFromDi())],
  });
  service = TestBed.inject(TodoService);
});

describe('getTodoList', () => {
  test('should response as expected', () => new Promise<void>((resolve) => {
    service.getTodoList().subscribe((values) => {
      expect(values.length).toBeGreaterThan(0);
      resolve();
    });
  }));

  test('should return empty result on errors', () => new Promise<void>((resolve) => {
    server.use(
      http.get('/api/todos', () => {
        return new HttpResponse(null, { status: 404 });
      })
    );
    service.getTodoList().subscribe((values) => {
      expect(values).toStrictEqual([]);
      expect(console.error).toHaveBeenCalled();
      resolve();
    });
  }));
});

describe('getTodo', () => {
  test('should response as expected', () => new Promise<void>((resolve) => {
    service.getTodo(1).subscribe((value) => {
      expect(value?.id).toBe(1);
      expect(value?.title).toBe('Pay bills');
      expect(value?.done).toBeTruthy();
      resolve();
    });
  }));

  test('should return undefined on errors', () => new Promise<void>((resolve) => {
    service.getTodo(123).subscribe((value) => {
      expect(value).toBeUndefined();
      expect(console.error).toHaveBeenCalled();
      resolve();
    });
  }));
});

describe('addTodo', () => {
  test('should generated id and response as requested with title', () => new Promise<void>((resolve) => {
    const expected = new Todo(0, 'Foo');
    service.addTodo(expected).subscribe((actual) => {
      expect(actual.id).toBeGreaterThan(0);
      expect(actual.title).toBe(expected.title);
      expect(actual.description).toBeUndefined();
      expect(actual.done).toBeFalsy();
      resolve();
    });
  }));

  test('should return undefined on errors', () => new Promise<void>((resolve) => {
    server.use(
      http.post('/api/todos', () => {
        return new HttpResponse(null, { status: 400 });
      })
    );
    const todo = new Todo(0, '');
    service.addTodo(todo).subscribe((value) => {
      expect(value).toBeUndefined();
      expect(console.error).toHaveBeenCalled();
      resolve();
    });
  }));
});

describe('updateTodo', () => {
  test('should can retrieve it as expected', () => new Promise<void>((resolve) => {
    const todo = new Todo(3, 'Modified', 'Test', true);
    service.updateTodo(todo).subscribe(() => {
      service.getTodo(todo.id).subscribe((value) => {
        expect(value?.id).toBe(todo.id);
        expect(value?.title).toBe(todo.title);
        expect(value?.description).toBe(todo.description);
        expect(value?.done).toBe(todo.done);
        resolve();
      });
    });
  }));

  test('should call console.error on errors', () => new Promise<void>((resolve) => {
    server.use(
      http.put('/api/todos/999', () => {
        return new HttpResponse(null, { status: 404 });
      })
    );
    const todo = new Todo(999, 'NotFound');
    service.updateTodo(todo).subscribe((value) => {
      expect(value).toBeUndefined();
      expect(console.error).toHaveBeenCalled();
      resolve();
    });
  }));
});

describe('deleteTodo', () => {
  test('should cannot retrieve it as expected', () => new Promise<void>((resolve) => {
    server.use(
      http.delete('/api/todos/123', async ({ request }) => {
        const item = await request.json();
        return HttpResponse.json(item);
      }),
      http.get('/api/todos/123', () => {
        return new HttpResponse(null, { status: 404 });
      })
    );
    const todo = new Todo(123, '');
    service.deleteTodo(todo).subscribe(() => {
      service.getTodo(todo.id).subscribe((value) => {
        expect(value).toBeUndefined();
        resolve();
      });
    });
  }));

  test('should return undefined on errors', () => new Promise<void>((resolve) => {
    server.use(
      http.delete('/api/todos/456', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );
    const todo = new Todo(456, '');
    service.deleteTodo(todo).subscribe((res) => {
      expect(res).toBeUndefined();
      expect(console.error).toHaveBeenCalled();
      resolve();
    });
  }));
});
