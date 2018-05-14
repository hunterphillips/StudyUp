'use strict';

module.exports.addMatch = (
  { app, body: { quiz, challenger, opponent, course } },
  res,
  next
) => {
  // Add new match
  let Match = app.get('models').Match;
  Match.create({
    quiz_id: quiz,
    course_id: course,
    challenger_id: challenger,
    opponent_id: opponent
  }).then(newMatch => {
    // Add match participants to user_matches
    let User = app.get('models').User;
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

module.exports.removeMatch = (
  { app, body: { match_id, user_id } },
  res,
  next
) => {
  const { sequelize } = app.get('models');
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
};
