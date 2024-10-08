const mysql = require('mysql2');
require('dotenv').config();

// Create a connection pool
const pool = mysql.createPool({
    host: "",
    user: "",
    password: "",
    database: ""
});

// Export the pool for use in other files
module.exports = pool.promise();