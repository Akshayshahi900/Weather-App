import React, { useState } from 'react';

const Weather = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState({});

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSearch = async () => {
    if (!location) return;

    try {
      const response = await fetch(`http://localhost:5000/api/weather?city=${location}`);
      const data = await response.json();
      console.log(data);

      setWeatherData({
        // coord: {
        //   lon: data.coord.lon,
        //   lat: data.coord.lat,
        // },
        weather: {
          main: data.weather[0].main,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
        },
        main: {
          temp: data.main.temp,
          feelsLike: data.main.feels_like, // Corrected from feeks_like to feels_like
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
      });
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  return (
    <div>
      <div>
        <div className='flex items-center justify-center my-4 p-2 bg-neutral-800'>
          <input
            type="text"
            name="city"
            id=""
            className='text-xl text-slate-900 w-[450px] py-6 h-10 px-14 border-2 rounded-[20px]'
            value={location}
            onChange={handleLocationChange}
            placeholder='Search City...'
          />

          <button
            type="button"
            onClick={handleSearch}
            className="flex text-gray-900 bg-gradient-to-r from-green-500 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            <img src="./search.gif" alt="" className='w-8' /> Teal to Lime
          </button>
        </div>
      </div>

      {weatherData && weatherData.main ? (
        <div>
          <p>Temperature: {weatherData.main.temp}°C</p>
          {/* Render other weather data here if needed */}
        </div>
      ) : (
        <div>
          <p>Please enter a city to see the weather.</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
