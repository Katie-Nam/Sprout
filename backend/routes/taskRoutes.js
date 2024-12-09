const express = require('express');
const db = require('../db/config'); 
const router = express.Router();

// Endpoint to get all tasks
router.get('/get-tasks', async (req, res) => {
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

// Get tasks by date
router.get('/get-tasks-by-date', async (req, res) => {
    const { date } = req.query; // Get the date from the query string

    try {
        // Query tasks due on the given date
        const [rows] = await db.query(
            'SELECT description, tag, priority FROM Tasks WHERE DATE(dueDate) = ?',
            [date]
        );

        res.status(200).json(rows); // Send the tasks as JSON
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Edit Task Route
router.put('/edit-task', async (req, res) => {
    const { id, description, tag, priority, dueDate, reminder } = req.body;

    try {
        // Ensure the task exists before updating
        const [rows] = await db.query('SELECT * FROM Tasks WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Update the task
        await db.query(
            'UPDATE Tasks SET description = ?, tag = ?, priority = ?, dueDate = ?, reminder = ? WHERE id = ?',
            [description, tag, priority, dueDate, reminder, id]
        );

        res.status(200).json({ message: 'Task updated successfully' });
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
