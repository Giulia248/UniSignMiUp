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
        const userId = await userModel.createUser(req.body);
        res.status(201).json({ id: userId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};