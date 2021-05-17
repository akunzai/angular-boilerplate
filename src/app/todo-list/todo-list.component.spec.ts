import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { Todo } from '../todo';
import { TodoService } from '../todo.service';
import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(() => {
    const todoStub = () => ({});
    const todoServiceStub = () => ({
      getTodos: () => ({ subscribe: (f: Function) => f({}) }),
      addTodo: (todo: Todo) => ({ subscribe: (f: Function) => f({}) }),
      deleteTodo: (todo: Todo) => ({}),
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule],
      declarations: [TodoListComponent],
      providers: [
        { provide: Todo, useFactory: todoStub },
        { provide: TodoService, useFactory: todoServiceStub },
      ],
    });
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Use Cases', () => {
    beforeEach(() => {
      const serviceStub = TestBed.inject(TodoService);
      spyOn(serviceStub, 'getTodos').and.returnValue(
        of([
          {
            id: 1,
            title: 'Foo',
            description: '',
            done: false,
          },
          {
            id: 2,
            title: 'Bar',
            description: '',
            done: false,
          },
        ])
      );
      fixture.detectChanges();
    });

    it('Starts with the list of todo returned by getTodos, with link ref, id, and name', () => {
      const links: Array<HTMLAnchorElement> = fixture.debugElement
        .queryAll(By.css('a'))
        .map((a) => a.nativeElement);

      expect(links.length).toBe(2);

      expect(links[0].textContent).toContain('Foo');
      expect(links[0].getAttribute('href')).toBe('/todo/1');

      expect(links[1].textContent).toContain('Bar');
      expect(links[1].getAttribute('href')).toBe('/todo/2');
    });

    it('Clicking the delete button removes the todo from the list and calls deleteTodo', () => {
      const serviceStub = TestBed.inject(TodoService);
      spyOn(serviceStub, 'deleteTodo').and.returnValue(of());

      const delButton: HTMLButtonElement = fixture.debugElement.query(
        By.css('button.btn-close')
      ).nativeElement;
      delButton.click();
      fixture.detectChanges();

      const links: Array<HTMLAnchorElement> = fixture.debugElement
        .queryAll(By.css('a'))
        .map((a) => a.nativeElement);

      expect(links.length).toBe(1);
      expect(links[0].textContent).toContain('Bar');
      expect(links[0].getAttribute('href')).toBe('/todo/2');

      expect(serviceStub.deleteTodo).toHaveBeenCalled();
    });

    it("Clicking the add button on a an empty textbox doesn't add to the list", () => {
      const serviceStub = TestBed.inject(TodoService);
      spyOn(serviceStub, 'addTodo');

      const addButton: HTMLButtonElement = fixture.debugElement.query(
        By.css('div > button')
      ).nativeElement;
      addButton.click();
      fixture.detectChanges();

      expect(serviceStub.addTodo).not.toHaveBeenCalled();
    });

    it("Clicking the add button on textbox with blank spaces doesn't add to the list", () => {
      const serviceStub = TestBed.inject(TodoService);
      spyOn(serviceStub, 'addTodo');

      const input: HTMLInputElement = fixture.debugElement.query(
        By.css('input')
      ).nativeElement;

      input.value = '   ';
      input.dispatchEvent(new Event('input'));

      const addButton: HTMLButtonElement = fixture.debugElement.query(
        By.css('div > button')
      ).nativeElement;
      addButton.click();
      fixture.detectChanges();

      expect(serviceStub.addTodo).not.toHaveBeenCalled();
    });

    it('Clicking the add button adds the todo to the list and clears the textbox', () => {
      const serviceStub = TestBed.inject(TodoService);
      spyOn(serviceStub, 'addTodo').and.returnValue(
        of({
          id: 3,
          title: 'Test',
          description: '',
          done: false,
        })
      );

      const input: HTMLInputElement = fixture.debugElement.query(
        By.css('input')
      ).nativeElement;

      input.value = 'Test';
      input.dispatchEvent(new Event('input'));

      const addButton: HTMLButtonElement = fixture.debugElement.query(
        By.css('div > button')
      ).nativeElement;
      addButton.click();
      fixture.detectChanges();

      const links: Array<HTMLAnchorElement> = fixture.debugElement
        .queryAll(By.css('a'))
        .map((a) => a.nativeElement);

      expect(links.length).toBe(3);
      expect(links[2].textContent).toContain('Test');
      expect(links[2].getAttribute('href')).toBe('/todo/3');
    });
  });
});
