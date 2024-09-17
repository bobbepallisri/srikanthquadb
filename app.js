const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 4000;

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Set views directory and engine for rendering HTML
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

// Routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// API route to get live cryptocurrency data from WazirX API
app.get('/api/getTop10', async (req, res) => {
    try {
        const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
        const tickers = response.data;

        // Extract top 10 tickers
        const top10 = Object.values(tickers).slice(0, 10);

        // Send top 10 data as JSON
        res.json({ data: top10 });
    } catch (error) {
        console.error('Error fetching data from WazirX API:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
