'use strict';
angular
  .module('StudyU')
  .controller('HomeCtrl', function(
    $scope,
    HomeFactory,
    AuthFactory,
    $location
  ) {
    $scope.user = AuthFactory.getCurrentUser();

    console.log('Home Scope', $scope);

    HomeFactory.getUserCourses().then(userCourses => {
      $scope.courses = userCourses.data;
    });

    $scope.goToClass = function() {
      $location.path(`/course/${this.course.id}`);
    };
  });
