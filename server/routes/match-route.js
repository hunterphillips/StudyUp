'use strict';
const { Router } = require('express');
const router = Router();

const { addMatch, removeMatch } = require('../controllers/matchCtrl.js');

router.post('/match', addMatch);
// router.get('/match/:id', getMatches);
router.post('/match/:id', removeMatch);

module.exports = router;
