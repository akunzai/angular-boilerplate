import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import Todo from './todo';

@Injectable({
  providedIn: 'root',
})
export default class TodoService {
  private todosUrl = '/api/todos';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http
      .get<Todo[]>(this.todosUrl)
      .pipe(catchError(this.handleError<Todo[]>('getTodos', [])));
  }

  getTodo(id: number): Observable<Todo | undefined> {
    const url = `${this.todosUrl}/${id}`;
    return this.http
      .get<Todo>(url)
      .pipe(catchError(this.handleError<Todo>(`getTodo id=${id}`)));
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http
      .post<Todo>(this.todosUrl, todo, this.httpOptions)
      .pipe(catchError(this.handleError<Todo>('addTodo')));
  }

  deleteTodo(todo: Todo): Observable<Todo> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http
      .delete<Todo>(url, this.httpOptions)
      .pipe(catchError(this.handleError<Todo>('deleteTask')));
  }

  updateTodo(todo: Todo): Observable<unknown> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http
      .put(url, todo, this.httpOptions)
      .pipe(catchError(this.handleError<unknown>('updateTodo')));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: unknown): Observable<T> => {
      console.error(`${operation}: ${error}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
