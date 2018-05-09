'use strict';
angular.module('StudyUp').factory('CourseFactory', $http => {
  return {
    getCourseInfo(id) {
      return $http.get(`/course/${id}`).then(quizData => {
        return quizData.data;
      });
    }
  };
});
