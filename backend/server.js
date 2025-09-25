const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const DB_PATH = path.join(__dirname, 'db.json');

app.use(cors());
app.use(express.json());

// GET /api/settings - Retrieve current settings
app.get('/api/settings', (req, res) => {
  fs.readFile(DB_PATH, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading database file.');
    }
    res.json(JSON.parse(data));
  });
});

// POST /api/settings - Update settings
app.post('/api/settings', (req, res) => {
  const newSettings = req.body;

  fs.writeFile(DB_PATH, JSON.stringify(newSettings, null, 2), 'utf8', (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error writing to database file.');
    }
    res.status(200).json({ message: 'Settings updated successfully.' });
  });
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});