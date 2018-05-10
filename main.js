'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const socket = require('socket.io');
// auth
const session = require('express-session');
const passport = require('passport');

const routes = require('./server/routes/');
const port = process.env.PORT || 3000;

const app = express();

// using require('./models') may create >1 connection to database. To avoid, models variable must be singleton-esque: achieved by attaching models module to application:
app.set('models', require('./server/models')); //pulls in models/index.js by default.

//define paths for static files
app.use(express.static(__dirname + '/client'));
app.use('/angular', express.static(__dirname + '/node_modules/angular/'));
app.use(
  '/angular-route',
  express.static(__dirname + '/node_modules/angular-route/')
);

// Middleware Stack
// Inject session persistence into middleware stack
app.use(
  session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  }) // session secret
);

//execute passport strategies file
require('./server/config/passport.js');
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Modularized Routing
app.use(routes);

// save server in variable to pass to socket.io
const server = app.listen(3000, () => {
  console.log(`server listening on port ${port}`);
});

// Socket setup
const io = socket(server);

// event handling
io.on('connection', socket => {
  // emits id specific to each new connection
  console.log('Socket connection made, socket.id:', socket.id);
  // listen for 'answer' event (defined on front end)
  socket.on('answer', function(data) {
    io.sockets.emit('answer', data); // emit data to all connected sockets
  });
});

//
app.post('/matches', (req, res) => {
  io.emit('answer', req.body);
  return res.status(200);
});
