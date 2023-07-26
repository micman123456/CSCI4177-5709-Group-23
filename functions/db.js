const mysql = require('mysql');

const db = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  port: '3306',
  password: 'Noobs123',
  database: 'Taskpro',
});

module.exports = db;