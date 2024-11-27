const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes'); // Adjust the path as needed

const app = express();
const port = 5001;

// Middleware
app.use(bodyParser.json());
app.use(express.json());

// Use the userRoutes
app.use('/', userRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
