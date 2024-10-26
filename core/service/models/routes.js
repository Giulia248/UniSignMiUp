const express = require('express');
const router = express.Router();
const userController = require('../models/userController');
const examController = require('../models/examController');


// USERS

// GET all users
router.get('/UniSignMeUp/v1/getAllUsers', userController.getAllUsers);

// GET single user
router.get('/UniSignMeUp/v1/getUser/:userId', userController.getUser);

// POST a new user
router.post('/UniSignMeUp/v1/createUser', userController.createUser);


//EXAM

// GET all exams
router.get('/UniSignMeUp/v1/getAllExams', examController.getAllExams);

// POST a new exam
router.post('/UniSignMeUp/v1/createExam', examController.createExam);

module.exports = router;


