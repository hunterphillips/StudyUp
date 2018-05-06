'use strict';
angular.module('StudyU').factory('CourseFactory', $http => {
  return {
    getCourseQuizzes(id) {
      return $http.get(`/course/${id}`).then(quizData => {
        return quizData.data;
      });
    }
  };
});
