'use strict';
angular
  .module('StudyUp')
  .controller('QuizCtrl', function(
    $scope,
    QuizFactory,
    $routeParams,
    $location,
    $timeout,
    $interval,
    socketio
  ) {
    //initialize
    $scope.questions = [];
    $scope.currentQuestion = 0;
    $scope.Timer = null;
    $scope.score = 0; // track quiz results

    $scope.$on('handleBroadcast', function(event, currentUser) {
      $scope.user = currentUser;
      $scope.showNav = true;
      $scope.quizView = true;
    });

    $scope.$on('$viewContentLoaded', function() {
      QuizFactory.getQuizInfo(+$routeParams.id, $routeParams.match).then(
        quiz => {
          $scope.timerCount = 15; // initialize timer
          $scope.StartTimer();
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
        $scope.opponent = foundOpponent;
      });
      QuizFactory.getMatchInfo($routeParams.match).then(match => {
        $scope.matchId = match.id;
        $scope.matchScore = match.score;
      });
    });

    //Timer start function.
    $scope.StartTimer = function() {
      $scope.timeUp = false;
      $scope.Timer = $interval(function() {
        if ($scope.timerCount === 0) {
          $scope.select();
        } else {
          $scope.timerCount--;
        }
      }, 1000);
    };

    //Timer stop function.
    $scope.StopTimer = function() {
      $scope.timeUp = true;
      //Cancel the Timer.
      if (angular.isDefined($scope.Timer)) {
        $interval.cancel($scope.Timer);
      }
    };

    // function to randomize order of an array (for quiz questions/answers)
    const shuffleArray = array => {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    };

    // update 'selected' value for this question's answers
    $scope.select = function() {
      $scope.StopTimer();
      // if nothing selected
      if (!this.answer) {
        $scope[`selected0`] = true;
        updateQuizScore(false);
        nextQuestion();
      } else {
        this.selected = true;
        $scope[`selected${this.answer.question_id}`] = true;
        // compare answer's id to question's answer_id and pass to updateScore
        updateQuizScore(this.answer.id === this.$parent.question.answer_id);
        nextQuestion();
      }
    };

    // right answer award user + 2, else - 1
    const updateQuizScore = result => {
      if (result === true) {
        result = 1;
        $scope.user.score += 2;
      } else {
        result = 0;
        if ($scope.user.score > 0) {
          $scope.user.score += -1; // minimun user score = 0
        }
      }
      $scope.score += result;
    };

    const nextQuestion = () => {
      $timeout(function() {
        $scope[`selected0`] = false; // initialize 'none selected' to false
        $scope.timerCount = 15; // reset timer value
        $scope.StartTimer();
        $scope.currentQuestion += 1;
        if ($scope.currentQuestion === $scope.questions.length) {
          // convert quiz score to %
          $scope.scoreGrade = $scope.score / $scope.questions.length * 100;
          $scope.completed = true;
          QuizFactory.submitScore({
            user_id: $scope.user.id,
            result: $scope.user.score
          });
          determineWinner();
        }
      }, 1800);
      $timeout.cancel();
    };

    // Check match score, announce winner if valid
    const determineWinner = () => {
      if ($scope.matchScore != null) {
        if ($scope.matchScore < $scope.score) {
          $scope.won = true;
          $scope.score += 10;
          socketio.emit('gameOver', {
            winner: $scope.user.id,
            loser: $scope.opponent.id
          });
        } else if ($scope.matchScore > $scope.score) {
          $scope.lost = true;
          if ($scope.score > 5) {
            $scope.score += -5;
          }
          socketio.emit('gameOver', {
            winner: $scope.opponent.id,
            loser: $scope.user.id
          });
        }
      } else {
        return null;
      }
    };

    // end quiz, take user to course menu
    $scope.endUserGame = () => {
      QuizFactory.endUserMatch($scope.matchId, {
        user_id: $scope.user.id,
        match_id: $scope.matchId,
        finalScore: $scope.score
      }).then(() => {
        console.log('user_match ended');
      });
    };
  });
