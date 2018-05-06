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

    HomeFactory.getUserCourses().then(userCourses => {
      // console.log('USER?', $scope.user);
      $scope.courses = userCourses.data;
    });

    $scope.goToClass = function() {
      // console.log('goToClass', this.course.id);
      HomeFactory.getCourseDetails(this.course.id);
      $location.path(`/course/${this.course.id}`);
    };
  });
