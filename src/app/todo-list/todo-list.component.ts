import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  add(title: string): void {
    title = title.trim();
    if (!title) {
      return;
    }
    this.todoService.addTodo({ title: title } as Todo).subscribe((todo) => {
      this.todos.push(todo);
    });
  }

  delete(todo: Todo): void {
    this.todos = this.todos.filter((x) => x !== todo);
    this.todoService.deleteTodo(todo).subscribe();
  }

  update(todo: Todo): void {
    this.todoService.updateTodo(todo).subscribe();
  }
}
