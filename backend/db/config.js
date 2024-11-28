const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', // Replace with your DB credentials
    database: 'task_manager', // Replace with your database name
});

module.exports = pool;
