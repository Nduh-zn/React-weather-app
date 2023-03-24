import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

const API_KEY = '6400672fc96cafc7787f5bdda63b98a7';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
      const response = await axios.get(url);
      setWeatherData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app">
      <header>
        <h1>Weather App</h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter a city name"
            value={city}
            onChange={handleCityChange}
          />
          <button type="submit">Search</button>
        </form>
      </header>

      {weatherData && (
        <div className="weather-data">
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <div className="temperature">{Math.round(weatherData.main.temp)}°C</div>
          <div className="weather-description">{weatherData.weather[0].description}</div>
          <div className="weather-image">
            <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="Weather Icon" />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
