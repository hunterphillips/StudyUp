'use strict';
angular
  .module('StudyU')
  .controller('AuthCtrl', function($scope, AuthFactory, $location) {
    $scope.account = {};

    $scope.register = () => {
      $scope.errorMsg = '';
      if ($scope.account.password !== $scope.account.passwordConf) {
        console.log('bad match');
        $scope.errorMsg =
          "Password and confirmation don't match. Please try again";
        return null;
      }
      AuthFactory.createUser($scope.account).then(user => {
        AuthFactory.broadcastUserLogin(user);
        // $location.path('/courses');
      });
    };

    $scope.login = () => {
      AuthFactory.loginUser($scope.account).then(user => {
        AuthFactory.broadcastUserLogin(user);
        $location.path('/movies');
      });
    };
  });
