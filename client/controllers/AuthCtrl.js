'use strict';
angular
  .module('StudyUp')
  .controller('AuthCtrl', function($scope, AuthFactory, $location) {
    $scope.account = {};

    $scope.register = () => {
      $scope.errorMsg = '';
      if ($scope.newAccount.password !== $scope.newAccount.passwordConf) {
        $scope.errorMsg =
          "Password and confirmation don't match. Please try again";
        return null;
      }
      AuthFactory.createUser($scope.newAccount).then(() => {
        AuthFactory.loginUser($scope.newAccount).then(user => {
          AuthFactory.broadcastUserLogin(user);
          $location.path('/home');
        });
      });
    };

    $scope.login = () => {
      AuthFactory.loginUser($scope.account).then(user => {
        AuthFactory.broadcastUserLogin(user);
        $location.path('/home');
      });
    };
  });
