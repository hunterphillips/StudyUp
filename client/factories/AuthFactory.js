'use strict';

angular.module('StudyU').factory('AuthFactory', ($q, $http, $rootScope) => {
  let currentUser = null;

  return {
    createUser(userObj) {
      return $q((resolve, reject) => {
        $http
          .post('/register', userObj)
          .then(userData => {
            console.log('new user added', userData);
            currentUser = userData;
            resolve(userData.data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    loginUser(userObj) {
      console.log('userObj', userObj);
      return $q((resolve, reject) => {
        $http
          .post('/login', userObj)
          .then(user => {
            currentUser = user.data;
            resolve(user.data);
          })
          .catch(err => {
            reject(err);
          });
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
          console.log('user in set user status', user);

          if (user) {
            currentUser = user.data;
          } else {
            currentUser = null;
          }
        })
        .catch(() => {
          currentUser = null;
        });
    },

    broadcastUserLogin(user) {
      console.log('calling broadcast', user);
      $rootScope.$broadcast('handleBroadcast', user);
    }
  };
});
