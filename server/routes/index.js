'use strict';
const { Router } = require('express');
const router = Router();

router.use(require('./auth-route'));
router.use(require('./home-route'));
router.use(require('./course-route'));
router.use(require('./match-route'));
router.use(require('./quiz-route'));
router.use(require('./board-route'));

module.exports = router;
