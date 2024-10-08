const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const userRoutes = require('./models/userRoutes');
const examRoutes = require('./models/examRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/', userRoutes);
app.use('/', examRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});