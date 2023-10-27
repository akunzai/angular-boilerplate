import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Todo } from './types';

@Injectable({
  providedIn: 'root',
})
export default class TodoService {
  private baseUrl = '/api/todos';

  constructor(private http: HttpClient) {}

  getTodoList(): Observable<Todo[]> {
    return this.http
      .get<Todo[]>(this.baseUrl)
      .pipe(catchError(this.handleError<Todo[]>('getTodoList', [])));
  }

  getTodo(id: number): Observable<Todo | undefined> {
    const url = `${this.baseUrl}/${id}`;
    return this.http
      .get<Todo>(url)
      .pipe(catchError(this.handleError<Todo>(`getTodo id=${id}`)));
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http
      .post<Todo>(this.baseUrl, todo)
      .pipe(catchError(this.handleError<Todo>('addTodo')));
  }

  deleteTodo(todo: Todo): Observable<Todo> {
    const url = `${this.baseUrl}/${todo.id}`;
    return this.http
      .delete<Todo>(url)
      .pipe(catchError(this.handleError<Todo>('deleteTodo')));
  }

  updateTodo(todo: Todo): Observable<unknown> {
    const url = `${this.baseUrl}/${todo.id}`;
    return this.http
      .put(url, todo)
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
      console.error(`${operation}:`, error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
