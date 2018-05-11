'use strict';
angular
  .module('StudyUp')
  .controller('CourseCtrl', function(
    $scope,
    CourseFactory,
    $routeParams,
    $location,
    socketio
  ) {
    $scope.$on('handleBroadcast', function(event, currentUser) {
      $scope.user = currentUser;
      $scope.showNav = true;
    });

    console.log('Course Scope', $scope);

    // emits once the ngView content is loaded
    $scope.$on('$viewContentLoaded', function() {
      CourseFactory.getCourseInfo(+$routeParams.id).then(course => {
        // initialize $scope values
        $scope.quizzes = course.quizzes;
        $scope.title = course.title;
        $scope.classMates = course.users;
        // filter current user out of class list
        $scope.classMates = $scope.classMates.filter(user => {
          if (user.id === $scope.user.id) {
            return false;
          } else {
            return true;
          }
        });
        console.log('Classmates?', $scope.classMates);
      });
    });

    // update 'selected' quiz for this new game
    $scope.selectQuiz = function() {
      $scope.selectedQuiz = this.quiz.id;
      // negate any previous selections
      for (let i in $scope.quizzes) {
        $scope[`selected${+i + 1}`] = false;
      }
      $scope[`selected${this.quiz.id}`] = true;
    };

    $scope.startMatch = () => {
      let match = {
        quiz: $scope.selectedQuiz,
        challenger: $scope.user.id,
        opponent: +$scope.selectedOpponent
      };
      CourseFactory.postNewMatch(match).then(newMatch => {
        console.log('\nnewMatch posted');
        socketio.emit('newMatch', match);
      });
      // $location.path(`/quiz/${$scope.quizSelection}`);
    };
  });
