import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Todo } from './todo';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const todos: Todo[] = [
      new Todo(1, 'Pay bills', '', true),
      new Todo(2, 'Read a book'),
      new Todo(3, 'Buy eggs'),
    ];
    return { todos };
  }

  // Overrides the genId method to ensure that a item always has an id.
  // If the items array is empty,
  // the method below returns the initial number (1).
  // if the items array is not empty, the method below returns the highest
  // item id + 1.
  genId(items: Todo[]): number {
    return items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;
  }
}
