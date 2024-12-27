import { http, HttpResponse } from 'msw';

const db = [
  {
    id: 1,
    title: 'Pay bills',
    description: '',
    done: true,
    createdAt: '2024-12-28T03:28:47+08:00',
    updatedAt: '2024-12-28T03:28:47+08:00'
  },
  {
    id: 2,
    title: 'Read a book',
    description: '',
    done: false,
    createdAt: '2024-12-28T03:28:47+08:00',
    updatedAt: '2024-12-28T03:28:47+08:00'
  },
  {
    id: 3,
    title: 'Buy eggs',
    description: '',
    done: false,
    createdAt: '2024-12-28T03:28:47+08:00',
    updatedAt: '2024-12-28T03:28:47+08:00'
  }
];

export const handlers = [
  http.get('/api/todos', () => {
    return HttpResponse.json(db);
  }),
  http.get('/api/todos/:id', ({ params }) => {
    const { id } = params;
    const todo = db.find((x) => x.id === Number(id));
    if (todo === undefined) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(todo);
  }),
  http.post('/api/todos', async ({ request }) => {
    const todo = (await request.json());
    if (!todo.id) {
      todo.id = db.length > 0 ? Math.max(...db.map((x) => x.id)) + 1 : 1;
    }
    db.push(todo);
    return HttpResponse.json(todo);
  }),
  http.delete('/api/todos/:id', ({ params }) => {
    const { id } = params;
    const index = db.findIndex((x) => x.id === Number(id));
    if (index === -1) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(db.splice(index, 1)[0]);
  }),
  http.put('/api/todos/:id', async ({ params, request }) => {
    const { id } = params;
    const index = db.findIndex((x) => x.id === Number(id));
    if (index === -1) {
      return new HttpResponse(null, { status: 404 });
    }
    const todo = (await request.json());
    db[index] = todo;
    return new HttpResponse(null, { status: 200 });
  }),
];
