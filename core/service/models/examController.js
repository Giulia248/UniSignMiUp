const examModel = require('../models/examModel');

// Get all exams
exports.getAllExams = async (req, res) => {
    try {
        const exams = await examModel.getAllExams();
        res.json(exams);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new exam
exports.createExam = async (req, res) => {
    try {
        const examId = await examModel.createExam(req.body);
        res.status(201).json({ id: examId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};