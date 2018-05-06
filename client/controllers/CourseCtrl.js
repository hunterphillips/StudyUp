'use strict';
angular
  .module('StudyU')
  .controller('CourseCtrl', function(
    $scope,
    CourseFactory,
    AuthFactory,
    $routeParams
  ) {
    $scope.user = AuthFactory.getCurrentUser();

    // $scope.$on('$routeChangeSuccess': every time parameters in url changed
    //  emits every time the ngView content is reloaded
    $scope.$on('$viewContentLoaded', function() {
      CourseFactory.getCourseQuizzes(+$routeParams.id).then(quizList => {
        console.log('CourseCtrl\n', quizList);
        $scope.quizzes = quizList;
      });
    });
  });
