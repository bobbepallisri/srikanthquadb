const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

// Connect to SQLite database
const db = new sqlite3.Database('./database.db');

// Serve the main HTML page
router.get('/', (req, res) => {
    res.render('index');
});

// API route to get top 10 cryptos from the database
router.get('/api/getTop10', (req, res) => {
    db.all('SELECT * FROM top_cryptos LIMIT 10', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ data: rows });
    });
});

module.exports = router;
