const express = require('express');
const axios = require('axios');
const app = express();
const port = 3001;

const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key
const BASE_URL = 'http://api.openweathermap.org/data/2.5/forecast';

app.get('/weather', async (req, res) => {
    const { lat, lon } = req.query;

    try {
        const response = await axios.get(BASE_URL, {
            params: {
                lat,
                lon,
                appid: API_KEY,
                units: 'metric'
            }
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
