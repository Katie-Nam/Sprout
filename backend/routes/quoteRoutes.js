const express = require('express');
const axios = require('axios');
const router = express.Router();

// Fetch a random motivational quote
router.get('/get-quote', async (req, res) => {
    try {
        const response = await axios.get('https://zenquotes.io/api/random'); 
        const quote = response.data[0]; // ZenQuotes returns an array of quotes
        res.status(200).json({
            quote: quote.q,
            author: quote.a,
        });
    } catch (error) {
        console.error('Error fetching quote:', error);
        res.status(500).json({ message: 'Failed to fetch quote.' });
    }
});

module.exports = router;
