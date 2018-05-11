'use strict';

module.exports.addMatch = (
  { app, body: { quiz, challenger, opponent } },
  res,
  next
) => {
  console.log('\naddMatch in matchCrl\n');
  let Match = app.get('models').Match;
  Match.create({
    quiz_id: quiz
  })
    .then(data => {
      console.log('Match added?', data);
    })
    .catch(err => {
      next(err);
    });
};
