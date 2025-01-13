import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Weather from './Weather';

const App = () => {
  const [city, setCity] = useState('Mira Road'); // Default city
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  // Function to fetch weather data from the API
  const fetchWeatherData = async () => {
    const API_KEY = '0624c05bbdd6e0444c9b931f49d32bd1';  // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    try {
      const response = await axios.get(url);
      setWeatherData(response.data);
      setError(null);
    } catch (err) {
      console.error("API Fetch Error:", err);
      setError('City not found!');
      setWeatherData(null);
    }
  };

  // Fetch weather data when the city changes
  useEffect(() => {
    fetchWeatherData();
  }, [city]);

  return (
    <div className="App">
      <h1>Weather App</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeatherData}>Get Weather</button>
      </div>
      {error && <p className="error">{error}</p>}
      {weatherData ? <Weather data={weatherData} /> : <p>Loading...</p>}
    </div>
  );
};

export default App;
