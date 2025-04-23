// models/StudentInfo.js

const mongoose = require('mongoose');

// Define the schema for student information
const studentInfoSchema = new mongoose.Schema({
    studentId: {  // Changed from 'id' to avoid confusion with MongoDB's internal _id
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    birthdate: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});

// Create the model from the schema
const StudentInfo = mongoose.model('StudentInfo', studentInfoSchema);

// Export the model so you can use it elsewhere in your project
module.exports = StudentInfo;
