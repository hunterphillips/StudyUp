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

app.listen(3000, () => {
  console.log(`server listening on port ${port}`);
});

// QUIZ DATA OPTIONS

// Your Quizlet Client ID jP7k2hxe2Y
// Your Secret Key (for user auth only):kC8TtMyu4XTFsKmnB5yAaG (reset)

// https://opentdb.com/api_config.php

// https://b.socrative.com/teacher/   ***** Current Choice ****
