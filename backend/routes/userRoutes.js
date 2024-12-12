const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db/config');
const jwt = require('jsonwebtoken');

const router = express.Router();
const SECRET_KEY = 'secret_key_1';

router.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        // Check if the email is already in use
        const [existingUser] = await db.query('SELECT * FROM User WHERE Email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(409).json({ message: 'Email is already in use.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        const [result] = await db.query(
            'INSERT INTO User (Email, Name, Password) VALUES (?, ?, ?)',
            [email, `${firstName} ${lastName}`, hashedPassword]
        );

        // Generate a JWT token
        const token = jwt.sign({ userId: result.insertId, email }, SECRET_KEY, {
            expiresIn: '1h', // Token expires in 1 hour
        });

        res.status(201).json({
            message: 'User registered successfully!',
            data: {
                token,
                userName: `${firstName} ${lastName}`,
            },
        });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists in the database
        const [rows] = await db.query('SELECT * FROM User WHERE Email = ?', [email]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const user = rows[0];

        // Compare hashed password
        const passwordMatch = await bcrypt.compare(password, user.Password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id, email: user.Email }, SECRET_KEY, {
            expiresIn: '1h', // Token expires in 1 hour
        });

        res.status(200).json({
            message: 'Login successful!',
            data: {
                token,
                userName: user.Name,
            },
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});


module.exports = router;