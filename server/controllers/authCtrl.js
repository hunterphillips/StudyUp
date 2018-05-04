'use strict';
const passport = require('passport');

module.exports.register = (req, res, next) => {
  // if (req.body.password === req.body.confirmation) { // move to client validation
  console.log('Trying to register new user');

  // first argument is name of the passport strategy we created in passport.js
  passport.authenticate('local-signup', (err, user, msgObj) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      console.log('Error registering', msgObj.message);
      res.status(409); //Conflict
      res.json({ message: msgObj.message });
    }

    // login the new user once they are signed up
    req.logIn(user, err => {
      if (err) {
        return next(err);
      }
      // console.log('authenticated!', user);
      res.status(200).json({ username: user.username, id: user.id });
    });
  })(req, res, next);
};

module.exports.login = (req, res, next) => {
  // Use strategy for logging in
  passport.authenticate('local-signin', (err, user, msgObj) => {
    // If login fails, the error is sent back by the passport strategy as { message: "some msg"}
    console.log('error msg?', msgObj);

    if (err) {
      return next(err);
    }
    if (!user) {
      console.log('Error logging in', msgObj.message);
      res.status(401); //(Unauthorized) indicates request not made, lacks valid auth credentials for the target resource.
      res.json({ message: msgObj.message });
    }

    req.logIn(user, err => {
      if (err) {
        return next(err);
      }
      // console.log('authenticated', user);
      res.status(200).json({ username: user.username, id: user.id });
    });
  })(req, res, next); // authenticate() is called within route handler, rather than as middleware. Gives callback access to req and res objects through closure.
};

// logging out
module.exports.logout = (req, res, next) => {
  req.session.destroy(function(err) {
    if (err) return next(err);
    res.status(200).end();
  });
};
