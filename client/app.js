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
        link: function(scope, elem, attrs) {
          elem.bind('click', function() {
            $window.history.back();
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
