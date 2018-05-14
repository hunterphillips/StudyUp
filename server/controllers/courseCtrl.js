'use strict';

module.exports.getCourseById = (req, res, next) => {
  const Course = req.app.get('models').Course;
  Course.findById(req.params.id).then(foundCourse => {
    foundCourse.getQuizzes().then(quizzes => {
      let course = { title: foundCourse.title, quizzes: quizzes };
      foundCourse.getUsers().then(users => {
        course.users = users;
        const User = req.app.get('models').User;
        User.findById(req.query.user).then(user => {
          user
            .getMatches()
            .then(matches => {
              course.matches = matches;
              res.status(200).json(course);
            })
            .catch(err => {
              next(err);
            });
        });
      });
    });
  });
};
