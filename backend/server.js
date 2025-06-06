// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const connectToDatabase = require('./config/db'); // Import the connection function
const studentRoutes = require('./routes/student.routes'); // Import student routes

// Load environment variables
dotenv.config();

// Create an instance of express
const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Connect to MongoDB using Mongoose
connectToDatabase();

// Use student routes for API endpoints
app.use('/auth/students', studentRoutes);

// Simple test route
app.get('/test', (req, res) => {
    res.json({ message: 'Hello from backend' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});