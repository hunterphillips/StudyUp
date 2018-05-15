'use strict';
const { Router } = require('express');
const router = Router();

const { addMatch, removeMatch, getMatch } = require('../controllers/matchCtrl.js');

router.post('/match', addMatch);
router.get('/match/:id', getMatch);
router.post('/match/:id', removeMatch);

module.exports = router;
