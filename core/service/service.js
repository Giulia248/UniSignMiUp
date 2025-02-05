const express = require('express');
const bodyParser = require('body-parser');
// require('dotenv').config();  
const cors = require('cors'); // a mechanism by which a front-end client can make requests for resources to an external back-end server.

const userRoutes = require('./models/routes');
const examRoutes = require('./models/routes');
const database = require('./database');

const app = express();

app.use(cors({
    origin: 'http://127.0.0.1:5501', // Allow only this origin
    methods: ['GET', 'OPTIONS', 'POST', 'DELETE', 'PUT'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Methods', 'Access-Control-Expose-Headers'], // Allowed headers
    exposedHeaders: ['Content-Type', 'Authorization']
  }));

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/', userRoutes);
app.use('/', examRoutes);

// Start the server
const port = 2024; // http://localhost:2024/UniSignMeUp/v1/...
// Start the server and test the database connection
app.listen(port, async () => {
    console.log(`🚀Server running at http://localhost:${port}`);
    try {
        // Execute a simple query to check the connection
        const [rows] = await database.query('SELECT 1'); // 'SELECT 1' is a simple query to test connection
        console.log('✨ Database connection is successful');
    } catch (error) {
        console.error('💀 Database connection failed:', error.message);
    }


  });

/* app.options('/UniSignMeUp/v1/debugService', (req, res) => {

  console.log("debugService Started ...")
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.status(204).send(); // no content
}); */
/* app.options('/UniSignMeUp/v1/debugService', (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5502');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // ✅ This is crucial: it allows the client to read the headers
  res.setHeader('Access-Control-Expose-Headers', 'Content-Type, Authorization, Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Headers');

  res.status(204).send({data: "OK"}); // No Content
}); */

app.options('/UniSignMeUp/v1/debugService', cors()); 