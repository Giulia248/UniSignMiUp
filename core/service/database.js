const mysql = require('mysql2');
require('dotenv').config();

// Create a connection pool
const pool = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "uniSignMiUp2024",
    database: "UniSignMiUp"
});

// Export the pool for use in other files
module.exports = pool.promise();