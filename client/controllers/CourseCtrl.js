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

    // $scope.$on('$routeChangeSuccess': every time parameters in url changed
    //  emits every time the ngView content is reloaded
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
