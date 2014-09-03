var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var Mongoose = require('mongoose');
var db = Mongoose.createConnection('localhost', 'mytestapp');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', routes);
app.use('/users', users);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

var todos = [
    {
        description: "Buy eggs",
        due: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), // 1 day from now
        done: false
    },
    {
        description: "Write next blog post",
        due: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
        done: false
    },
    {
        description: "Build todo list app",
        due: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
        done: true
    }
];

app.get('/', routes.index(todos));
// app.get('/users', user.list);

app.post('/todo.json', routes.addTodo(todos));

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(3000);


module.exports = app;
