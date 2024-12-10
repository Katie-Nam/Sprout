const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes'); 
const taskRoutes = require('./routes/taskRoutes'); 
const calendarRoutes = require('./routes/calendarRoutes');
const tagRoutes = require('./routes/tagRoutes');
const cors = require('cors');

const app = express();
const port = 5001;

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());    // cross origin requests

// Use the routes
app.use('/', userRoutes);    
app.use('/api', taskRoutes);    // '/api' or '/'
app.use('/api/calendar', calendarRoutes);
app.use('/api/tags', tagRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
