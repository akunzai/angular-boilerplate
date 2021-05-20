import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { Todo } from '../todo';
import { TodoService } from '../todo.service';
import { TodoDetailComponent } from './todo-detail.component';
import { TranslateTestingModule } from 'ngx-translate-testing';

describe('TodoDetailComponent', () => {
  let component: TodoDetailComponent;
  let fixture: ComponentFixture<TodoDetailComponent>;

  beforeEach(() => {
    const activatedRouteStub = () => ({
      snapshot: { paramMap: { get: () => ({}) } },
    });
    const locationStub = () => ({ back: () => ({}) });
    const todoServiceStub = () => ({
      getTodo: (id: number) => ({
        subscribe: (f: Function) => f({}),
      }),
      updateTodo: (todo: Todo) => ({ subscribe: (f: Function) => f({}) }),
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [FormsModule, TranslateTestingModule.withTranslations({})],
      declarations: [TodoDetailComponent],
      providers: [
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Location, useFactory: locationStub },
        { provide: TodoService, useFactory: todoServiceStub },
      ],
    });
    fixture = TestBed.createComponent(TodoDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getTodo').and.callThrough();
      component.ngOnInit();
      expect(component.getTodo).toHaveBeenCalled();
    });
  });

  describe('getTodo', () => {
    it('makes expected calls', () => {
      const serviceStub: TodoService = TestBed.inject(TodoService);
      spyOn(serviceStub, 'getTodo').and.callThrough();
      component.getTodo();
      expect(serviceStub.getTodo).toHaveBeenCalled();
    });
  });

  describe('goBack', () => {
    it('makes expected calls', () => {
      const locationStub: Location = TestBed.inject(Location);
      spyOn(locationStub, 'back').and.callThrough();
      component.goBack();
      expect(locationStub.back).toHaveBeenCalled();
    });
  });

  describe('save', () => {
    it('makes expected calls', () => {
      const serviceStub: TodoService = TestBed.inject(TodoService);
      spyOn(component, 'goBack').and.callThrough();
      spyOn(serviceStub, 'updateTodo').and.callThrough();
      component.save();
      expect(component.goBack).toHaveBeenCalled();
      expect(serviceStub.updateTodo).toHaveBeenCalled();
    });
  });

  describe('Without a todo', () => {
    it("Doesn't display anything", () => {
      const serviceStub = TestBed.inject(TodoService);
      spyOn(serviceStub, 'getTodo').and.returnValue(of(undefined!));
      fixture.detectChanges();
      const anyDiv = fixture.debugElement.query(By.css('div'));
      expect(anyDiv).toBeFalsy();
    });
  });

  describe('With todo', () => {
    beforeEach(() => {
      const serviceStub = TestBed.inject(TodoService);
      spyOn(serviceStub, 'getTodo').and.returnValue(
        of({
          id: 123,
          title: 'Test',
          description: '',
          done: false,
        })
      );
      fixture.detectChanges();
    });

    it('Displays content when initialized with a todo', () => {
      const anyDiv = fixture.debugElement.query(By.css('div'));
      expect(anyDiv).toBeTruthy();
    });

    it('Has input box with the name', async () => {
      await fixture.whenStable();
      const input: HTMLInputElement = fixture.debugElement.query(
        By.css('input')
      ).nativeElement;
      expect(input.value).toBe('Test');
    });

    it('Calls location.back() when go back button is clicked', () => {
      const locationStub = TestBed.inject(Location);
      spyOn(locationStub, 'back');
      const button: HTMLButtonElement = fixture.debugElement.query(
        By.css('button') // first button
      ).nativeElement;
      button.click();
      expect(locationStub.back).toHaveBeenCalled();
    });

    it('Updates todo property when user types on the input', () => {
      const input: HTMLInputElement = fixture.debugElement.query(
        By.css('input')
      ).nativeElement;
      input.value = 'ABC';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(component.todo?.title).toBe('ABC');
    });

    it('Updates todo then goes back when save button is clicked', () => {
      const serviceStub = TestBed.inject(TodoService);
      spyOn(serviceStub, 'updateTodo').and.returnValue(of(undefined));
      const locationStub = TestBed.inject(Location);
      spyOn(locationStub, 'back');
      const button: HTMLButtonElement = fixture.debugElement.queryAll(
        By.css('button')
      )[1].nativeElement; // second button
      button.click();
      expect(serviceStub.updateTodo).toHaveBeenCalledWith(component.todo!);
      expect(locationStub.back).toHaveBeenCalled();
    });
  });
});
