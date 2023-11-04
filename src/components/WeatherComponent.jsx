import React, { useState, useEffect } from "react";
import axios from "axios";
import "../sass/components/weatherComponent.scss";
import { API_KEY } from "../apiKey";

export default function WeatherComponent() {
  const [cityInput, setCityInput] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetchWeatherWithPosition();
  }, []);

  const fetchWeatherWithPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          fetchWeatherData(`lat=${latitude}&lon=${longitude}`);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    return null;
  };

  const fetchWeatherData = async (location) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?${location}&appid=${API_KEY}&units=metric&lang=fr`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    await fetchWeatherData(`q=${cityInput}`);
  };

  return (
    <div className="weatherComponent">
      <form
        onSubmit={async (e) => await handleSearch(e)}
        className="city-input"
      >
        <input
          type="text"
          placeholder="Marseille, Lyon, Lille, ..."
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
        />
        <input type="submit" value="✓" />
      </form>
      {weatherData && (
        <div className="weather-container">
          <div className="city_icon">
            <h2>{weatherData?.name ?? "N/A"}</h2>
            {weatherData && (
              <div className="weather-icon">
                <img
                  src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                  alt="Weather Icon"
                />
              </div>
            )}
            <div className="weather-info">
              <div className="temperature">
                {Math.round(weatherData?.main.temp ?? 0)}°C
              </div>
              <div className="description">
                {weatherData?.weather[0].description ?? "N/A"}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
