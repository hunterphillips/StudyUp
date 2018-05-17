'use strict';
const { Router } = require('express');
const router = Router();

const { getAppStudents } = require('../controllers/boardCtrl.js');

router.get('/leaderboard', getAppStudents);

module.exports = router;
