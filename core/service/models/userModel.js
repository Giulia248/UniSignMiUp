const db = require('../database');

var studentId = "";
var email = "";
var name = "";
var surname = "";
var course = "";

// GET all users
exports.getAllUsers = async () => {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
};

// POST Create a new user
exports.createUser = async (userData) => {

    const { studentId, email, password, name, surname, course } = userData;

    console.log("[Console] createUser started ...")
    const [result] = await db.query('INSERT INTO user (studentId, email, password, name, surname, course) VALUES (?, ?, ?, ?, ?, ?)',
        [studentId, email, password, name, surname, course]);

    console.log("[Console] createUser", result.insertId);
    return { success: true };
};

// GET single user
exports.getUser = async (userData) => {

    console.log("[Console] getUser started ...");

    const email = userData.email;
    const password = userData.password;

    const sql = `SELECT * FROM user WHERE email = ?`;

    const [result] = await db.query(sql, [email]);

    
    if (!result || result.length === 0) {

        return { success: false , errorType: "001" }; // email not valid
    } else {

        const passwordUser = result[0].password;
        if (passwordUser === password) {

            this.name = result[0].name;
            this.email = email;
            this.studentId = result[0].studentId;
            this.surname = result[0].surname;
            this.course = result[0].course

            return { success: true };
        } else {

            return { success: false , errorType: "002"};
        }
    }


};

function setUserData() {
    return {
        studentId: this.studentId,
        email: this.email,
        name: this.name,
        surname: this.surname,
        course: this.course
    }
}


exports.changePassword = async (userData) => {

    console.log("[Console] changePassword started ...");
    const email = userData.email
    const newPassword = userData.password;

    const sql = `UPDATE user
        SET password = ?
        WHERE email = ?`;

    const [result] = await db.query(sql, [newPassword, email]);

    console.log("[Console] changePassword result ...", result);

    if (!result || result.affectedRows === 0) {
        return { success: false };
    } else {
        return { success: true };
    }
};


// exports user's data
module.exports.getData = setUserData;
