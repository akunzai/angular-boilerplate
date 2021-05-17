import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { Todo } from './todo';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    const todoStub = { id: {} };
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService, { provide: Todo, useValue: todoStub }],
    });
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addTodo', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      const stub: Todo = TestBed.inject(Todo);
      service.addTodo(stub).subscribe((res) => {
        expect(res).toEqual(stub);
      });
      const req = httpTestingController.expectOne('api/todos');
      expect(req.request.method).toEqual('POST');
      req.flush(stub);
      httpTestingController.verify();
    });

    it('handles an error', () => {
      const todoStub: Todo = TestBed.inject(Todo);
      service.addTodo(todoStub).subscribe((res) => {
        expect(res).toEqual(undefined!);
      });
      const httpTestingController = TestBed.inject(HttpTestingController);
      const req = httpTestingController.expectOne('api/todos');
      spyOn(console, 'error');
      req.flush('Error', { status: 404, statusText: 'Not Found' });
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('updateTodo', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      const stub: Todo = TestBed.inject(Todo);
      service.updateTodo(stub).subscribe((res) => {
        expect(res).toEqual(stub);
      });
      const req = httpTestingController.expectOne('api/todos');
      expect(req.request.method).toEqual('PUT');
      req.flush(stub);
      httpTestingController.verify();
    });

    it('handles 404 error', () => {
      const stub: Todo = TestBed.inject(Todo);
      service.updateTodo(stub).subscribe((res) => {
        expect(res).toEqual(undefined);
      });
      const httpTestingController = TestBed.inject(HttpTestingController);
      const req = httpTestingController.expectOne('api/todos');
      spyOn(console, 'error');
      req.flush('Error', { status: 404, statusText: 'Not Found' });
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('getTodos', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      const stub = TestBed.inject(Todo);
      service.getTodos().subscribe((res) => {
        expect(res).toEqual([stub]);
      });
      const req = httpTestingController.expectOne('api/todos');
      expect(req.request.method).toEqual('GET');
      req.flush([stub]);
      httpTestingController.verify();
    });

    it('handles an error', () => {
      service.getTodos().subscribe((res) => {
        expect(res).toEqual([]);
      });
      const httpTestingController = TestBed.inject(HttpTestingController);
      const req = httpTestingController.expectOne('api/todos');
      spyOn(console, 'error');
      req.flush('Error', { status: 404, statusText: 'Not Found' });
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('getTodo', () => {
    it('gets todo with http get', () => {
      const stub: Todo = TestBed.inject(Todo);
      const id = 123;
      service.getTodo(id).subscribe((res) => {
        expect(res).toEqual(stub);
      });
      const httpTestingController = TestBed.inject(HttpTestingController);
      const req = httpTestingController.expectOne('api/todos/123');
      expect(req.request.method).toEqual('GET');
      req.flush(stub);
      httpTestingController.verify();
    });

    it('handles 404 error', () => {
      service.getTodo(123).subscribe((res) => {
        expect(res).toEqual(undefined!);
      });
      const httpTestingController = TestBed.inject(HttpTestingController);
      const req = httpTestingController.expectOne('api/todos/123');
      spyOn(console, 'error');
      req.flush('Error', { status: 404, statusText: 'Not Found' });
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('deleteTodo', () => {
    it('deletes todo with http del', () => {
      const stub: Todo = TestBed.inject(Todo);
      stub.id = 123;
      service.deleteTodo(stub).subscribe((res) => {
        expect(res).toEqual(stub);
      });
      const httpTestingController = TestBed.inject(HttpTestingController);
      const req = httpTestingController.expectOne('api/todos/' + stub.id);
      expect(req.request.method).toEqual('DELETE');
      req.flush(stub);

      httpTestingController.verify();
    });

    it('deletes todo by id with http del', () => {
      const stub: Todo = TestBed.inject(Todo);
      const id = 123;
      service.deleteTodo(id).subscribe((res) => {
        expect(res).toEqual(stub);
      });
      const httpTestingController = TestBed.inject(HttpTestingController);
      const req = httpTestingController.expectOne('api/todos/' + id);
      expect(req.request.method).toEqual('DELETE');
      req.flush(stub);

      httpTestingController.verify();
    });

    it('handles 404 error', () => {
      const stub: Todo = TestBed.inject(Todo);
      service.addTodo(stub).subscribe((res) => {
        expect(res).toEqual(undefined!);
      });
      const httpTestingController = TestBed.inject(HttpTestingController);
      const req = httpTestingController.expectOne('api/todos');
      spyOn(console, 'error');
      req.flush('Error', { status: 404, statusText: 'Not Found' });
      expect(console.error).toHaveBeenCalled();
    });
  });
});
