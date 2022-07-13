import { rest } from 'msw';
import { Todo } from '../app/types';

const db: Todo[] = [
  new Todo(1, 'Pay bills', '', true),
  new Todo(2, 'Read a book'),
  new Todo(3, 'Buy eggs'),
];

export const handlers = [
  rest.get('/api/todos', (req, res, ctx) => {
    return res(ctx.json(db));
  }),
  rest.get('/api/todos/:id', (req, res, ctx) => {
    const { id } = req.params;
    const todo = db.find((x) => x.id === Number(id));
    if (todo === undefined) {
      return res(ctx.status(404));
    }
    return res(ctx.json(todo));
  }),
  rest.post('/api/todos', async (req, res, ctx) => {
    const todo = (await req.json()) as Todo;
    if (!todo.id) {
      todo.id = db.length > 0 ? Math.max(...db.map((x) => x.id)) + 1 : 1;
    }
    db.push(todo);
    return res(ctx.json(todo));
  }),
  rest.delete('/api/todos/:id', (req, res, ctx) => {
    const { id } = req.params;
    const index = db.findIndex((x) => x.id === Number(id));
    if (index === -1) {
      return res(ctx.status(404));
    }
    return res(ctx.json(db.splice(index, 1)[0]));
  }),
  rest.put('/api/todos/:id', (req, res, ctx) => {
    const { id } = req.params;
    const index = db.findIndex((x) => x.id === Number(id));
    if (index === -1) {
      return res(ctx.status(404));
    }
    const todo = req.body as Todo;
    db[index] = todo;
    return res(ctx.status(200));
  }),
];
