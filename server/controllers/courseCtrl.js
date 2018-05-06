'use strict';

module.exports.getCourseById = (req, res, next) => {
  const Course = req.app.get('models').Course;
  // console.log('\n\ncOURSECTRL', req.param.id);
  Course.findById(req.params.id).then(course => {
    course.getQuizzes().then(quizzes => {
      // console.log('\nQUIZES', quizzes);
      res.status(200).json(quizzes);
    });
  });
};
