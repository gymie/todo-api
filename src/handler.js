const { nanoid } = require('nanoid');
const { todos } = require('./todos');

const addTodoHandler = (request, h) => {
  const { todo } = request.payload;
  const id = nanoid(16);
  const now = new Date().toISOString();

  todos.push({
    id,
    todo,
    status: false,
    created_at: now,
    updated_at: now,
  });

  if (todos.findIndex((todo) => todo.id === id) !== -1) {
    return h.response({
      status: 'success',
      message: 'Berhasil menambahkan Todo item',
      data: {
        todoId: id,
      },
    }).code(201);
  }

  return h.response({
    status: 'fail',
    message: 'Gagal menambahkan Todo Item',
  }).code(500);
};

const getTodoByIdHandler = (request, h) => {
  const { id } = request.params;
  const todo = todos.find((todo) => todo.id === id);

  if (todo !== undefined) {
    return h.response({
      status: 'success',
      data: {
        todo,
      },
    }).code(200);
  }

  return h.response({
    status: 'fail',
    message: 'Todo item tidak ditemukan',
  }).code(404);
};

const getAllTodoHandler = (request, h) => h.response({
  status: 'success',
  data: {
    todos,
  },
});

const updateTodoByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = todos.findIndex((todo) => todo.id === id);

  if (index !== -1) {
    todos[index] = {
      ...todos[index],
      status: true,
      updated_at: new Date().toISOString(),
    };

    return h.response({
      status: 'success',
      message: 'Status Todo berhasil di update',
      data: {
        todo: todos[index],
      },
    });
  }

  return h.response({
    status: 'fail',
    message: 'Status todo gagal di update, id tidak ditemukan',
  }).code(404);
};

const deleteTodoHandler = (request, h) => {
  const { id } = request.params;
  const index = todos.findIndex((todo) => todo.id === id);

  if (index !== -1) {
    todos.splice(index, 1);

    return h.response({
      status: 'success',
      message: 'Berhasil hapus Todo item',
    }).code(200);
  }

  return h.response({
    status: 'fail',
    message: 'Gagal hapus todo item, id tidak ditemukan',
  }).code(404);
};

module.exports = {
  addTodoHandler,
  getTodoByIdHandler,
  getAllTodoHandler,
  updateTodoByIdHandler,
  deleteTodoHandler,
};
