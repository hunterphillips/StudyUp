'use strict';
// import 'bulma/css/bulma.css';
angular
  .module('StudyUp', ['ngRoute', 'ngAnimate'])
  .config($routeProvider => {
    //
    $routeProvider
      .when('/', {
        templateUrl: 'partials/auth-form.html',
        controller: 'AuthCtrl'
      })
      .when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      })
      .when('/course/:id', {
        templateUrl: 'partials/course.html',
        controller: 'CourseCtrl'
      })
      .when('/quiz/:id', {
        templateUrl: 'partials/quiz.html',
        controller: 'QuizCtrl'
      })
      .otherwise('/');
  })

  // Nav Directive
  .directive('navbar', function() {
    return {
      scope: true,
      restrict: 'EA',
      templateUrl: 'partials/nav-bar.html'
    };
  })
  // Back Button Directive
  .directive('back', [
    '$window',
    function($window) {
      return {
        restrict: 'A',
        link: function(scope, elem) {
          elem.bind('click', function() {
            $window.history.back();
          });
        }
      };
    }
  ])

  // service to wrap the socket object returned by Socket.IO
  .factory('socketio', [
    '$rootScope',
    function($rootScope) {
      const socket = io.connect();
      return {
        on: function(eventName, callback) {
          socket.on(eventName, function() {
            var args = arguments;
            $rootScope.$apply(function() {
              callback.apply(socket, args);
            });
          });
        },
        emit: function(eventName, data, callback) {
          socket.emit(eventName, data, function() {
            var args = arguments;
            $rootScope.$apply(function() {
              if (callback) {
                callback.apply(socket, args);
              }
            });
          });
        }
      };
    }
  ]);

// On page refresh, the currentUser set in the auth factory is lost. We ask the backend for the user stored in session -> listen for a route change and call a method that pings the backend for the logged-in user, then broadcast that information via a custom event to the listening controllers
//
angular
  .module('StudyUp')
  .run(($rootScope, $location, $route, $window, AuthFactory) => {
    $rootScope.$on('$routeChangeSuccess', function() {
      AuthFactory.setUserStatus().then(() => {
        console.log('user', AuthFactory.getCurrentUser());
        AuthFactory.broadcastUserLogin(AuthFactory.getCurrentUser());
      });
    });
  });

//
//
// TODO: loading gif
// $scope.setDelay = function() {
//   $scope.delay = true;
//   $timeout(function() {
//     $scope.delay = false;
//   }, 1000);
// };
