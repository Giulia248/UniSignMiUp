const mysql = require('mysql2/promise'); // async \await methods


var con = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "uniSignMiUp2024",
    database: 'unisignmiup'
});


// Export the pool for use in other files
module.exports = con