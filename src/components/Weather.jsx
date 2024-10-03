import React, { useState } from 'react';

const Weather = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSearch = async () => {
    if (!location) return;

    try {
      const response = await fetch(`http://localhost:5000/api/weather?city=${location}`);
      console.log("Response Status:", response.status);

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Weather Data:", data);  // Log the received data

      setWeatherData(data); // Directly set the received data

    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch weather data.");
    }
  };

  return (
    <div>
      <div className='flex items-center justify-center my-4 p-2 bg-neutral-800'>
        <img className='w-10 position relative left-12' src="./search.gif" alt="" />
        <input
          type="text"
          value={location}
          onChange={handleLocationChange}
          placeholder='Search City...'
          className='text-xl text-slate-900 w-[450px] py-6 h-10 px-14 border-2 rounded-[20px]'
        />
        <button
          onClick={handleSearch}
          className="flex py-2 position px-4  text-xl  mx-2 border rounded-3xl text-gray-900 bg-gradient-to-r from-green-500 to-lime-200"
        >
        <h1 className=''>Search</h1>

        </button>
      </div>

      {weatherData ? (
        <div className='text-white border-2 border-white w-[350px]'>
          <p>Temperature: {weatherData?.main?.temp}°C</p>
          <p>Feels Like: {weatherData?.main?.feels_like}°C</p>
          <p>Min Temperature: {weatherData?.main?.temp_min}°C</p>
          <p>Max Temperature: {weatherData?.main?.temp_max}°C</p>
          <p>Weather: {weatherData?.weather[0]?.description}</p>
          <p>Humidity: {weatherData?.main?.humidity}%</p>
          <p>Wind Speed: {weatherData?.wind?.speed} m/s</p>
          <p>Country: {weatherData?.sys?.country}</p>
          <p>City: {weatherData?.name}</p>
          <p>Sunrise: {weatherData?.sys?.sunrise && new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
          <p>Sunset: {weatherData?.sys?.sunset && new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>

          {/* Display weather icon */}
          {weatherData?.weather[0]?.icon && (
            <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="Weather icon" />
          )}
        </div>
      ) : (<div className='text-white text-2xl text-center'>
        <p>Please enter a city to see the weather.</p>
      </div>
      )}
    </div>
  );
};

export default Weather;
