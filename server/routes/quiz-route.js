'use strict';
const { Router } = require('express');
const router = Router();

const {
  getQuiz,
  updateUserScore,
  getOpponent
} = require('../controllers/quizCtrl.js');

router.get('/quiz/:id', getQuiz);
router.get('/opponent/:id', getOpponent);
router.post('/quiz/', updateUserScore);

module.exports = router;
