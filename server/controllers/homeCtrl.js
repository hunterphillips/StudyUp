'use strict';

module.exports.getCourseList = (req, res, next) => {
  const Course = req.app.get('models').Course;
  const User = req.app.get('models').User;
  const catalog = {};

  User.findById(req.user.id).then(user => {
    user.getCourses().then(foundCourses => {
      catalog.userCourses = foundCourses;
      Course.findAll().then(courses => {
        catalog.available = courses;
        res.status(200).json(catalog);
      });
    });
  });
};

module.exports.addCourse = (
  { app, body: { user_id, course_id } },
  res,
  next
) => {
  let User = app.get('models').User;
  User.findById(user_id)
    .then(foundUser => {
      foundUser.addCourse(course_id).then(() => {
        res.status(201).end();
      });
    })
    .catch(err => {
      next(err);
    });
};
