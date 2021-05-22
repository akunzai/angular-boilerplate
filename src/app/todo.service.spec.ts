import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { rest, server } from '../mocks/server';
import { Todo } from './todo';
import { TodoService } from './todo.service';

let service: TodoService;

beforeAll(() => {
  jest.spyOn(global.console, 'error').mockImplementation(() => {});
});

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [HttpClientModule],
  });
  service = TestBed.inject(TodoService);
});

describe('getTodos', () => {
  test('should response as expected', (done) => {
    service.getTodos().subscribe((values) => {
      done();
      expect(values.length).toBeGreaterThan(0);
    });
  });

  test('should return empty result on errors', (done) => {
    server.use(
      rest.get('/api/todos', (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );
    service.getTodos().subscribe((values) => {
      done();
      expect(values).toStrictEqual([]);
      expect(console.error).toBeCalled();
    });
  });
});

describe('getTodo', () => {
  test('should response as expected', (done) => {
    service.getTodo(1).subscribe((value) => {
      done();
      expect(value.id).toBe(1);
      expect(value.title).toBe('Pay bills');
      expect(value.done).toBeTruthy();
    });
  });

  test('should return undefined on errors', (done) => {
    service.getTodo(123).subscribe((value) => {
      done();
      expect(value).toBeUndefined();
      expect(console.error).toBeCalled();
    });
  });
});

describe('addTodo', () => {
  test('should generated id and response as requested with title', (done) => {
    const expected = { title: 'Foo' } as Todo;
    service.addTodo(expected).subscribe((actual) => {
      done();
      expect(actual.id).toBeGreaterThan(0);
      expect(actual.title).toBe(expected.title);
      expect(actual.description).toBeUndefined();
      expect(actual.done).toBeFalsy();
    });
  });

  test('should return undefined on errors', (done) => {
    server.use(
      rest.post('/api/todos', (req, res, ctx) => {
        return res(ctx.status(400));
      })
    );
    const todo = { title: '' } as Todo;
    service.addTodo(todo).subscribe((value) => {
      done();
      expect(value).toBeUndefined();
      expect(console.error).toBeCalled();
    });
  });
});

describe('updateTodo', () => {
  test('should can retrieve it as expected', (done) => {
    const todo = new Todo(3, 'Modified', 'Test', true);
    service.updateTodo(todo).subscribe((_) => {
      service.getTodo(todo.id).subscribe((value) => {
        done();
        expect(value.id).toBe(todo.id);
        expect(value.title).toBe(todo.title);
        expect(value.description).toBe(todo.description);
        expect(value.done).toBe(todo.done);
      });
    });
  });

  test('should call console.error on errors', (done) => {
    server.use(
      rest.put('/api/todos/:id', (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );
    const todo = new Todo(999, 'NotFound');
    service.updateTodo(todo).subscribe((value) => {
      done();
      expect(value).toBeUndefined();
      expect(console.error).toBeCalled();
    });
  });
});

describe('deleteTodo', () => {
  test('should cannot retrieve it as expected', (done) => {
    server.use(
      rest.delete('/api/todos/123', (req, res, ctx) => {
        return res(ctx.status(200));
      }),
      rest.get('/api/todos/123', (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );
    const todo = new Todo(123, '');
    service.deleteTodo(todo).subscribe((_) => {
      service.getTodo(todo.id).subscribe((value) => {
        done();
        expect(value).toBeUndefined();
      });
    });
  });

  test('should return undefined on errors', (done) => {
    server.use(
      rest.delete('/api/todos/456', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    const todo = new Todo(456, '');
    service.deleteTodo(todo).subscribe((res) => {
      done();
      expect(res).toBeUndefined();
      expect(console.error).toBeCalled();
    });
  });
});
