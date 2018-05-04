'use strict';

module.exports.getCourseList = (req, res, next) => {
  console.log('homeCtrl do something eventually');
  const User = req.app.get('models').User;
  User.findById(req.user.id).then(user => {
    user.getCourses().then(courses => {
      res.status(200).json(courses);
    });
  });
};

// module.exports.addCourse = (
//   { app, body: { user_id, course_id } },
//   res,
//   next
// ) => {
//   let User = app.get('models').User;
//   User.findById({ user_id })
//     .then(foundUser => {
//       foundUser.addCourse({course_id});
//     })
//     .catch(err => {
//       next(err);
//     });
// };
