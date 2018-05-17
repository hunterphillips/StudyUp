'use strict';
angular.module('StudyUp').controller('BoardCtrl', function(
  $scope,
  BoardFactory
  // $location
) {
  $scope.showNav = true;
  $scope.leaderboard = true;
  $scope.title = 'Leaderboard';

  // get current user, set associated $scope values
  $scope.$on('handleBroadcast', function(event, currentUser) {
    $scope.user = currentUser;
  });

  $scope.$on('$viewContentLoaded', () => {
    BoardFactory.getStudents().then(foundStudents => {
      console.log('BoardCtrl students', foundStudents);
      $scope.students = foundStudents;
    });
  });
});
