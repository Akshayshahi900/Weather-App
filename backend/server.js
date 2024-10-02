// index.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}



// Enable CORS for all routes
app.use(cors());
app.use(express.json());



// Root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the Weather API! Use /api/weather?city={city} to get weather data.');
});

// Weather API endpoint
app.get('/api/weather', async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  try {
    const apiKey = process.env.WEATHER_API_KEY;
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather`, {
      params: {
        q: city,
        appid: apiKey,
        units: 'metric',
      },
    });

    const data = response.data;

    const weatherData = {
      coord: {
        lon: data.coord.lon,
        lat: data.coord.lat,
      },
      weather: {
        main: data.weather[0].main,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      },
      main: {
        temp: data.main.temp,
        feelsLike: data.main.feels_like, // Fixed from feeks_like
        tempMin: data.main.temp_min,
        tempMax: data.main.temp_max,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
      },
      wind: {
        speed: data.wind.speed,
        deg: data.wind.deg,
        gust: data.wind.gust,
      },
      clouds: data.clouds.all,
      visibility: data.visibility,
      sys: {
        country: data.sys.country,
        sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
        sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
      },
      name: data.name,
    };
    //send formatted data as json
    res.json(weatherData);
  }

  catch (error) {
    console.error('Error fetching weather data:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
