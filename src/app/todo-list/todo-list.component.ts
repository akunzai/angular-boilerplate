import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import TodoService from '../todo.service';
import { Todo } from '../types';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  title = new FormControl('');

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  onSubmit($event: Event): void {
    $event.preventDefault();
    const title = this.title.value.trim();
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
