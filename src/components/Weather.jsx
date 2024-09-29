import React, { useState } from 'react';

const Weather = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null); // Start with null

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSearch = async () => {
    if (!location) return;

    try {
      const response = await fetch(`http://localhost:5000/api/weather?city=${location}`);
      const data = await response.json();

      // Update the state with fetched data
      setWeatherData({
        temperature: `${data.temperature}°C`,
        weatherCondition: data.weatherCondition,
        humidity: `${data.humidity}%`,
        windSpeed: `${data.windSpeed} km/h`,
        sunrise: data.sunrise,
        sunset: data.sunset,
        dateTime: data.dateTime,
        forecast: data.forecast, // Update if you implement this feature
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-300 to-white flex justify-center items-center p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <header className="mb-6 flex justify-center space-x-4">
          <input
            type="text"
            placeholder="Enter city..."
            value={location}
            onChange={handleLocationChange}
            className="p-2 border border-gray-300 rounded-md w-2/3"
          />
          <button
            onClick={handleSearch}
            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
          >
            Search
          </button>
        </header>

        {weatherData ? (
          <>
            <div className="current-weather mb-6 text-center">
              <div className="text-6xl mb-2">☀️</div>
              <div className="text-5xl font-bold">{weatherData.temperature}</div>
              <div className="text-xl text-gray-600">{weatherData.weatherCondition}</div>
              <div className="text-md text-gray-500 mt-2">{weatherData.dateTime}</div>
            </div>

            <div className="details mb-6 text-gray-700">
              <p>Humidity: {weatherData.humidity}</p>
              <p>Wind: {weatherData.windSpeed}</p>
              <p>
                Sunrise: {weatherData.sunrise} | Sunset: {weatherData.sunset}
              </p>
            </div>

            <div className="forecast grid grid-cols-3 gap-4">
              {weatherData.forecast.map((item, index) => (
                <div key={index} className="forecast-card bg-gray-100 p-4 rounded-lg text-center">
                  <div>{item.time}</div>
                  <div className="text-lg font-semibold">{item.temp}</div>
                  <div>{item.icon}</div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center text-gray-600">Enter a city to get weather data.</div>
        )}
      </div>
    </div>
  );
};

export default Weather;
