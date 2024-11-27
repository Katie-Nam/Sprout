const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db/config');
const router = express.Router();

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

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;