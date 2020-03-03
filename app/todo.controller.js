const Todo = require("./todo.model.js");

exports.createTodo = (req, res) => {
  if (!req.body.title || !req.body.description) {
    return res.status(400).send({
      message: "Some field is missing"
    });
  }
  const todo = new Todo(req.body);
  todo
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the todo."
      });
    });
};

exports.findAllTodo = (req, res) => {
  Todo.find()
    .sort("-createdAt")
    .then(todos => {
      res.send(todos);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving todos."
      });
    });
};

exports.findOneTodo = (req, res) => {
  Todo.findById(req.params.todoId)
    .then(todo => {
      if (!todo) {
        return res.status(404).send({
          message: "Todo not found with id " + req.params.todoId
        });
      }
      res.send(todo);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Todo not found with id " + req.params.todoId
        });
      }
      return res.status(500).send({
        message: "Error retrieving todo with id " + req.params.todoId
      });
    });
};

exports.updateTodo = (req, res) => {
  Todo.findByIdAndUpdate(req.params.todoId, req.body, {
    new: true
  })
    .then(todo => {
      if (!todo) {
        return res.status(404).send({
          message: "Todo not found with id " + req.params.todoId
        });
      }
      res.send(todo);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Todo not found with id " + req.params.todoId
        });
      }
      return res.status(500).send({
        message: "Error updating todo with id " + req.params.todoId
      });
    });
};

exports.deleteTodo = (req, res) => {
  Todo.findByIdAndRemove(req.params.todoId)
    .then(todo => {
      if (!todo) {
        return res.status(404).send({
          message: "Todo not found with id " + req.params.todoId
        });
      }
      res.send({ message: "Todo deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Todo not found with id " + req.params.todoId
        });
      }
      return res.status(500).send({
        message: "Could not delete todo with id " + req.params.todoId
      });
    });
};
