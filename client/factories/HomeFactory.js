'use strict';
angular.module('StudyU').factory('HomeFactory', $http => {
  return {
    getUserCourses() {
      return $http.get(`/home`);
    }
  };
});
