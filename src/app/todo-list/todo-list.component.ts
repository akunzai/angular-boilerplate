import { Component, OnInit } from '@angular/core';
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
import { NgFor, NgClass } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgFor,
    RouterLink,
    NgClass,
    TranslateModule,
  ],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  title = this.formBuilder.control('', Validators.required);

  constructor(
    private todoService: TodoService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.todoService.getTodoList().subscribe((todos) => {
      this.todos = todos;
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
        this.todos.push(todo);
        this.title.setValue('');
      });
  }

  onRemove(todo: Todo): void {
    this.todoService.deleteTodo(todo).subscribe(() => {
      this.todos = this.todos.filter((x) => x !== todo);
    });
  }

  onChange(todo: Todo): void {
    this.todoService.updateTodo(todo).subscribe();
  }
}
