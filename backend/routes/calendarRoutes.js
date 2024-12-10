const express = require('express');
const { google } = require('googleapis');
const oAuth2Client = require('../googleAuth');

const router = express.Router();

// Generate an authentication URL
router.get('/auth', (req, res) => {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/calendar.events'],
    });
    res.redirect(authUrl);
});

// Handle the OAuth2 callback
router.get('/auth/callback', async (req, res) => {
    const code = req.query.code;
    if (!code) return res.status(400).send('Authorization code missing.');

    try {
        const { tokens } = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(tokens);
        res.status(200).send('Google Calendar connected successfully!');
    } catch (error) {
        console.error('Error retrieving access token:', error);
        res.status(500).send('Error connecting to Google Calendar.');
    }
});

// Add a task to Google Calendar
router.post('/add-event', async (req, res) => {
    const { summary, description, startDateTime, endDateTime } = req.body;

    try {
        const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
        const event = {
            summary,
            description,
            start: { dateTime: startDateTime },
            end: { dateTime: endDateTime },
        };

        const response = await calendar.events.insert({
            calendarId: 'primary',
            resource: event,
        });

        res.status(200).json({ message: 'Event added successfully!', event: response.data });
    } catch (error) {
        console.error('Error adding event:', error);
        res.status(500).json({ message: 'Error adding event to Google Calendar.' });
    }
});

module.exports = router;
