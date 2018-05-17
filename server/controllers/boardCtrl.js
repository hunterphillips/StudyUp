'use strict';

module.exports.getAppStudents = (req, res, next) => {
  const { User } = req.app.get('models');
  // retrieve all 'student' users
  User.findAll({ where: { role_id: 2 } })
    .then(users => {
      res.status(201).json(users);
    })
    .catch(err => {
      next(err);
    });
};
