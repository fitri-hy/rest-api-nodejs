const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
const port = 3000;

app.use(express.json());

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/:table', (req, res) => {
  const tableName = req.params.table;
  
  db.query(`SELECT * FROM ${tableName}`, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error executing query');
      return;
    }
    res.json(results);
  });
});

app.get('/api/:table/:id', (req, res) => {
  const tableName = req.params.table;
  const id = req.params.id;

  db.query(`SELECT * FROM ${tableName} WHERE id = ?`, [id], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error executing query');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Data not found');
      return;
    }
    res.json(results[0]);
  });
});

app.post('/api/:table', (req, res) => {
  const tableName = req.params.table;
  const newData = req.body;

  db.query(`INSERT INTO ${tableName} SET ?`, newData, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error executing query');
      return;
    }
    res.status(201).json({ id: results.insertId, ...newData });
  });
});

app.put('/api/:table/:id', (req, res) => {
  const tableName = req.params.table;
  const id = req.params.id;
  const updatedData = req.body;

  db.query(`UPDATE ${tableName} SET ? WHERE id = ?`, [updatedData, id], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error executing query');
      return;
    }
    res.json({ id, ...updatedData });
  });
});

app.delete('/api/:table/:id', (req, res) => {
  const tableName = req.params.table;
  const id = req.params.id;

  db.query(`DELETE FROM ${tableName} WHERE id = ?`, [id], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error executing query');
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).send('Data not found');
      return;
    }
    res.status(204).send();
  });
});

app.get('/api/:tables', (req, res) => {
  const tables = req.params.tables.split(',');
  
  if (tables.length < 2) {
    return res.status(400).json({ error: 'Minimum 2 tables for join operations' });
  }

  const query = `SELECT * FROM ${tables.join(' INNER JOIN ')};`;

  pool.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error.' });
    }

    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
