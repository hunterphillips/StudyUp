'use strict';
const { Router } = require('express');
const router = Router();

const { getCourseList } = require('../controllers/homeCtrl.js');

router.get('/home', getCourseList);

module.exports = router;
