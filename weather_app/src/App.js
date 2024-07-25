import React, { useState } from 'react';
import CitySelector from './CitySelector';
import WeatherDisplay from './WeatherDisplay';
import axios from 'axios';
const App = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const apiKey = 'd0f95dd1152dda7d7c60e4f7772ce987'; // Замените на ваш собственный API ключ

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption.value);
  };

  const fetchWeatherData = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
      setError(null); // Сбрасываем ошибку, если запрос успешен
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Данные не найдены'); // Устанавливаем сообщение об ошибке
      setWeatherData(null); // Сбрасываем данные о погоде при ошибке
    }
  };

  const fetchWeatherByGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
            );
            setWeatherData(response.data);
            setError(null); // Сбрасываем ошибку, если запрос успешен
          } catch (error) {
            console.error('Error fetching weather data by geolocation:', error);
            setError('Данные не найдены'); // Устанавливаем сообщение об ошибке
            setWeatherData(null); // Сбрасываем данные о погоде при ошибке
          }
        },
        (error) => {
          console.error('Error getting geolocation:', error);
          setError('Не удалось получить местоположение'); // Устанавливаем сообщение об ошибке
        }
      );
    } else {
      setError('Геолокация не поддерживается вашим браузером');
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <CitySelector
          onChange={handleCityChange}
          style={{ width: '200px', marginRight: '10px' }} // Узкий селектор
        />
        <button onClick={fetchWeatherByGeolocation} style={{ marginLeft: '10px' }}>
          Получить по геолокации
        </button> </div>
        <button onClick={() => fetchWeatherData(selectedCity)}>
          Текущая погода
        </button>


      {error && (
        <div style={{ textAlign: 'center', color: 'red', marginTop: '10px' }}>
          <p>{error}</p>
          <img src={'error_weather.svg'} alt="Ошибка" style={{ width: '100px', height: '100px' }} />
        </div>
      )}
      {weatherData && <WeatherDisplay data={weatherData} />}
    </div>
  );
};

export default App;