const express = require('express');
const db = require('../db/config');
const router = express.Router();

// Create a new tag
router.post('/create-tag', async (req, res) => {
    const { name, color } = req.body;

    try {
        // Insert tag into the Tags table
        const [result] = await db.query('INSERT INTO Tags (name, color) VALUES (?, ?)', [name, color || '#FFFFFF']);
        res.status(201).json({ message: 'Tag created successfully!', tagId: result.insertId });
    } catch (error) {
        console.error('Error creating tag:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(400).json({ message: 'Tag name already exists.' });
        } else {
            res.status(500).json({ message: 'Server error.' });
        }
    }
});

// Edit a tag
router.put('/edit-tag/:id', async (req, res) => {
    const { id } = req.params;
    const { name, color } = req.body;

    // Limit to 5 predefined colors
    const allowedColors = ['#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#8E44AD'];

    try {
        // Validate color choice
        if (color && !allowedColors.includes(color)) {
            return res.status(400).json({ message: 'Invalid color choice. Select one of the predefined colors.' });
        }

        // Check if the new name already exists (except for this tag)
        if (name) {
            const [existingTag] = await db.query('SELECT * FROM Tags WHERE name = ? AND id != ?', [name, id]);
            if (existingTag.length > 0) {
                return res.status(400).json({ message: 'A tag with this name already exists.' });
            }
        }

        // Update the tag in the database
        await db.query('UPDATE Tags SET name = COALESCE(?, name), color = COALESCE(?, color) WHERE id = ?', [
            name,
            color,
            id,
        ]);

        res.status(200).json({ message: 'Tag updated successfully!' });
    } catch (error) {
        console.error('Error editing tag:', error);
        res.status(500).json({ message: 'Server error.' });
    }
});

// Get all tags
router.get('/get-tags', async (req, res) => {
    try {
        // Fetch all tags from the Tags table
        const [rows] = await db.query('SELECT name, color FROM Tags');

        // Convert rows into the desired format: { tagName: tagAssignedColor }
        const tags = rows.reduce((acc, row) => {
            acc[row.name] = row.color;
            return acc;
        }, {});

        res.status(200).json(tags);
    } catch (error) {
        console.error('Error fetching tags:', error);
        res.status(500).json({ message: 'Server error.' });
    }
});


module.exports = router;
