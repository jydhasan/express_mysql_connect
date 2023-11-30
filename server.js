const express = require('express');
const mysql = require('mysql');
const ejs = require('ejs');

const app = express();

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'excel',
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + db.threadId);
});

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Define a route that renders the users using EJS
app.get('/users', (req, res) => {
  db.query('SELECT * FROM students', (error, results, fields) => {
    if (error) throw error;
    res.render('users', { users: results });
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
