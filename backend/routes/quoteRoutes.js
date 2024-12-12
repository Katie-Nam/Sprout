const express = require('express');
const axios = require('axios');
const router = express.Router();

// Fetch a random motivational quote
router.get('/get-quote', async (req, res) => {
    try {
        // Call the ZenQuotes API to fetch a random quote
        const response = await axios.get('https://zenquotes.io/api/random');

        // Ensure the response contains data
        if (!response.data || response.data.length === 0) {
            return res.status(500).json({ message: 'No quotes returned from API' });
        }

        // Extract the first quote from the API response
        const quote = response.data[0]; // ZenQuotes returns an array
        res.status(200).json({
            quote: quote.q,    // The quote text
            author: quote.a,   // The author of the quote
        });
    } catch (error) {
        console.error('Error fetching quote:', error.message);
        res.status(500).json({ message: 'Failed to fetch quote.' });
    }
});

module.exports = router;
