'use strict';
angular.module('StudyUp').factory('BoardFactory', $http => {
  return {
    getStudents() {
      return $http.get(`/leaderboard`).then(students => {
        return students.data;
      });
    }
  };
});
