const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password', // замени на свой пароль
  database: 'todo_db'
});

connection.connect(err => {
  if (err) {
    return console.error('error connecting: ' + err.stack);
  }
  console.log('connected as id ' + connection.threadId);
});

app.get('/todos', (req, res) => {
  connection.query('SELECT * FROM todos', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

app.post('/todos', (req, res) => {
  const todo = req.body;

  if (!todo.text || typeof todo.status === 'undefined') {
    return res.status(400).send('Invalid data');
  }

  connection.query('INSERT INTO todos SET ?', todo, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ id: result.insertId, ...todo });
  });
});

app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  connection.query('UPDATE todos SET status = ? WHERE id = ?', [status, id], err => {
    if (err) {
      return res.status(500).send(err);
    }
    res.sendStatus(200);
  });
});

app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM todos WHERE id = ?', [id], err => {
    if (err) {
      return res.status(500).send(err);
    }
    res.sendStatus(200);
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
