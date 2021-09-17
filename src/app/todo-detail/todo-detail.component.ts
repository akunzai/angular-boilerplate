import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import TodoService from '../todo.service';
import { Todo } from '../types';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss'],
})
export class TodoDetailComponent implements OnInit {
  id = 0;
  loaded = false;

  form = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    done: new FormControl(false),
  });

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id === undefined) return;
    this.todoService.getTodo(id).subscribe((todo) => {
      if (todo !== undefined) {
        this.loaded = true;
        this.id = todo.id;
        this.form.controls.title.setValue(todo.title);
        this.form.controls.description.setValue(todo.description);
        this.form.controls.done.setValue(todo.done);
      }
    });
  }

  onSubmit($event: Event): void {
    $event.preventDefault();
    const updatedTodo = new Todo(
      this.id,
      this.form.controls.title.value,
      this.form.controls.description.value,
      this.form.controls.done.value
    );
    this.todoService.updateTodo(updatedTodo).subscribe(() => {
      this.location.back();
    });
  }

  onClose(): void {
    this.location.back();
  }
}
