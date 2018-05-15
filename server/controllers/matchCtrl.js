'use strict';

module.exports.addMatch = (
  { app, body: { quiz, challenger, opponent, course, score } },
  res,
  next
) => {
  // Add new match
  const { Match, User } = app.get('models');
  Match.create({
    quiz_id: quiz,
    course_id: course,
    challenger_id: challenger,
    opponent_id: opponent,
    score: score
  }).then(newMatch => {
    // Add match participants to user_matches
    User.findById(challenger).then(foundUser => {
      foundUser.addMatch(newMatch.dataValues.id).then(() => {
        User.findById(opponent)
          .then(foundUserTwo => {
            foundUserTwo.addMatch(newMatch.dataValues.id).then(data => {
              res.status(201).json(data);
            });
          })
          .catch(err => {
            next(err);
          });
      });
    });
  });
};

module.exports.getMatch = (req, res, next) => {
  const { Match } = req.app.get('models');
  Match.findById(req.params.id)
    .then(match => {
      res.status(201).json(match);
    })
    .catch(err => {
      next(err);
    });
};

module.exports.removeMatch = (
  { app, body: { match_id, user_id, finalScore } },
  res,
  next
) => {
  const { sequelize, Match } = app.get('models');
  Match.update({ score: finalScore }, { where: { id: match_id } }).then(() => {
    sequelize
      .query(
        `delete from user_matches where "MatchId"=${match_id} and "UserId"=${user_id}`
      )
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        next(err);
      });
  });
};
