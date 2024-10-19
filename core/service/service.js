const express = require('express');
const bodyParser = require('body-parser');
// require('dotenv').config();  

const userRoutes = require('./models/routes');
const examRoutes = require('./models/routes');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/', userRoutes);
app.use('/', examRoutes);

// Start the server
const PORT = 2024; // http://localhost:2024/UniSignMeUp/v1/getUsers
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});