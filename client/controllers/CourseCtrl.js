'use strict';
angular
  .module('StudyUp')
  .controller('CourseCtrl', function(
    $scope,
    CourseFactory,
    $routeParams,
    $location
  ) {
    $scope.$on('handleBroadcast', function(event, currentUser) {
      $scope.user = currentUser;
      $scope.showNav = true;
    });

    console.log('Course Scope', $scope);

    // emits once the ngView content is loaded
    $scope.$on('$viewContentLoaded', function() {
      CourseFactory.getCourseInfo(+$routeParams.id).then(course => {
        // console.log('CourseCtrl\n', quizList);
        $scope.quizzes = course.quizzes;
        $scope.title = course.title;
      });
    });

    $scope.takeQuiz = function() {
      $location.path(`/quiz/${this.quiz.id}`);
    };
  });
