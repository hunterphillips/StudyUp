'use strict';

module.exports.getQuiz = (req, res, next) => {
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
    Promise.all(chain)
      .then(() => {
        let quiz = {
          match: +req.query.match,
          questions: foundQuestions
        };
        res.status(200).json(quiz);
      })
      .catch(err => {
        next(err);
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

module.exports.getOpponent = (req, res, next) => {
  const User = req.app.get('models').User;
  User.findById(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      next(err);
    });
};

module.exports.updateUserScore = (
  { app, body: { user_id, result } },
  res,
  next
) => {
  let User = app.get('models').User;
  User.update({ score: result }, { where: { id: user_id } })
    .then(() => {
      res.status(201).end();
    })
    .catch(err => {
      next(err);
    });
};
