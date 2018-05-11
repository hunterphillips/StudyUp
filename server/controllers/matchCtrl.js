'use strict';

module.exports.addMatch = (
  { app, body: { quiz, challenger, opponent } },
  res,
  next
) => {
  // Add new match
  let Match = app.get('models').Match;
  Match.create({
    quiz_id: quiz,
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
              res.status(201).end();
            });
          })
          .catch(err => {
            next(err);
          });
      });
    });
  });
};
