'use strict';
const { Router } = require('express');
const router = Router();

const { getCourseById } = require('../controllers/courseCtrl.js');

router.get('/courses/:id', getCourseById);

module.exports = router;
