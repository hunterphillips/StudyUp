'use strict';
angular
  .module('StudyUp')
  .controller('HomeCtrl', function(
    $scope,
    HomeFactory,
    $location,
    AuthFactory,
    socketio
  ) {
    // get current user, set associated $scope values
    $scope.$on('handleBroadcast', function(event, currentUser) {
      $scope.user = currentUser;
      $scope.showNav = true;
      $scope.title = currentUser.username;
      getCurrentSchedule();
    });

    // set socket id for new client connection
    socketio.on('newSocket', data => {
      // assign new socket to current user
      socketio.emit('newUser', {
        user_id: $scope.user.id,
        socketId: data
      });
    });

    $scope.addCourse = function() {
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
        $scope.matches = catalog.matches;
        // notify user if they have open matches
        if ($scope.matches.length) {
          $scope.notification = true;
        }
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

    // Listen for newMatch event, add to user notifications
    socketio.on('newMatch', data => {
      $scope.matches.push(data);
      $scope.notification = true;
    });

    // Listen for gameover events,
    socketio.on('gameOver', data => {
      if (data.winner === $scope.user.id) {
        $scope.matchMessage = 'You won a match! +10';
      } else {
        $scope.matchMessage = 'You win some you lose some, -5';
      }
      $scope.notification = true;
    });

    $scope.removeMsg = function() {
      $scope.matchMessage = false;
      if (!$scope.matches.length) {
        $scope.notification = false;
      }
    };
  });
