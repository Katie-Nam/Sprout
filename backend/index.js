const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes'); 
const taskRoutes = require('./routes/taskRoutes'); 
const cors = require('cors');

const app = express();
const port = 5001;

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());    // cross origin requests

// Use the userRoutes and taskRoutes
app.use('/', userRoutes);    
app.use('/api', taskRoutes);    // '/api' or '/'

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
