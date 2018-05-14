'use strict';

module.exports.getCourseList = (req, res, next) => {
  const catalog = {};

  const User = req.app.get('models').User;
  User.findById(req.user.id).then(user => {
    user.getCourses().then(foundCourses => {
      catalog.userCourses = foundCourses;
      user.getMatches().then(matches => {
        catalog.matches = matches;
        const Course = req.app.get('models').Course;
        Course.findAll()
          .then(courses => {
            catalog.available = courses;
            res.status(200).json(catalog);
          })
          .catch(err => {
            next(err);
          });
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
