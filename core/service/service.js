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
const port = 2025; // http://localhost:2024/UniSignMeUp/v1/...
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

app.options('/UniSignMeUp/v1/debugService', cors()); 