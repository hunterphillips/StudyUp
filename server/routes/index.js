'use strict';
const { Router } = require('express');
const router = Router();

router.use(require('./auth-route'));
router.use(require('./home-route'));
router.use(require('./course-route'));

module.exports = router;
