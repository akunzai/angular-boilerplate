import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormControl
} from '@angular/forms';
import TodoService from '../todo.service';
import { Todo } from '../types';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgClass, NgIf, AsyncPipe } from '@angular/common';
import { catchError, finalize, of, tap } from 'rxjs';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.css'],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgFor,
        NgIf,
        RouterLink,
        NgClass,
        TranslateModule
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent {
  private readonly todoService = inject(TodoService);
  private readonly formBuilder = inject(FormBuilder);

  private readonly todos = signal<Todo[]>([]);
  private readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly todoList = computed(() => this.todos());
  readonly isLoading = computed(() => this.loading());
  readonly errorMessage = computed(() => this.error());

  readonly titleControl = new FormControl('', {
    validators: [Validators.required, Validators.minLength(1)],
    nonNullable: true
  });

  constructor() {
    // Load initial todos
    this.loadTodos();

    // Setup error cleanup effect
    effect(() => {
      if (this.error()) {
        setTimeout(() => this.error.set(null), 5000);
      }
    });
  }

  private loadTodos(): void {
    this.loading.set(true);
    this.todoService.getTodoList().pipe(
      tap(todos => this.todos.set(todos)),
      catchError(err => {
        this.error.set('Failed to load todos: ' + err.message);
        return of([]);
      }),
      finalize(() => this.loading.set(false))
    ).subscribe();
  }

  onSubmit($event: Event): void {
    $event.preventDefault();

    if (this.titleControl.invalid) {
      return;
    }

    const title = this.titleControl.value.trim();
    if (!title) {
      return;
    }

    this.loading.set(true);
    this.todoService.addTodo({ title, done: false } as Todo).pipe(
      tap(todo => {
        this.todos.update(current => [...current, todo]);
        this.titleControl.reset();
      }),
      catchError(err => {
        this.error.set('Failed to add todo: ' + err.message);
        return of(null);
      }),
      finalize(() => this.loading.set(false))
    ).subscribe();
  }

  onRemove(todo: Todo): void {
    this.loading.set(true);
    this.todoService.deleteTodo(todo).pipe(
      tap(() => {
        this.todos.update(current => current.filter(t => t !== todo));
      }),
      catchError(err => {
        this.error.set('Failed to delete todo: ' + err.message);
        return of(null);
      }),
      finalize(() => this.loading.set(false))
    ).subscribe();
  }

  onChange(todo: Todo): void {
    this.loading.set(true);
    this.todoService.updateTodo(todo).pipe(
      catchError(err => {
        this.error.set('Failed to update todo: ' + err.message);
        return of(null);
      }),
      finalize(() => this.loading.set(false))
    ).subscribe();
  }

  trackByTodoId(index: number, todo: Todo): number {
    return todo.id;
  }
}
