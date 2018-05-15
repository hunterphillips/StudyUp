'use strict';
angular.module('StudyUp').factory('QuizFactory', $http => {
  return {
    getQuizInfo(id, match) {
      return $http.get(`/quiz/${id}?match=${match}`).then(quiz => {
        return quiz.data;
      });
    },

    getOpponentInfo(id) {
      return $http.get(`/opponent/${id}`).then(user => {
        return user.data;
      });
    },

    submitScore(obj) {
      return $http.post('/quiz/', obj).then(data => {
        return data;
      });
    },

    endUserMatch(id, userMatch) {
      return $http.post(`/match/${id}`, userMatch);
    }
  };
});
