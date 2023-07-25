const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');
const jwt = require('jsonwebtoken'); // Import the jsonwebtoken module

const generateSecretKey = () => {
  const secret = crypto.randomBytes(32).toString('hex');
  return secret;
};
const SECRET_KEY = generateSecretKey();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port:'3306',
  password: 'Noobs123',
  database: 'Taskpro'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

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


app.delete('/removeTask', (req, res) => {
  const taskID = req.body.taskID;
  const query = 'DELETE FROM tasks WHERE TASKID = ?';
  db.query(query, [taskID], (err, results) => {
    if (err) {
      console.error('Error deleting task: ', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    return res.status(200).json({ success: true, message: 'Task deleted successfully' });
  });
});


app.post('/decodeToken', (req, res) => {
  // Get the token from the request body
  const { token } = req.body;
  const decodedToken = jwt.verify(token, SECRET_KEY);
  console.log(decodedToken);

  try {
    // Decode the token to retrieve the user's email
    const decodedToken = jwt.verify(token, SECRET_KEY);
    const userEmail = decodedToken.email;
    console.log(userEmail);

    const query = 'SELECT idusers FROM users WHERE email = ?';
    db.query(query, [userEmail], (err, results) => {
      if (err) {
        console.error('Error fetching user ID: ', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      // Check if a user with the provided email exists
      if (results.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Retrieve the user's ID from the database results
      const userId = results[0].idusers;
      return res.json({ userId })
    });

    //const userId = 1; // Replace this with the actual user ID retrieved from the database
    ;

  } catch (err) {
    console.error('Error decoding token:', err.message);
    return res.status(401).json({ error: 'Invalid token' });
  }
});




app.get('/', (req, res) => {
  //const userId = req.params.userId;
  const userId = 2;
  //const jwt = require('jsonwebtoken');
  const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error('Error decoding token:', err.message);
      // Handle the error, e.g., token is invalid or has expired
    } else {
      // Decoded object will contain the data stored in the token payload
      console.log('Decoded token:', decoded);
      // Access the userId
      const userId = decoded.userId;
      console.log('User ID:', userId);
    }
  });
  

      // Include the token in the response
  res.status(200).json({ success: true, userId });

});
app.get('/api/tasks/:userId', (req, res) => {
  const userId = req.params.userId;
  getTasksByUserId(userId, (err, tasks) => {
    if (err) {
      console.error('Error fetching tasks: ', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(tasks);
  });

});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Perform the necessary SQL query to check the credentials
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Error executing the SQL query: ', err);
      res.status(500).json({ success: false, message: 'Internal server error' });
      return;
    }
    if (results.length > 0) {
      //const jwt = require('jsonwebtoken');
      const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });

      // Include the token in the response
      res.status(200).json({ success: true, token });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });
});

app.post('/addTask',(req,res)=>{
  const { userID, taskName, taskClass, dueDate, taskType, completed } = req.body;
  const query = `INSERT INTO tasks (UserID, TaskName, TaskType, TaskClass, Due, Completed) VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(query, [userID, taskName, taskType, taskClass, dueDate,completed ], (err,result)=>{
    if (err) {
      console.error('Error executing the SQL query: ', err);
      res.status(500).json({ success: false, message: 'Failed to Add task' });
      console.log(userID);
      return;
    }
    else {
      console.log('Task added successfully');
      res.status(200).json({ success: true, message: 'Task added successfully'});
    }

  })

});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});

