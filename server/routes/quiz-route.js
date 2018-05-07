'use strict';
const { Router } = require('express');
const router = Router();

const { getQuizQuestions } = require('../controllers/quizCtrl.js');

router.get('/quiz/:id', getQuizQuestions);

module.exports = router;
