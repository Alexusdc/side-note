const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// Connecting the html page
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Connecting the note page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Connecting the json database
app.get('/api/notes', (req, res) => {
    const db = JSON.parse(fs.readFileSync('./db/db.json'));

    res.json(db)
});

// Creating the ability to write and save notes 
app.post('/api/notes', (req, res) => {
    const db = JSON.parse(fs.readFileSync('./db/db.json'));

    console.log(db);

    db.push(req.body);

    console.log(db);

    fs.writeFileSync('./db/db.json', JSON.stringify(db, null, 4));
});

app.listen(3001, () => {
    console.log('API server now on port 3001!');
});