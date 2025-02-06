const express = require('express');
const router = express.Router();
const userController = require('../models/userController');
const examController = require('../models/examController');


// USERS

// GET all users
router.get('/UniSignMeUp/v1/getAllUsers', userController.getAllUsers);

// POST a new user
router.post('/UniSignMeUp/v2/createUser', userController.createUser);

// GET single user
router.get('/UniSignMeUp/v2/getUser', userController.getUser);

// PUT change user pw
router.put('/UniSignMeUp/v2/changePassword', userController.changePassword);

// DELETE user
// router.delete('/UniSignMeUp/v1/deleteUser', userController.deleteUser);


//EXAM

// GET all exams
router.get('/UniSignMeUp/v1/getAllExams', examController.getAllExams);

// GET all exams for single user
router.get('/UniSignMeUp/v3/getExams', examController.getExams);

// POST a new exam
router.post('/UniSignMeUp/v2/createExam', examController.createExam);

// DELETE exam
router.delete('/UniSignMeUp/v2/deleteExam', examController.deleteExam);

module.exports = router;


