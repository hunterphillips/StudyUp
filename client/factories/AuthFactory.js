'use strict';

angular
  .module('StudyUp')
  .factory('AuthFactory', ($q, $http, $rootScope, $location) => {
    let currentUser = null;

    return {
      createUser(userObj) {
        return $http.post('/register', userObj).then(userData => {
          // console.log('new user added', userData);
          currentUser = userData;
          return userData.data;
        });
      },

      loginUser(userObj) {
        // console.log('userObj', userObj);
        return $http.post('/login', userObj).then(user => {
          currentUser = user.data;
          $http.get('/home');
          return user.data;
        });
      },

      getCurrentUser() {
        return currentUser;
      },

      // This is called from app.js as a way of confirming whether or not we have a loged-in user. If so, we set currentUser to that value
      setUserStatus() {
        return $http
          .get('/status')
          .then(user => {
            if (user) {
              currentUser = user.data;
              // $http.get('/home');
            } else {
              currentUser = null;
            }
          })
          .catch(() => {
            currentUser = null;
          });
      },

      broadcastUserLogin(user) {
        // if no user id found, reroute to login page
        if (!user.id) {
          console.error(`User not found`);
          $location.path(`/`);
        } else {
          $rootScope.$broadcast('handleBroadcast', user);
        }
      }
    };
  });
