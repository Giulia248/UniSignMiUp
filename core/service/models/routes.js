const express = require('express');
const router = express.Router();
const userController = require('../models/userController');
const examController = require('../models/examController');


// USERS

// Get all users
router.get('/UniSignMeUp/v1/getAllUsers', userController.getAllUsers);

// Create a new user
router.post('/UniSignMeUp/v1/createUser', userController.createUser);


//EXAM

// Get all exams
router.get('/UniSignMeUp/v1/getAllExams', examController.getAllExams);

// Create a new exam
router.post('/UniSignMeUp/v1/createExam', examController.createExam);

module.exports = router;