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

// POST exam
exports.createExam = async (req, res) => {
    try {
        console.log("[Console] Received data:", req.body); // Log to check request body
        const result = await examModel.createExam(req.body);

        if (result.success) {
            // Send success response with a message
            console.log("✨ [Console] createExam successfull");
            return res.status(200).json({ message: 'createExam successful' });
            
        } else {
            // Send failure response if credentials are invalid
            console.log("✨ [Console] createExam failed");
            return res.status(401).json({ message: 'ERROR' });
        }
        
    } catch (err) {
        console.log("💀 [Console] createExam failed");
        console.log(err.message);
        res.status(500).json({ error: err.message });
    }
};



// DELETE exam
exports.deleteExam = async (req, res) => {
    try {
        console.log("[Console] Received data:", req.query); // Log to check request body
        const result = await examModel.deleteExam(req.query);

        if (result.success) {
            // Send success response with a message
            console.log("✨ [Console] deleteExam successfull");
            return res.status(200).json({ message: 'deleteExam successful' });
            
        } else {
            // Send failure response if credentials are invalid
            console.log("✨ [Console] deleteExam failed");
            return res.status(401).json({ message: 'ERROR' });
        }
        
    } catch (err) {
        console.log("💀 [Console] deleteExam failed");
        console.log(err.message);
        res.status(500).json({ error: err.message });
    }
};