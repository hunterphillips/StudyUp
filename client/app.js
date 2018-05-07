'use strict';
// import 'bulma/css/bulma.css';
angular.module('StudyU', ['ngRoute']).config($routeProvider => {
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
});

// TODO:   **** controller
// On page refresh, the currentUser set in the auth factory is lost, bc its a variable. We need to ask the backend for the user it has stored in session so we can reestablish current user. Below, we listen for a route change and call a method that will ping the backend for the logged-in user, then broadcast that information via a custom event to the listening controllers
// ( see the ****** controller)

angular
  .module('StudyU')
  .run(($rootScope, $location, $route, $window, AuthFactory) => {
    $rootScope.$on('$routeChangeStart', function() {
      AuthFactory.setUserStatus().then(() => {
        console.log('user', AuthFactory.getCurrentUser());
        // console.log('next', next);
        AuthFactory.broadcastUserLogin(AuthFactory.getCurrentUser());
      });
    });
  });
