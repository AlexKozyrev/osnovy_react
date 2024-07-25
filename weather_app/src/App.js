import React, { useState, useEffect } from 'react';
import CitySelector from './CitySelector';
import WeatherDisplay from './WeatherDisplay';
import axios from 'axios';

const App = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = 'd0f95dd1152dda7d7c60e4f7772ce987'; // Replace with your actual API key

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption.value);
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (selectedCity) {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${apiKey}&units=metric`
          );
          setWeatherData(response.data);
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      }
    };

    fetchWeatherData();
  }, [selectedCity, apiKey]);

  return (
    <div>
      <h1>Weather App</h1>
      <CitySelector onChange={handleCityChange} />
      {weatherData && <WeatherDisplay data={weatherData} />}
    </div>
  );
};

export default App;
