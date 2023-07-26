const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');


const app = express();
app.use(cors());
app.use(bodyParser.json());


const db = require('./db');

db.getConnection((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  }
  console.log('Connected to the MySQL database');
});



const getTasksByUserId = (userId, callback) => {
  const query = 'SELECT * FROM tasks WHERE UserID = ? ORDER BY Due ASC';
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching tasks: ', err);
      return callback(err, null);
    }
    
    return callback(null, results);
  });
};



exports.handler = async function (event, context) {
    return await new Promise((resolve, reject) => {
      // Get the path from the event
      const path = event.path;
      // Get the HTTP method from the event
      const method = event.httpMethod;
  
      if (path === '/.netlify/functions/tasks/' && method === 'GET') {
        const userId = event.queryStringParameters.userId; // Corrected line
        getTasksByUserId(userId, (err, tasks) => {
          if (err) {
            console.error('Error fetching tasks: ', err);
            return resolve({
              statusCode: 500,
              body: JSON.stringify({ error: 'Internal server error' }),
            });
          }
          
          return resolve({
            statusCode: 200,
            body: JSON.stringify(tasks),
          });
        });
      } else {
        // Handle unknown routes or methods
        console.log("failed");
        return resolve({
          statusCode: 404,
          body: JSON.stringify({ error: 'Not found hah' }),
        });
      }
    });
  };
  