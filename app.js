const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

const API_KEY = 'f5c544fd2b9f9f7bf4e50ad46d9ce7e4';
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';

// Serve all static files in the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Route for serving the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'weather.html'));
});

app.post('/getWeather', async (req, res) => {
    const city = req.body.city;
    try {
        const response = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);

        // Get the current date and time
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString();
        const formattedTime = currentDate.toLocaleTimeString();

        res.json({
            city: response.data.name,
            temperature: response.data.main.temp,
            description: response.data.weather[0].description,
            humidity: response.data.main.humidity,
            wind_speed: response.data.wind.speed,
            date: formattedDate,
            time: formattedTime
        });
    } catch (error) {
        res.json({ error: 'City not found' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
