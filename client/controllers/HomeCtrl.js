'use strict';
angular.module('StudyU').controller('HomeCtrl', function(
  $scope,
  HomeFactory,
  AuthFactory
  // $location
) {
  $scope.user = AuthFactory.getCurrentUser();

  HomeFactory.getUserCourses().then(userCourses => {
    $scope.courses = userCourses.data;
  });
});
