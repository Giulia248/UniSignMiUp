const db = require('../database');

// Get all exams
exports.getAllExams = async () => {
    const [rows] = await db.query('SELECT * FROM exam');
    return rows;
};

// Create a new exam
exports.createExam = async (examData) => {
    const { subject, date, userId } = examData;
    const [result] = await db.query('INSERT INTO exams (subject, date, user_id) VALUES (?, ?, ?)', [subject, date, userId]);
    return result.insertId;
};