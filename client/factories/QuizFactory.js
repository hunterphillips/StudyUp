'use strict';
angular.module('StudyU').factory('QuizFactory', $http => {
  return {
    getQuizQuestions(id) {
      return $http.get(`/quiz/${id}`).then(questions => {
        return questions.data;
      });
    }
  };
});
