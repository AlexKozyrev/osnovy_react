import React from 'react';

const WeatherDisplay = ({ data }) => {
  return (
    <div>
      <h2>{data.name}, {data.sys.country}</h2>
      <p>Temperature: {data.main.temp}°C (Feels like: {data.main.feels_like}°C)</p>
      <p>Condition: {data.weather[0].description}</p>
      <p>Humidity: {data.main.humidity}%</p>
      <p>Wind Speed: {data.wind.speed} m/s</p>
      {/* Add more weather details as needed */}
    </div>
  );
};

export default WeatherDisplay;