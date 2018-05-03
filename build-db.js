'use strict';

const models = require('./server/models');

const { generateHash } = require('./server/config/passport.js');

models.sequelize
  .sync({ force: true })
  .then(() => {
    return models.Role.create({
      title: 'administrator'
    });
  })
  .then(() => {
    return models.Role.create({
      title: 'user'
    });
  })
  .then(() => {
    return models.User.create({
      username: 'John',
      email: 'a@a.com',
      role_id: 1,
      password: generateHash('password123')
    });
  })
  .then(() => {
    return models.User.create({
      username: 'Ben',
      email: 'a@b.com',
      role_id: 2,
      password: generateHash('password123')
    });
  })
  .then(() => {
    process.exit();
  });
