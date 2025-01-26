const db = require('../database');



var examStruct = [ ];

// Get all exams
exports.getAllExams = async (examData) => {
    const studentId = examData
    const [rows] = await db.query('SELECT * FROM exam');

    if (!result || result.affectedRows === 0) {
        return rows;
    } else {
        return rows;
    }
};


exports.getExams = async (examData) => {

    console.log("[Console] getExams started ...");

    const studentId = examData.studentId;
    const sql = 'SELECT * FROM exam WHERE studentId = ?';

    const [rows] = await db.query(sql, [studentId]);

    if (!rows || rows.affectedRows === 0) {
        return { success: false };
    } else {

        this.examStruct = rows;
        return { success: true };
    }
};

function setExamsData() {
    return this.examStruct
}

// exports exams's data
module.exports.getExamsData = setExamsData;


// POST a new exam
exports.createExam = async (examData) => {


    const { idexam, studentId, examName, location, dateTime, course } = examData;

    const sql = 'INSERT INTO exam (idexam, studentId, examName, location, dateTime, course) VALUES (?, ?, ?, ?, ?, ?)';

    console.log("[Console] createExam started ...")
    const [result] = await db.query(sql, [idexam, studentId, examName, location, dateTime, course]);

    if (!result || result.affectedRows === 0) {
        return { success: false };
    } else {
        return { success: true };
    }
};


// DELETE exam
exports.deleteExam = async (examData) => {

    console.log("[Console] deleteExam started ...")

    const idexam = examData.idexam;

    const sql = `
    DELETE FROM exam
    WHERE idexam = ?
`;

    const [result] = await db.query(sql, [idexam]);

    console.log("[Console] deleteExam result ...", result)

    if (!result || result.affectedRows === 0) {
        return { success: false };
    } else {
        return { success: true };
    }
};