'use strict';
angular.module('StudyUp').factory('HomeFactory', ($http, $location) => {
  return {
    getUserCourses(id) {
      if (id) {
        return $http.get(`/home`).then(results => {
          return results.data;
        });
      } else {
        $location.path(`/`);
      }
    },

    addUserCourse(course) {
      return $http.post('/home', course).then(data => {
        return data;
      });
    }
  };
});
