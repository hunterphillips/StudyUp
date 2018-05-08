'use strict';
const { Router } = require('express');
const router = Router();

const { getCourseList, addCourse } = require('../controllers/homeCtrl.js');

router.get('/home', getCourseList);
router.post('/home', addCourse);

module.exports = router;
