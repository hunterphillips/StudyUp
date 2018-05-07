'use strict';
angular.module('StudyU').controller('QuizCtrl', function(
  $scope,
  QuizFactory,
  AuthFactory,
  $routeParams
  // $location
) {
  $scope.user = AuthFactory.getCurrentUser();

  console.log('Quiz Scope', $scope);

  $scope.$on('$viewContentLoaded', function() {
    QuizFactory.getQuizQuestions(+$routeParams.id).then(data => {
      // console.log('QuizCtrl\n', data);
      $scope.questions = data;
    });
  });
});
