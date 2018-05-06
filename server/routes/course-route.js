'use strict';
const { Router } = require('express');
const router = Router();

const { getCourseById } = require('../controllers/courseCtrl.js');

router.get('/course/:id', getCourseById);

module.exports = router;
