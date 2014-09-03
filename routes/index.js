var express = require('express');
var router = express.Router();

/* GET home page. */
exports.index = function(todos) {
  return function(req, res) {
    res.render('index', {
      title: 'Express',
      todos: todos
    });
  };
};

exports.addTodo = function(todos) {
  return function(req, res) {
    todos.push(req.body);
    res.json({ todos : todos });
  };
};

// module.exports = router;
