'use strict';
const express = require('express');
const bodyParser = require('body-parser');
// auth
const session = require('express-session');
const passport = require('passport');

const routes = require('./server/routes/');
const port = process.env.PORT || 5000;

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
const server = app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});

// Socket setup
const socket = require('socket.io');
const io = socket(server);
// Store clients
const clients = [
  { user_id: 1, socketId: 1 },
  { user_id: 2, socketId: 2 },
  { user_id: 3, socketId: 3 },
  { user_id: 4, socketId: 4 },
  { user_id: 5, socketId: 5 },
  { user_id: 6, socketId: 6 },
  { user_id: 7, socketId: 7 },
  { user_id: 8, socketId: 8 },
  { user_id: 9, socketId: 9 },
  { user_id: 10, socketId: 10 }
];

// event handling
io.on('connection', socket => {
  // emit socket id to self (client)
  socket.emit('newSocket', socket.id);

  // newUser event emitted from client --> contains userId with socketId
  // if user exists -> replace socket id, else add user
  socket.on('newUser', function(data) {
    if (clients.find(client => client.user_id === data.user_id)) {
      clients[
        clients.map(user => user.user_id).indexOf(data.user_id)
      ].socketId = data.socketId;
    } else {
      clients.push(data);
    }
  });

  // listen for 'newMatch' event (defined on front end)
  socket.on('newMatch', function(data) {
    console.log('newMatch mainjs', data);
    socket // emit to target client (by socketId)
      .to(
        clients[clients.map(user => user.user_id).indexOf(data.opponent)]
          .socketId
      )
      .emit('newMatch', data);
  });

  // notify gameOver
  socket.on('gameOver', function(data) {
    console.log('\nGame Ended:\n', data, '\n');
    socket // emit to target clients (by socketId)
      .to(
        clients[clients.map(user => user.user_id).indexOf(data.winner)].socketId
      )
      .emit('gameOver', data);
    socket
      .to(
        clients[clients.map(user => user.user_id).indexOf(data.loser)].socketId
      )
      .emit('gameOver', data);
  });
});
