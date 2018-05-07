'use strict';
const { Router } = require('express');
const router = Router();

router.use(require('./auth-route'));
router.use(require('./home-route'));
router.use(require('./course-route'));
router.use(require('./quiz-route'));

module.exports = router;
