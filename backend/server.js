require('dotenv').config(); // Load environment variables
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000; // Default to port 3000

app.use(cors()); // Enable CORS for all routes

app.get('/api/weather', async (req, res) => { 
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  try {
    const apiKey = process.env.WEATHER_API_KEY;
    const response = await axios.get('http://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city,
        appid: apiKey,
        units: 'metric',
      },
    });

    const { main, wind, weather, sys } = response.data;

    const weatherData = {
      main: {
        temp: main.temp,
        feels_like: main.feels_like,
        temp_min: main.temp_min,
        temp_max: main.temp_max,
        pressure: main.pressure,
        humidity: main.humidity,
      },
      wind: {
        speed: wind.speed,
        deg: wind.deg,
      },
      weather: weather[0],
      sys: {
        sunrise: sys.sunrise,
        sunset: sys.sunset,
      },
      name: response.data.name,
      country: sys.country,
    };

    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data', details: error.message });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
