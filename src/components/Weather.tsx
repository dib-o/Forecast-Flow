import React, { useState } from "react";

type WeatherData = {
  location: {
    name: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    feelslike_c: number;
    condition: { text: string; icon: string };
    wind_kph: number;
    wind_dir: string;
    humidity: number;
    pressure_mb: number;
    cloud: number;
    vis_km: number;
  };
  forecast: {
    forecastday: {
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        avgtemp_c: number;
        condition: { text: string; icon: string };
      };
      hour: {
        time: string;
        temp_c: number;
        condition: { text: string; icon: string };
      }[];
    }[];
  };
};

const WeatherAPIExample = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");

  const API_KEY = "f34b437b52954cf4bf3121117250209"; // Replace with WeatherAPI key

  const getWeather = async () => {
    try {
      setError("");
      setWeather(null);

      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3&aqi=no&alerts=no`
      );

      if (!response.ok) throw new Error("City not found");

      const data: WeatherData = await response.json();
      setWeather(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter a city"
      />
      <button onClick={getWeather}>Search</button>

      {error && <p>⚠️ {error}</p>}

      {weather && (
        <div>
          <h2>
            📍 {weather.location.name}, {weather.location.country}
          </h2>
          <p>🌡 Temperature: {weather.current.temp_c} °C</p>
          <p>🤔 Feels like: {weather.current.feelslike_c} °C</p>
          <p>
            ☁ Condition: {weather.current.condition.text}{" "}
            <img src={weather.current.condition.icon} alt="" />
          </p>
          <p>
            💨 Wind: {weather.current.wind_kph} kph {weather.current.wind_dir}
          </p>
          <p>💧 Humidity: {weather.current.humidity}%</p>
          <p>🌫 Pressure: {weather.current.pressure_mb} hPa</p>
          <p>☁ Cloudiness: {weather.current.cloud}%</p>
          <p>👁 Visibility: {weather.current.vis_km} km</p>
          <p>🕒 Local Time: {weather.location.localtime}</p>

          <h3>📅 3-Day Forecast</h3>
          {weather.forecast.forecastday.map((day) => (
            <div key={day.date}>
              <h4>{day.date}</h4>
              <p>
                🌡 {day.day.mintemp_c}°C - {day.day.maxtemp_c}°C |{" "}
                {day.day.condition.text}
                <img src={day.day.condition.icon} alt="" />
              </p>

              <details>
                <summary>Hourly</summary>
                {day.hour.map((h) => (
                  <p key={h.time}>
                    🕒 {h.time} → {h.temp_c}°C, {h.condition.text}
                    <img src={h.condition.icon} alt="" />
                  </p>
                ))}
              </details>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherAPIExample;
