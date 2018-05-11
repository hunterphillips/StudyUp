'use strict';
const { Router } = require('express');
const router = Router();

const { addMatch } = require('../controllers/matchCtrl.js');

router.post('/match', addMatch);

module.exports = router;
