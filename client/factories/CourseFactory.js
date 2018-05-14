'use strict';
angular.module('StudyUp').factory('CourseFactory', $http => {
  return {
    getCourseInfo(id, user) {
      return $http.get(`/course/${id}?user=${user}`).then(courseInfo => {
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
