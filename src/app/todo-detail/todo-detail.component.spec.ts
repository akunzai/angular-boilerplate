import { Location } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { of } from 'rxjs';

import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
  TranslateService
} from '@ngx-translate/core';

import { Todo } from '../todo';
import { TodoService } from '../todo.service';
import { TodoDetailComponent } from './todo-detail.component';

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
      imports: [
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
      ],
      declarations: [TodoDetailComponent],
      providers: [
        TranslateService,
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
      const serviceStub: TodoService = TestBed.inject(TodoService);
      spyOn(serviceStub, 'getTodo').and.callThrough();
      component.ngOnInit();
      expect(serviceStub.getTodo).toHaveBeenCalled();
    });
  });

  describe('onClose', () => {
    it('makes expected calls', () => {
      const locationStub: Location = TestBed.inject(Location);
      spyOn(locationStub, 'back').and.callThrough();
      component.onClose();
      expect(locationStub.back).toHaveBeenCalled();
    });
  });

  describe('onSubmit', () => {
    it('makes expected calls', () => {
      const serviceStub: TodoService = TestBed.inject(TodoService);
      spyOn(component, 'onClose').and.callThrough();
      spyOn(serviceStub, 'updateTodo').and.callThrough();
      component.onSubmit(new Event('submit'));
      expect(component.onClose).toHaveBeenCalled();
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
        By.css('button[aria-label=Close]')
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
      expect(component.form.controls.title.value).toBe('ABC');
    });

    it('Updates todo then goes back when save button is clicked', () => {
      const serviceStub = TestBed.inject(TodoService);
      spyOn(serviceStub, 'updateTodo').and.returnValue(of(undefined));
      const locationStub = TestBed.inject(Location);
      spyOn(locationStub, 'back');
      const button: HTMLButtonElement = fixture.debugElement.query(
        By.css('button[type=submit]')
      ).nativeElement;
      button.click();
      expect(serviceStub.updateTodo).toHaveBeenCalled();
      expect(locationStub.back).toHaveBeenCalled();
    });
  });
});
