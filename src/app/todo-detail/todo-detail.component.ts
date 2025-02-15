import { Location, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import TodoService from '../todo.service';
import { Todo } from '../types';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css'],
  imports: [NgIf, FormsModule, ReactiveFormsModule, TranslateModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoDetailComponent implements OnInit {
  id = 0;
  loaded = signal<boolean>(false);
  isLoaded = computed(() => this.loaded());

  form = this.formBuilder.group({
    title: ['', Validators.required],
    description: [''],
    done: [false],
  });

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private location: Location,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id === undefined) return;
    this.todoService.getTodo(id).subscribe((todo) => {
      if (todo !== undefined) {
        this.loaded.set(true);
        this.id = todo.id;
        this.form.setValue({
          title: todo.title,
          description: todo.description ?? '',
          done: todo.done,
        });
      }
    });
  }

  onSubmit($event: Event): void {
    $event.preventDefault();
    const value = this.form.value;
    const updatedTodo = new Todo(
      this.id,
      value.title ?? '',
      value.description ?? '',
      value.done ?? false
    );
    this.todoService.updateTodo(updatedTodo).subscribe(() => {
      this.location.back();
    });
  }

  onClose(): void {
    this.location.back();
  }
}
