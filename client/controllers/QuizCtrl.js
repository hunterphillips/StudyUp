'use strict';
angular.module('StudyU').controller('QuizCtrl', function(
  $scope,
  QuizFactory,
  AuthFactory,
  $routeParams,
  $timeout
  // $location
) {
  //initialize
  $scope.questions = [];
  $scope.currentQuestion = 0;

  $scope.$on('handleBroadcast', function(event, currentUser) {
    $scope.user = currentUser;
  });

  $scope.$on('$viewContentLoaded', function() {
    QuizFactory.getQuizQuestions(+$routeParams.id).then(data => {
      $scope.questions = data;
      // apply default 'selected' value to each group of question answers
      $scope.questions.forEach(question => {
        $scope[`selected${question.id}`] = false; // ng-disabled in template
      });
    });
  });

  // update 'selected' value for this question's answers
  $scope.select = function() {
    $scope[`selected${this.answer.question_id}`] = true;
    // compare answer's id to question's answer_id and pass to updateScore
    updateUserScore(this.answer.id === this.$parent.question.answer_id);
    nextQuestion();
  };

  const updateUserScore = result => {
    result = result === true ? 10 : -5;
    QuizFactory.submitAnswer({ user_id: $scope.user.id, result: result });
  };

  const nextQuestion = () => {
    $timeout(function() {
      $scope.currentQuestion += 1;
    }, 1800);
  };

  // $scope.setDelay = function() {
  //   $scope.delay = true;
  //   $timeout(function() {
  //     $scope.delay = false;
  //   }, 1000);
  // };
});
