'use strict';
const express = require('express');
const bodyParser = require('body-parser');
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
const socket = require('socket.io');
const io = socket(server);

// event handling
io.on('connection', socket => {
  // emits id specific to each new connection
  console.log('\nSocket connection made, socket.id:\n', socket.id, '\n');
  // listen for 'newMatch' event (defined on front end)
  socket.on('newMatch', function(data) {
    console.log('\nNew Match created:\n', data, '\n');
    io.sockets.emit('newMatch', data); // emit data to all connected sockets
  });
  // listen for 'answer' event
  socket.on('answer', function(data) {
    socket.broadcast.emit('answer', data); // broadcast to other sockets
  });
});

//
// app.post('/matches', (req, res) => {
//   io.emit('answer', req.body);
//   return res.status(200);
// });
