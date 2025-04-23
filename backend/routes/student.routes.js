const express = require('express');
const router = express.Router();
const StudentInfo = require('../models/student_info.models');

// POST /api/students/signup - Register a new student
router.post('/signup', async (req, res) => {
    try {
        // Extract student data from request body
        const { studentId, name, email, password, phone, birthdate, address } = req.body;

        // Check if student with email, phone, or studentId already exists
        const existingStudent = await StudentInfo.findOne({ $or: [{ email }, { studentId }, { phone }] });
        if (existingStudent) {
            return res.status(400).json({ message: 'Student with this email, phone, or student ID already exists' });
        }

        // Create new student document (password stored as plain text)
        const newStudent = new StudentInfo({
            studentId,
            name,
            email,
            password, // Store password directly without hashing
            phone,
            birthdate: new Date(birthdate),
            address
        });

        // Save student to database
        await newStudent.save();

        // Send success response
        res.status(201).json({ message: 'Student registered successfully' });
    } catch (error) {
        // Handle errors (e.g., validation errors, database issues)
        res.status(500).json({ message: 'Error registering student', error: error.message });
    }
});

// POST /api/students/login - Login a student
router.post('/login', async (req, res) => {
    try {
        // Extract email and password from request body
        const { email, password } = req.body;

        // Find student by email
        const student = await StudentInfo.findOne({ email });
        if (!student) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare provided password with stored plain text password
        if (password !== student.password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Send success response
        res.status(200).json({ 
            message: 'Login successful', 
            student: { 
                studentId: student.studentId, 
                name: student.name, 
                email: student.email 
            } 
        });
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});

// Export the router to use in server.js
module.exports = router;