const db = require('../database');

// GET all users
exports.getAllUsers = async () => {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
};

// POST Create a new user
exports.createUser = async (userData) => {
    const { name, surname, email, password, course, studentId } = userData;

    console.log("[Console] createUser")
    const [result] = await db.query('INSERT INTO user (name, surname, email, password, course, studentId) VALUES (?, ?, ?, ?, ?, ?)', [name, surname, email, password, course, studentId]);
    console.log("[Console] createUser", result.insertId);
    return result.insertId;
};

// GET single user
exports.getUser = async (userData) => {
    
    
    const email = userData.params.email
    const password = userData.params.password;
    
    const sql = `SELECT * FROM user WHERE email = ?`;
    await db.query(sql, [email], (err, result) => {
        if (err) {
            console.log("[Console] createUser model  err", err)
            throw err;
        } else {
            if (result.length === 0) {
                console.log("[Console] createUser model  result === 0")
                return;
            }
            const passwordUser = result[0].password;

            if (passwordUser === password) {
                console.log("[Console] createUser model  200", result.email)
                return result.email
                return res.status(200).json({ message: 'Login successful' });
            } else {
                console.log("[Console] createUser model  401", result.insertId)
                return result.insertId
                return res.status(401).json({ message: 'Invalid password' });
            }
        };
    });
};

