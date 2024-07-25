import React from 'react';

const WeatherDisplay = ({ data }) => {
  return (
    <div>
      <h2>{data.name}</h2>
      <p>Temperature: {data.main.temp}°C</p>
      {/* Add more weather details as needed */}
    </div>
  );
};

export default WeatherDisplay;