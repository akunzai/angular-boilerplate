import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Todo } from './types';

const HEADERS = new Headers({
  'Content-Type': 'application/json',
});

@Injectable({
  providedIn: 'root',
})
export default class TodoService {
  private todosUrl = '/api/todos';

  getTodos(): Observable<Todo[]> {
    return fromFetch(this.todosUrl).pipe(
      switchMap((response) => this.handleResponse(response)),
      map((data) => data as Todo[]),
      catchError(this.handleError<Todo[]>('getTodos', []))
    );
  }

  getTodo(id: number): Observable<Todo | undefined> {
    const url = `${this.todosUrl}/${id}`;
    return fromFetch(url).pipe(
      switchMap((response) => this.handleResponse(response)),
      map((data) => data as Todo),
      catchError(this.handleError<Todo>(`getTodo id=${id}`))
    );
  }

  addTodo(todo: Todo): Observable<Todo> {
    return fromFetch(this.todosUrl, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(todo),
    }).pipe(
      switchMap((response) => this.handleResponse(response)),
      map((data) => data as Todo),
      catchError(this.handleError<Todo>('addTodo'))
    );
  }

  deleteTodo(todo: Todo): Observable<Todo> {
    const url = `${this.todosUrl}/${todo.id}`;
    return fromFetch(url, {
      method: 'DELETE',
      headers: HEADERS,
    }).pipe(
      switchMap((response) => this.handleResponse(response)),
      map((data) => data as Todo),
      catchError(this.handleError<Todo>('deleteTask'))
    );
  }

  updateTodo(todo: Todo): Observable<unknown> {
    const url = `${this.todosUrl}/${todo.id}`;
    return fromFetch(url, {
      method: 'PUT',
      headers: HEADERS,
      body: JSON.stringify(todo),
    }).pipe(
      switchMap((response) => this.handleResponse(response)),
      catchError(this.handleError<unknown>('updateTodo'))
    );
  }

  private handleResponse(response: Response) {
    if (response.ok) {
      return response.headers.get('Content-Type')?.endsWith('json')
        ? response.json()
        : response.text();
    }
    throw response.statusText;
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
