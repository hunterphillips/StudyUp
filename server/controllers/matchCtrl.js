'use strict';

module.exports.addMatch = (
  { app, body: { quiz, challenger, opponent } },
  res,
  next
) => {
  //Add new match
  let Match = app.get('models').Match;
  Match.create({
    quiz_id: quiz
  }).then(newMatch => {
    console.log('Match added?', newMatch.dataValues);
    // Update match_id for match participants
    let User = app.get('models').User;
    User.update(
      { match_id: newMatch.dataValues.id },
      { where: { id: challenger } }
    ).then(() => {
      User.update(
        { match_id: newMatch.dataValues.id },
        { where: { id: opponent } }
      )
        .then(data => {
          res.status(201).end();
        })
        .catch(err => {
          next(err);
        });
    });
  });
};
