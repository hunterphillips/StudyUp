'use strict';
angular.module('StudyU').factory('HomeFactory', $http => {
  const getUserCourses = () => {
    return $http.get(`/home`);
  };
  return { getUserCourses };
});
