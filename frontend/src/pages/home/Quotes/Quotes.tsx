import React, { useState, useEffect } from 'react';
import './Quotes.css';

const Quotes = () => {
    const [quote, setQuote] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [error, setError] = useState<string>('');

    const fetchQuote = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/quotes/get-quote'); // Adjust URL if necessary
            if (!response.ok) {
                throw new Error('Failed to fetch quote');
            }

            const data = await response.json();
            setQuote(data.quote);
            setAuthor(data.author);
        } catch (err) {
            console.error('Error fetching quote:', err);
            setError('Failed to load quote. Please try again later.');
        }
    };

    useEffect(() => {
        fetchQuote(); // Fetch a quote when the component mounts
    }, []);

    return (
        <div className="quote-container">
            {error ? (
                <p className="error-message">{error}</p>
            ) : (
                <div>
                    <p className="quote-text">"{quote}"</p>
                    <p className="quote-author">- {author || 'Unknown'}</p>
                </div>
            )}
            <button onClick={fetchQuote} className="new-quote-button">New Quote</button>
        </div>
    );
};

export default Quotes;
