const con = require('../database');
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
        const result = await userModel.createUser(req.body);

        if (result.success) {
            // Send success response with a message
            console.log("✨ [Console] createUser successfull");
            return res.status(200).json({ message: 'createUser successful' });
            
        } else {
            // Send failure response if credentials are invalid
            console.log("✨ [Console] createUser failed");
            return res.status(401).json({ message: 'ERROR' });
        }
        
    } catch (err) {
        console.log("💀 [Console] createUser failed");
        console.log(err.message);
        res.status(500).json({ error: err.message });
    }
};

// GET a user
exports.getUser = async (req, res) => {
    
    try {
        console.log("[Console] Received data:", req.query); // Log to check request body
        const result = await userModel.getUser(req.query);     
        console.log("[Console] result", result);   
        if (result.success) {
            // Send success response with a message
            console.log("✨ [Console] getUser successfull");
            const name = userModel.getData();
            console.log("NOME", name);
            return res.status(200).json({ message: 'getUser successful' });
            
        } else {
            // Send failure response if credentials are invalid
            console.log("💀 [Console] getUser failed");
            return res.status(401).json({ message: 'ERROR' });
        }
    } catch (err) {
        console.log("💀 [Console] getUser failed");
        console.log(err.message);
        res.status(500).json({ error: err.message });
    }
};


// PUT new password
exports.changePassword = async (req, res) => {
    try {
        console.log("[Console] Received data:", req.body); // Log to check request body
        const result = await userModel.changePassword(req.body);

        if (result.success) {
            // Send success response with a message
            console.log("✨ [Console] changePassword successfull");
            return res.status(200).json({ message: 'changePassword successful' });
            
        } else {
            // Send failure response if credentials are invalid
            console.log("✨ [Console] changePassword failed");
            return res.status(401).json({ message: 'ERROR' });
        }
        
    } catch (err) {
        console.log("💀 [Console] changePassword failed");
        console.log(err.message);
        res.status(500).json({ error: err.message });
    }
};