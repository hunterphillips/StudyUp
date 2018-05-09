'use strict';
angular
  .module('StudyUp')
  .controller('HomeCtrl', function($scope, HomeFactory, $location) {
    $scope.$on('handleBroadcast', function(event, currentUser) {
      $scope.user = currentUser;
      $scope.showNav = true;
      $scope.title = currentUser.username;
    });

    $scope.$on('handleBroadcast', () => {
      getCurrentSchedule();
    });

    $scope.goToClass = function() {
      $location.path(`/course/${this.course.id}`);
    };

    $scope.addCourse = function() {
      console.log('\naddCourse called\n');
      HomeFactory.addUserCourse({
        user_id: $scope.user.id,
        course_id: this.course.id
      }).then(() => {
        getCurrentSchedule();
      });
    };

    const getCurrentSchedule = () => {
      HomeFactory.getUserCourses($scope.user.id).then(catalog => {
        $scope.courses = catalog.userCourses;
        $scope.availableCourses = catalog.available;
        // filter user courses out of Available list
        $scope.availableCourses = $scope.availableCourses.filter(available => {
          if ($scope.courses.find(course => course.id === available.id)) {
            return false;
          } else {
            return true;
          }
        });
      });
    };
  });
