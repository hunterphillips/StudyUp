'use strict';
angular.module('StudyUp').factory('CourseFactory', $http => {
  return {
    getCourseInfo(id) {
      return $http.get(`/course/${id}`).then(courseInfo => {
        return courseInfo.data;
      });
    },

    postNewMatch(match) {
      return $http.post('/match', match).then(data => {
        return data;
      });
    }
  };
});
