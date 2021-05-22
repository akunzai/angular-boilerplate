import { rest } from 'msw';
import { Todo } from 'src/app/todo';

let db: Todo[] = [
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
  rest.post('/api/todos', (req, res, ctx) => {
    let todo = req.body as Todo;
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
    const todo = Object.assign({}, db[index]);
    delete db[index];
    return res(ctx.json(todo));
  }),
  rest.put('/api/todos/:id', (req, res, ctx) => {
    const { id } = req.params;
    const index = db.findIndex((x) => x.id === Number(id));
    if (index === -1) {
      return res(ctx.status(404));
    }
    let todo = req.body as Todo;
    db[index] = todo;
    return res(ctx.status(200));
  }),
];
