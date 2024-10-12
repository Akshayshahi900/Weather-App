import React, { useEffect } from 'react';

const WeatherCard = ({ weatherData }) => {
  if (!weatherData) {
    return <p>Loading...</p>; // Display a loading message if data is not available
  }

  const {
    main: { temp, feels_like, temp_min, temp_max, humidity, pressure },
    weather,
    wind: { speed },
    sys: { sunrise, sunset, country },
    name,
    clouds: { all: cloudiness }, // Correct access to cloudiness
  } = weatherData;

  // Temperature values in Celsius
  const tempCelsius = Math.round(temp);
  const feelsLikeCelsius = feels_like !== undefined ? Math.round(feels_like) : "N/A";
  const minTempCelsius = temp_min !== undefined ? Math.round(temp_min) : "N/A";
  const maxTempCelsius = temp_max !== undefined ? Math.round(temp_max) : "N/A";

  // Weather icon URL
  const iconUrl = weather?.[0]?.icon ? `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png` : null;

  // Convert UNIX timestamp to a valid time format
  const convertUnixToTime = (unixTime) => {
    const date = new Date(unixTime * 1000); // Convert to milliseconds
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const sunriseTime = sunrise ? convertUnixToTime(sunrise) : "N/A";
  const sunsetTime = sunset ? convertUnixToTime(sunset) : "N/A";

  return (
    <div>
      <div
        style={{
          background: 'linear-gradient(to right, rgb(58, 58, 58), rgb(48, 48, 48))',
        }}
        className="flex weather-card w-[730px] h-[330px] text-white shadow-lg"
      >
        <div className="flex justify-between items-center">
          <div className="temp text-3xl font-bold">{tempCelsius}°C</div>
          <div className="feels-like text-lg">Feels like: {feelsLikeCelsius}°C</div>
        </div>

        <div className="flex items-center">
          <div className="sun-info text-white">
            <div className="sunrise flex gap-4 m-2">
              <div><img src="./sunrise.png" alt="Sunrise" /></div>
              <div>
                <div>Sunrise</div>
                <div>{sunriseTime}</div>
              </div>
            </div>
            <div className="sunset flex m-2 mt-4 gap-4">
              <div><img src="./sunset.png" alt="Sunset" /></div>
              <div>
                <div>Sunset</div>
                <div>{sunsetTime}</div>
              </div>
            </div>
          </div>
          <div className="weather-icon">
            {iconUrl && <img src={iconUrl} alt={weather?.[0]?.description || 'Weather Icon'} />}
          </div>
        </div>

        <div className="humidity">
          <img src="./humidity.png" alt="Humidity" />
          <p>{humidity !== undefined ? humidity : "N/A"}%</p>
          <p>Humidity</p>
        </div>
        <div className="wind-speed">
          <img src="./windspeed.png" alt="Wind Speed" />
          <p>{speed !== undefined ? speed : "N/A"} km/h</p>
          <p>Wind Speed</p>
        </div>
        <div className="pressure">
          <img src="./pressure.png" alt="Pressure" />
          <p>{pressure !== undefined ? pressure : "N/A"} hPa</p>
          <p>Pressure</p>
        </div>
        <div className="cloudiness">
          <img className="w-[58px] h-[58px]" src="./clouds.png" alt="Cloudiness" />
          <p>{cloudiness !== undefined ? cloudiness : "N/A"}%</p>
          <p>Cloudiness</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
