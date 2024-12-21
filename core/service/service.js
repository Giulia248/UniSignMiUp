const express = require('express');
const bodyParser = require('body-parser');
// require('dotenv').config();  
const cors = require('cors'); // a mechanism by which a front-end client can make requests for resources to an external back-end server.

const userRoutes = require('./models/routes');
const examRoutes = require('./models/routes');
const database = require('./database');



const app = express();

app.use(cors({
    origin: 'http://127.0.0.1:5500', // Allow only this origin
    methods: ['GET', 'OPTIONS', 'POST', 'DELETE', 'PUT'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
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
    console.log(`Server running at http://localhost:${port}`);
  
    
    try {
        // Execute a simple query to check the connection
        const [rows] = await database.query('SELECT 1'); // 'SELECT 1' is a simple query to test connection
        console.log('✨ Database connection is successful');
    } catch (error) {
        console.error('💀 Database connection failed:', error.message);
    }


  });

  // OPTIONS verb, used to 
app.options('/UniSignMeUp/v1/debugService', (req, res) => {
    res.set('Allow', 'GET, POST, PUT, DELETE, OPTIONS'); // Specify allowed methods
    res.status(204).send(); // No content to send back
  });