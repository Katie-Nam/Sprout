const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db/config');
const jwt = require('jsonwebtoken');

const router = express.Router();
const SECRET_KEY = 'secret_key_1';

router.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const [rows] = await db.query('SELECT * FROM User WHERE Email = ?', [email]);
        if (rows.length > 0) {
            return res.status(409).json({ message: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query('INSERT INTO User (Email, Name, Password) VALUES (?, ?, ?)', [
            email,
            `${firstName} ${lastName}`,
            hashedPassword,
        ]);

        const token = jwt.sign({ email: user.Email, name: user.Name }, SECRET_KEY, { expiresIn: '1h' });

        res.status(201).json({ message: 'User registered successfully',  token : token, userName: user.Name  });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const [rows] = await db.query('SELECT * FROM User WHERE Email = ?', [email]);
        if (rows.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = rows[0];

        // Compare hashed passwords
        const isPasswordValid = await bcrypt.compare(password, user.Password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT
        const token = jwt.sign({ email: user.Email, name: user.Name }, SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({ token, userName: user.Name });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;