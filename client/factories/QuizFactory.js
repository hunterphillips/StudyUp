'use strict';
angular.module('StudyUp').factory('QuizFactory', $http => {
  return {
    getQuizQuestions(id) {
      return $http.get(`/quiz/${id}`).then(questions => {
        return questions.data;
      });
    },

    submitAnswer(obj) {
      return $http.post('/quiz/', obj).then(data => {
        return data;
      });
    }

    // emitAnswer(obj) {
    //   console.log('\nEMIT ANSWER CALLED\n');
    //   return $http.post('/matches', obj).then(data => {
    //     return data;
    //   });
    // }
  };
});
