import React, { useEffect } from 'react';

const WeatherCard = ({ weatherData }) => {
  if (!weatherData) {
    return <p>Loading...</p>; // Display a loading message if data is not available
  }

  const {
    main: { temp, feelsLike, tempMin, tempMax, humidity, pressure },
    weather,
    wind: { speed },
    sys: { sunrise, sunset, country },
    name,
    clouds,
  } = weatherData;

  // Temperature values in Celsius
  const tempCelsius = Math.round(temp); // Assuming temp is already in Celsius
  const feelsLikeCelsius = feelsLike !== undefined ? Math.round(feelsLike) : "N/A";
  const minTempCelsius = tempMin !== undefined ? Math.round(tempMin) : "N/A";
  const maxTempCelsius = tempMax !== undefined ? Math.round(tempMax) : "N/A";

  // Weather icon URL
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  // Convert sunrise and sunset strings to a valid time format
  const convertTo24HourFormat = (time) => {
    const [timePart, modifier] = time.split(' ');
    let [hours, minutes, seconds] = timePart.split(':');

    if (modifier === 'pm' && hours !== '12') {
      hours = parseInt(hours, 10) + 12; // Convert to 24-hour format
    } else if (modifier === 'am' && hours === '12') {
      hours = '00'; // Convert 12 AM to 00 hours
    }

    return `${hours}:${minutes}`;
  };

  const sunriseTime = sunrise ? convertTo24HourFormat(sunrise) : "N/A"; // Convert to 24-hour format
  const sunsetTime = sunset ? convertTo24HourFormat(sunset) : "N/A"; // Convert to 24-hour format

  return (
    <div>
      <div style={{
        background: 'linear-gradient(to right, rgb(58, 58, 58), rgb(48, 48, 48))',
      }} className="flex weather-card  w-[730px] h-[330px] text-white   shadow-lg">
        <div className="flex justify-between items-center ">
          <div className="temp text-3xl font-bold">{tempCelsius}°C</div>
          <div className="feels-like text-lg">Feels like: {feelsLikeCelsius}°C</div>
        </div>

        <div className="flex  items-center ">
          <div className="sun-info text-white">
            <div className="sunrise flex gap-4 m-2">
              <div><img src="./sunrise.png" alt="" /></div>
              <div>
                <div>Sunrise</div>
                <div>{sunriseTime}</div>
              </div>
            </div>
            <div className="sunset flex  m-2 mt-4 gap-4">
              <div><img src="./sunset.png" alt="" /></div>
              <div>
                <div>Sunset</div>
                <div>{sunsetTime}</div>
              </div>
            </div>
          </div>
          <div className='weather-icon '>
            <img src={iconUrl} alt="" />
          </div>
          {/* {weather && weather.length > 0 && (
            <div className="weather-icon">
              <img
                src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} // Correctly using the template string
                alt={weather[0].description} // Alt text for accessibility
              />
            </div>
          )} */}
        </div>

        <div className="humidity">
          <img src="./humidity.png" alt="" />
          <p>{humidity !== undefined ? humidity : "N/A"}%</p>
          <p>Humidity</p>
        </div>
        <div className="wind-speed">
          <img src="./windspeed.png" alt="" />
          <p>{speed !== undefined ? speed : "N/A"} km/h</p>
          <p>Wind Speed</p>
        </div>
        <div className="pressure">
          <img src="./pressure.png" alt="" />
          <p>{pressure !== undefined ? pressure : "N/A"} hPa</p>
          <p>Pressure</p>
        </div>
        <div className="cloudiness">
          <img className='w-[58px] h-[58px]' src="./clouds.png" alt="" />
          <p>{clouds !== undefined ? clouds : "N/A"}%</p>
          <p>Cloudiness</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;