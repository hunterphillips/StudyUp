'use strict';
const models = require('./server/models');
let { users } = require('./server/seeders/data/users');
let { courses } = require('./server/seeders/data/courses');
let { quizzes } = require('./server/seeders/data/quizes');
let { questions } = require('./server/seeders/data/questions');
let { answers } = require('./server/seeders/data/answers');

const { generateHash } = require('./server/config/passport.js');
// hash user data passwords
users.forEach(user => {
  user['password'] = generateHash(user['password']);
});

models.sequelize
  .sync({ force: true })
  .then(() => {
    return models.Role.create({
      title: 'administrator'
    });
  })
  .then(() => {
    return models.Role.create({
      title: 'student'
    });
  })
  .then(() => {
    return models.User.bulkCreate(users);
  })
  .then(() => {
    return models.Course.bulkCreate(courses);
  })
  .then(() => {
    return models.Quiz.bulkCreate(quizzes);
  })
  .then(() => {
    return models.Question.bulkCreate(questions);
  })
  .then(() => {
    return models.Answer.bulkCreate(answers);
  })
  // add Users to Courses
  .then(() => {
    return models.User.findById(1);
  })
  .then(foundUser => {
    return foundUser.addCourse(1);
  })
  .then(() => {
    return models.User.findById(2);
  })
  .then(foundUser => {
    return foundUser.addCourse(1);
  })
  .then(() => {
    return models.User.findById(3);
  })
  .then(foundUser => {
    return foundUser.addCourse(1);
  })
  .then(() => {
    return models.User.findById(4);
  })
  .then(foundUser => {
    return foundUser.addCourse(2);
  })
  .then(() => {
    return models.User.findById(4);
  })
  .then(foundUser => {
    return foundUser.addCourse(3);
  })
  .then(() => {
    return models.User.findById(5);
  })
  .then(foundUser => {
    return foundUser.addCourse(3);
  })
  .then(() => {
    return models.User.findById(5);
  })
  .then(foundUser => {
    return foundUser.addCourse(2);
  })
  .then(() => {
    process.exit();
  });

// QUIZ DATA
// https://b.socrative.com/teacher/

// model example
//  sequelize model:create --name Answer --attributes description:string,email:string,password:string,score:integer
