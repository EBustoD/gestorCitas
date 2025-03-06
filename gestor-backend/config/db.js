const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',       // Change to your DB host
  user: 'root',    // Your DB username
  password: 'root',// Your DB password
  database: 'gestorcitas' // Your DB name
});

// Use promise-based queries
module.exports = pool.promise();
