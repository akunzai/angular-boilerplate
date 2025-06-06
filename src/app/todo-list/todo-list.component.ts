import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import TodoService from '../todo.service';
import { Todo } from '../types';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    NgClass,
    TranslateModule
],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {
  todos = signal<Todo[]>([]);
  title = this.formBuilder.control('', Validators.required);

  constructor(
    private todoService: TodoService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.todoService.getTodoList().subscribe((todos) => {
      this.todos.set(todos);
    });
  }

  onSubmit($event: Event): void {
    $event.preventDefault();
    const title = this.title.value?.trim();
    if (!title) {
      return;
    }
    this.todoService
      .addTodo({ title: title, done: false } as Todo)
      .subscribe((todo) => {
        this.todos.update(todos => [...todos, todo]);
        this.title.setValue('');
      });
  }

  onRemove(todo: Todo): void {
    this.todoService.deleteTodo(todo).subscribe(() => {
      this.todos.update(todos => todos.filter((x) => x !== todo));
    });
  }

  onChange(todo: Todo): void {
    this.todoService.updateTodo(todo).subscribe();
  }
}
