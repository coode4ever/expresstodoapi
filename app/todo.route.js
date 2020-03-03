module.exports = app => {
  const todos = require("./todo.controller.js");

  app.post("/api/todos", todos.createTodo);

  app.get("/api/todos", todos.findAllTodo);

  app.get("/api/todos/:todoId", todos.findOneTodo);

  app.delete("/api/todos/:todoId", todos.deleteTodo);

  app.put("/api/todos/:todoId", todos.updateTodo);
};
