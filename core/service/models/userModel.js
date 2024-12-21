const db = require('../database');

// GET all users
exports.getAllUsers = async () => {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
};

// POST Create a new user
exports.createUser = async (userData) => {

    const {studentId, email, password, name, surname, course } = userData;

    console.log("[Console] createUser started ...")
    const [result] = await db.query('INSERT INTO user (studentId, email, password, name, surname, course) VALUES (?, ?, ?, ?, ?, ?)', 
        [studentId, email, password, name, surname, course]);

    console.log("[Console] createUser", result.insertId);
    return { success: true };
};

// GET single user
exports.getUser = async (userData) => {
    
    console.log("[Console] getUser started ...");
    const email = userData.email
    const password = userData.password;
    
    const sql = `SELECT * FROM user WHERE email = ?`;

    const [result] = await db.query(sql, [email]);


    if   (!result || result.length === 0 ){
        return { success: false };
    } else {
        
    const passwordUser = result[0].password;
    if (passwordUser === password) {

        return { success: true };
    } else {

        return { success: false };
    }
    }

    
};

