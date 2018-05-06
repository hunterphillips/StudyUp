'use strict';
angular.module('StudyU').factory('HomeFactory', $http => {
  const getUserCourses = () => {
    return $http.get(`/home`);
  };
  const getCourseDetails = id => {
    return $http.get(`/course/${id}`);
  };
  return { getUserCourses, getCourseDetails };
});
