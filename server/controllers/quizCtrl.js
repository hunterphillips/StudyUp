'use strict';

module.exports.getQuizQuestions = (req, res, next) => {
  const Question = req.app.get('models').Question;
  const Answer = req.app.get('models').Answer;
  // sequelize method return all questions with matching quiz_id
  Question.findAll({
    where: { quiz_id: req.params.id }
  }).then(foundQuestions => {
    // for each question, return corresponding answers
    let chain = []; // store set of promises to resolve
    foundQuestions.forEach(question => {
      chain.push(getAnswers(Answer, question));
    });
    Promise.all(chain).then(() => {
      res.status(200).json(foundQuestions);
    });
  });
};

// for a given sequelize model, attach results to a given object (question)
const getAnswers = (model, question) => {
  return new Promise((resolve, reject) => {
    // wrap in promise for Promise.all
    model
      .findAll({
        where: { question_id: question.id }
      })
      .then(answers => {
        question.dataValues.answers = answers;
        resolve(question);
      });
  });
};
