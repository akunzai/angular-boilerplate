import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss'],
})
export class TodoDetailComponent implements OnInit {
  id = 0;
  form = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    done: new FormControl(false)
  })

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.todoService.getTodo(Number(this.route.snapshot.paramMap.get('id'))).subscribe((todo) => {
      if (todo !== undefined){
        this.id = todo.id;
        this.form.controls.title.setValue(todo.title);
        this.form.controls.description.setValue(todo.description);
        this.form.controls.done.setValue(todo.done);
      }
    });
  }

  onSubmit($event: Event): void {
    $event.preventDefault();
    const updatedTodo = new Todo(this.id,
      this.form.controls.title.value,
      this.form.controls.description.value,
      this.form.controls.done.value,
      );
    this.todoService.updateTodo(updatedTodo).subscribe(() => this.onClose());
  }

  onClose(): void {
    this.location.back();
  }

}
