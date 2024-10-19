const db = require('../database');

// Get all users
exports.getAllUsers = async () => {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
};

// Create a new user
exports.createUser = async (userData) => {
    const { name, email } = userData;
    const [result] = await db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
    return result.insertId;
};

