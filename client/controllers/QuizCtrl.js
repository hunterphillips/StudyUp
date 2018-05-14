'use strict';
angular
  .module('StudyUp')
  .controller('QuizCtrl', function(
    $scope,
    QuizFactory,
    $routeParams,
    $location,
    $timeout,
    socketio
  ) {
    //initialize
    $scope.questions = [];
    $scope.currentQuestion = 0;
    //track quiz results
    $scope.score = 0;

    $scope.$on('handleBroadcast', function(event, currentUser) {
      $scope.user = currentUser;
    });

    $scope.$on('$viewContentLoaded', function() {
      QuizFactory.getQuizInfo(+$routeParams.id, $routeParams.match).then(
        quiz => {
          console.log('QuizCtrl quiz info:', quiz);
          $scope.matchId = quiz.match;
          $scope.questions = quiz.questions;
          shuffleArray($scope.questions);
          // apply default 'selected' value to each group of question answers
          $scope.questions.forEach(question => {
            $scope[`selected${question.id}`] = false; // ng-disabled in template
            // randomize answer order
            shuffleArray(question.answers);
          });
        }
      );
      QuizFactory.getOpponentInfo($routeParams.opponent).then(foundOpponent => {
        // console.log('QuizCtrl returned opponent', foundOpponent);
        $scope.opponent = foundOpponent;
      });
    });

    // function to randomize order of an array (for quiz questions/answers)
    const shuffleArray = array => {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    };

    // update 'selected' value for this question's answers
    $scope.select = function() {
      this.selected = true;
      $scope[`selected${this.answer.question_id}`] = true;
      // compare answer's id to question's answer_id and pass to updateScore
      updateUserScore(this.answer.id === this.$parent.question.answer_id);
      nextQuestion();
    };

    const updateUserScore = result => {
      result = result === true ? 1 : 0;
      $scope.score += result;
      QuizFactory.submitAnswer({ user_id: $scope.user.id, result: result });
    };

    const nextQuestion = () => {
      $timeout(function() {
        $scope.currentQuestion += 1;
        if ($scope.currentQuestion === $scope.questions.length) {
          // convert quiz score to %
          $scope.score = $scope.score / $scope.questions.length * 100;
          $scope.completed = true;
        }
      }, 1800);
      $timeout.cancel();
    };

    // remove
    $scope.endGame = () => {
      QuizFactory.endUserMatch($scope.matchId, {
        user_id: $scope.user.id,
        match_id: $scope.matchId
      }).then(() => {
        console.log('match ended');
      });
    };

    // emit quiz result through socketio
    // socketio.emit('finished', {
    //   user_id: $scope.user.id,
    //   result: $scope.score
    // });

    // socketio.on('answer', data => {
    //   // if wrong answer, 'end quiz' by skipping to end
    //   if (!data.result) {
    //     $scope.currentQuestion = $scope.questions.length - 1;
    //   } else {
    //     $scope.matchTurn = `User ${data.user_id} answered this correctly`;
    //   }
    // });
  });
