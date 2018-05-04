'use strict';
// import 'bulma/css/bulma.css';
angular.module('StudyU', ['ngRoute']).config($routeProvider => {
  //
  $routeProvider
    .when('/home', {
      templateUrl: 'partials/home.html',
      controller: 'HomeCtrl'
    })
    .when('/', {
      templateUrl: 'partials/auth-form.html',
      controller: 'AuthCtrl'
    })
    .otherwise('/');
});

// On page refresh, the currentUser set in the auth factory is lost, bc its a variable. We need to ask the backend for the user it has stored in session so we can reestablish current user. Below, we listen for a route change and call a method that will ping the backend for the logged-in user, then broadcast that information via a custom event to the listening controllers
// ( see the course controller)

angular
  .module('StudyU')
  .run(($rootScope, $location, $route, $window, AuthFactory) => {
    $rootScope.$on('$routeChangeStart', function(event, next) {
      AuthFactory.setUserStatus().then(() => {
        console.log('user', AuthFactory.getCurrentUser());
        console.log('next', next);
        AuthFactory.broadcastUserLogin(AuthFactory.getCurrentUser());
      });
    });
  });
