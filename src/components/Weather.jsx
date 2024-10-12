import React, { useState } from 'react';
import WeatherCard from './WeatherCard';
import Clock from 'react-clock';

const Weather = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };
 const getCurrentLocation = (event) =>{

 };
  const handleSearch = async () => {
    if (!location) return;

    try {
      const response = await fetch(`http://localhost:3000/api/weather?city=${location}`);
      console.log("Response Status:", response.status);

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      // console.log("Weather Data:", data);  // Log the received data

      setWeatherData(data); // Directly set the received data

    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch weather data.");
    }
  };

  return (
    <div>
      <div className='flex items-center justify-center  p-2'>
        <img  onClick={handleSearch} className='w-10 position relative left-12' src="./search.png" alt="" />
        <input
          type="text"
          style={{
      
            background: 'linear-gradient(to right, rgb(58, 58, 58), rgb(48, 48, 48))',
          }}
          value={location}
          onChange={handleLocationChange}
          placeholder='Search for your preffered city...'
          className='text-md text-gray-400 w-[450px] py-6 h-10 px-14 border-2 rounded-[20px] focus: border-2-gray-600'
        />
        
        <button style={{ backgroundColor: 'rgba(76, 187, 23, 1)' }}
          className="  border rounded-3xl flex items-center gap-1 m-2 text-white font-semibold py-2 px-4  shadow-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 transition-all"
          onClick={getCurrentLocation}
        >
          <img src="./location.png"  className='w-8' alt="" />
          <h1 className='text-md'>Current Location</h1>
        </button>
      </div>
     <Clock/>
      {weatherData ? (
  <WeatherCard weatherData={weatherData} />  // Use WeatherCard to display weather data
) : (
  <div className='text-white text-2xl text-center'>
    <p>Please enter a city to see the weather.</p>
  </div>
)}

    </div>
  );
};

export default Weather;
