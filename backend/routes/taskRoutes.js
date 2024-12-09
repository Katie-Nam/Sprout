const express = require('express');
const db = require('../db/config'); 
const router = express.Router();

// Endpoint to get all tasks
router.get('/tasks', async (req, res) => {
    try {
        // Query the database for all tasks
        const [rows] = await db.query('SELECT * FROM Tasks');
        res.status(200).json(rows); // Return tasks as JSON
    } catch (error) {
        console.error('Error retrieving tasks:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add Task Route
router.post('/add-task', async (req, res) => {
    const { description, tag, priority, dueDate, reminder } = req.body;

    try {
        // Insert the new task into the Tasks table
        const [result] = await db.query(
            'INSERT INTO Tasks (checkbox, description, tag, priority, dueDate, reminder) VALUES (?, ?, ?, ?, ?, ?)',
            [false, description, tag, priority, dueDate, reminder]
        );

        res.status(201).json({ message: 'Task added successfully', taskId: result.insertId });
    } catch (error) {
        console.error('Error adding task:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
