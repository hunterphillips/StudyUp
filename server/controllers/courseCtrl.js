'use strict';

module.exports.getCourseById = (req, res, next) => {
  const Course = req.app.get('models').Course;
  // console.log('\n\ncOURSECTRL', req.param.id);
  Course.findById(req.params.id).then(foundCourse => {
    foundCourse.getQuizzes().then(quizzes => {
      let course = { title: foundCourse.title, quizzes: quizzes };
      res.status(200).json(course);
    });
  });
};
