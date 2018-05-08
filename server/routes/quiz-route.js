'use strict';
const { Router } = require('express');
const router = Router();

const {
  getQuizQuestions,
  updateUserScore
} = require('../controllers/quizCtrl.js');

router.get('/quiz/:id', getQuizQuestions);
router.post('/quiz/', updateUserScore);

module.exports = router;
