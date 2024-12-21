const userModel = require('../models/userModel');

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new user
exports.createUser = async (req, res) => {
    try {
        console.log("[Console] Received data:", req.body); // Log to check request body
        const userId = await userModel.createUser(req.body);
        res.status(200).json({ id: userId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET a user
exports.getUser = async (req, res) => {
    
    try {
        const userId = await userModel.getUser(req.body);
        res.status(200).json({ id: userId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};