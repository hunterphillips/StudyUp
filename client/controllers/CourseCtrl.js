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

    // console.log('Course Scope', $scope);

    // emits once the ngView content is loaded
    $scope.$on('$viewContentLoaded', function() {
      CourseFactory.getCourseInfo(+$routeParams.id, $routeParams.user).then(
        course => {
          // initialize $scope values
          $scope.courseId = +$routeParams.id;
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
          // filter current course matches out of matchlist
          course.matches = filterMatchesByCourse(
            course.matches,
            course.quizzes
          );
          // get classmate names for matches
          matchOpponents(course.matches, $scope.classMates);
          $scope.matches = course.matches;
        }
      );
    });

    // returns array containing only matches with current-course quizzes
    const filterMatchesByCourse = (matches, quizzes) => {
      let courseMatches = [];
      matches.forEach(match => {
        quizzes.forEach(quiz => {
          if (match.quiz_id === quiz.id) {
            courseMatches.push(match);
          }
        });
      });
      return courseMatches;
    };

    // match opponent/challenger id's with classmate names
    const matchOpponents = (matches, classmates) => {
      matches.forEach(match => {
        classmates.forEach(classmate => {
          if (
            match.opponent_id === classmate.id ||
            match.challenger_id === classmate.id
          ) {
            match.opponentName = classmate.username;
          }
        });
      });
    };

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
        opponent: +$scope.selectedOpponent,
        course: $scope.courseId,
        score: null
      };
      CourseFactory.postNewMatch(match).then(newMatch => {
        console.log('match added', newMatch);
        socketio.emit('newMatch', match);
        $location.path(`/quiz/${$scope.selectedQuiz}`).search({
          match: newMatch.data[0][0].MatchId,
          opponent: $scope.selectedOpponent
        });
      });
    };

    $scope.joinMatch = function() {
      // check user id against opponent and challenger id's
      let opponentId =
        this.match.opponent_id === $scope.user.id
          ? this.match.challenger_id
          : this.match.opponent_id;
      $location
        .path(`/quiz/${this.match.quiz_id}`)
        .search({ match: this.match.id, opponent: opponentId });
    };
  });
