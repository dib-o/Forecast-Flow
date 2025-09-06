import { useState } from "react";
import "./App.css";
import LineGraph from "./components/LineGraph";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type WeatherData = {
  current: {
    // Time
    last_updated: string;
    last_updated_epoch: number;
    // Temperature
    temp_c: number;
    temp_f: number;
    feelslike_c: number;
    feelslike_f: number;
    windchill_c: number;
    windchill_f: number;
    heatindex_c: number;
    heatindex_f: number;
    dewpoint_c: number;
    dewpoint_f: number;
    // Wind
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    gust_mph: number;
    gust_kph: number;
    // Atmosphere
    humidity: number;
    cloud: number;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    // Air Quality
    air_quality: {
      co: number;
      no2: number;
      o3: number;
      so2: number;
      pm2_5: number;
      pm10: number;
      "us-epa-index": number;
      "gb-defra-index": number;
    };
    // Condition
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    is_day: number;
  };
  // Location
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  // Astronomy
  forecast: {
    forecastday: Forecastday[];
  };
  // Alert
  alerts: {
    alert: WeatherAlert[];
  };
};

type Forecastday = {
  date: string;
  day: {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    avgtemp_c: number;
    avgtemp_f: number;
    maxwind_mph: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    totalprecip_in: number;
    totalsnow_cm: number;
    avghumidity: number;
    uv: number;
    avgvis_km: number;
    avgvis_miles: number;
    daily_will_it_rain: number;
    daily_will_it_snow: number;
    daily_chance_of_rain: number;
    daily_chance_of_snow: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
  };
  astro: {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    moon_phase: string;
    moon_illumination: string;
    is_sun_up: number;
    is_moon_up: number;
  };
  hour: HourlyForecast[];
};

type WeatherAlert = {
  headline: string;
  msgtype: string;
  severity: string;
  urgency: string;
  areas: string;
  category: string;
  certainty: string;
  event: string;
  note: string;
  effective: string;
  expires: string;
  desc: string;
  instruction: string;
};

type HourlyForecast = {
  time: string;
  temp_c: number;
  temp_f: number;
  wind_kph: number;
  wind_mph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c: number;
  windchill_f: number;
  heatindex_c: number;
  heatindex_f: number;
  dewpoint_c: number;
  dewpoint_f: number;
  vis_km: number;
  vis_miles: number;
  gust_mph: number;
  gust_kph: number;
  uv: number;
};

const App = () => {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [today, setToday] = useState(true);
  const [tomorrow, setTomorrow] = useState(false);
  const [dayAfter, setDayAfter] = useState(false);
  const [dayNum, setDayNum] = useState(0);
  const API_KEY = "f34b437b52954cf4bf3121117250209";

  const GoBack = () => {
    setWeather(null);
    setCity("");
    GetToday();
  };

  const GoUp = () => {
    const element = document.getElementById("left-home");
    if (element) {
      element.scrollIntoView();
    }
  };

  const GetToday = () => {
    setDayNum(0);
    setToday(true);
    setTomorrow(false);
    setDayAfter(false);
  };
  const GetTomorrow = () => {
    setDayNum(1);
    setToday(false);
    setTomorrow(true);
    setDayAfter(false);
  };
  const GetDayAfter = () => {
    setDayNum(2);
    setToday(false);
    setTomorrow(false);
    setDayAfter(true);
  };

  const GetWeather = async () => {
    try {
      setError("");
      setWeather(null);

      const response =
        await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3&aqi=yes&alerts=yes
      `);

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data: WeatherData = await response.json();
      setWeather(data);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div id="home">
      <div id="left-home">
        <div id="title">
          <h1>
            Forecast
            <br />
            Flow
          </h1>
        </div>
        <div id="user-input">
          <input
            type="text"
            value={city}
            placeholder="Enter a city"
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div id="user-submit">
          <button onClick={GetWeather} disabled={!city.trim()}>
            Search
          </button>
          <button onClick={GoBack} disabled={weather === null}>
            Back
          </button>
        </div>
        {error && <div id="show-error">{error && <p>⚠️ {error}</p>}</div>}
      </div>
      <div id="right-home">
        {weather && (
          <div id="right-home-title">
            <button onClick={GetToday} className={today ? "active" : ""}>
              Today's
              <br />
              Weather Data
            </button>
            <button onClick={GetTomorrow} className={tomorrow ? "active" : ""}>
              Tomorrow's
              <br />
              Weather Data
            </button>
            <button onClick={GetDayAfter} className={dayAfter ? "active" : ""}>
              Next 2 Days Weather Data
            </button>
          </div>
        )}
        {weather && today && (
          <div className="data-container">
            <div id="real-time">
              <div id="real-time-title">
                <h2>Real-Time Weather Overview</h2>
              </div>
              <div id="real-time-data">
                <div className="group-data">
                  <div className="group-title">
                    <h3>Time Info</h3>
                  </div>
                  <div className="data-contents">
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          Last Updated
                          <span className="tooltip-text">
                            This shows the last time the weather data was
                            refreshed
                          </span>
                        </p>
                      </div>
                      <div className="data-value">
                        <p>{weather.current.last_updated}</p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          Last Updated Epoch
                          <span className="tooltip-text">
                            Local time when the real time data was updated in
                            unix time.
                          </span>
                        </p>
                      </div>
                      <div className="data-value">
                        <p>
                          {new Date(
                            weather.current.last_updated_epoch * 1000
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                {/*Time*/}
                <div className="group-data">
                  <div className="group-title">
                    <h3>Location</h3>
                  </div>
                  <div className="data-contents">
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          Name
                          <span className="tooltip-text">Location name.</span>
                        </p>
                      </div>
                      <div className="data-value">
                        <p>{weather.location.name}</p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          Region
                          <span className="tooltip-text">
                            Region or state of the location.
                          </span>
                        </p>
                      </div>
                      <div className="data-value">
                        <p>{weather.location.region}</p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          Country
                          <span className="tooltip-text">
                            Location country.
                          </span>
                        </p>
                      </div>
                      <div className="data-value">
                        <p>{weather.location.country}</p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          Latitude
                          <span className="tooltip-text">
                            Latitude in decimal degree.
                          </span>
                        </p>
                      </div>
                      <div className="data-value">
                        <p>
                          {weather.location.lat}
                          {weather.location.lat > 0 ? "° N" : "° S"}
                        </p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          Longitude
                          <span className="tooltip-text">
                            Longitude in decimal degree.
                          </span>
                        </p>
                      </div>
                      <div className="data-value">
                        <p>
                          {weather.location.lon}
                          {weather.location.lon > 0 ? "° E" : "° W"}
                        </p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          Timezone
                          <span className="tooltip-text">Time zone name.</span>
                        </p>
                      </div>
                      <div className="data-value">
                        <p>{weather.location.tz_id}</p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          Localtime
                          <span className="tooltip-text">
                            Local date and time.
                          </span>
                        </p>
                      </div>
                      <div className="data-value">
                        <p>{weather.location.localtime}</p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          Localtime Epoch
                          <span className="tooltip-text">
                            Local date and time in unix time.
                          </span>
                        </p>
                      </div>
                      <div className="data-value">
                        <p>
                          {new Date(
                            weather.location.localtime_epoch * 1000
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                {/*Location*/}
                <div className="group-data">
                  <div className="group-title">
                    <h3>Condition</h3>
                  </div>
                  <div className="data-contents">
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          Sky Status
                          <span className="tooltip-text">
                            Weather condition.
                          </span>
                        </p>
                      </div>
                      <div className="data-value">
                        <p>
                          <img src={weather.current.condition.icon} />{" "}
                          {weather.current.condition.text}
                        </p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          Code
                          <span className="tooltip-text">
                            Weather condition unique code.
                          </span>
                        </p>
                      </div>
                      <div className="data-value">
                        <p>{weather.current.condition.code}</p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          Time of Day
                          <span className="tooltip-text">
                            Show day condition.
                          </span>
                        </p>
                      </div>
                      <div className="data-value">
                        <p>{weather.current.is_day === 1 ? "Day" : "Night"}</p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          Rain Expected?
                          <span className="tooltip-text">
                            Will it will rain or not.
                          </span>
                        </p>
                      </div>
                      <div className="data-value">
                        <p>
                          {weather.forecast.forecastday[dayNum].day
                            .daily_will_it_rain === 1
                            ? "Yes"
                            : "No"}
                        </p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          Rain Chance
                          <span className="tooltip-text">
                            Chance of rain as percentage.
                          </span>
                        </p>
                      </div>
                      <div className="data-value">
                        <p>
                          {
                            weather.forecast.forecastday[dayNum].day
                              .daily_chance_of_rain
                          }{" "}
                          %
                        </p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          Snow Expected?
                          <span className="tooltip-text">
                            Will it snow or not.
                          </span>
                        </p>
                      </div>
                      <div className="data-value">
                        <p>
                          {weather.forecast.forecastday[dayNum].day
                            .daily_will_it_snow === 1
                            ? "Yes"
                            : "No"}
                        </p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          Snow Chance
                          <span className="tooltip-text">
                            Chance of snow as percentage.
                          </span>
                        </p>
                      </div>
                      <div className="data-value">
                        <p>
                          {
                            weather.forecast.forecastday[dayNum].day
                              .daily_chance_of_snow
                          }{" "}
                          %
                        </p>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                {/*Condition*/}
                <div className="group-data">
                  <div className="group-title">
                    <h3>Temperature</h3>
                  </div>
                  <div className="data-contents">
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          Temperature
                          <span className="tooltip-text">
                            Temperature in celcius and fahrenheit.
                          </span>
                        </p>
                      </div>
                      <div className="data-value">
                        <div className="two-values">
                          <p>{weather.current.temp_c} °C</p>
                        </div>
                        <div className="two-values">
                          <p>{weather.current.temp_f} °F</p>
                        </div>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          Max Temperature
                          <span className="tooltip-text">
                            Maximum temperature in celcius and fahrenheit for
                            the day.
                          </span>
                        </p>
                      </div>
                      <div className="data-value">
                        <div className="two-values">
                          <p>
                            {weather.forecast.forecastday[dayNum].day.maxtemp_c}{" "}
                            °C
                          </p>
                        </div>
                        <div className="two-values">
                          <p>
                            {weather.forecast.forecastday[dayNum].day.maxtemp_f}{" "}
                            °F
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          Min Temperature
                          <span className="tooltip-text">
                            Minimum temperature in celcius and fahrenheit for
                            the day.
                          </span>
                        </p>
                      </div>
                      <div className="data-value">
                        <div className="two-values">
                          <p>
                            {weather.forecast.forecastday[dayNum].day.mintemp_c}{" "}
                            °C{" "}
                          </p>
                        </div>
                        <div className="two-values">
                          <p>
                            {weather.forecast.forecastday[dayNum].day.mintemp_f}{" "}
                            °F
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          Average Temperature
                          <span className="tooltip-text">
                            Average temperature in celcius and fahrenheit for
                            the day.
                          </span>
                        </p>
                      </div>
                      <div className="data-value">
                        <div className="two-values">
                          <p>
                            {weather.forecast.forecastday[dayNum].day.avgtemp_c}{" "}
                            °C{" "}
                          </p>
                        </div>
                        <div className="two-values">
                          <p>
                            {weather.forecast.forecastday[dayNum].day.avgtemp_f}{" "}
                            °F
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          Feels Like
                          <span className="tooltip-text">
                            The current outside weather conditions actually feel
                            like to the human body as celcius and fahrenheit.
                          </span>
                        </p>
                      </div>
                      <div className="data-value">
                        <div className="two-values">
                          <p>{weather.current.feelslike_c} °C </p>
                        </div>
                        <div className="two-values">
                          <p>{weather.current.feelslike_f} °F</p>
                        </div>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          Wind Chill
                          <span className="tooltip-text">
                            The cooling effect of wind blowing on a surface in
                            celcius and fahrenheit.
                          </span>
                        </p>
                      </div>
                      <div className="data-value">
                        <div className="two-values">
                          <p>{weather.current.windchill_c} °C </p>
                        </div>
                        <div className="two-values">
                          <p>{weather.current.windchill_f} °F</p>
                        </div>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          Heat Index
                          <span className="tooltip-text">
                            The temperature feels like to the human body when
                            relative humidity is combined with the air
                            temperature in celcius and fahrenheit.
                          </span>
                        </p>
                      </div>
                      <div className="data-value">
                        <div className="two-values">
                          <p>{weather.current.heatindex_c} °C </p>
                        </div>
                        <div className="two-values">
                          <p>{weather.current.heatindex_f} °F</p>
                        </div>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          Dew Point
                          <span className="tooltip-text">
                            The temperature to which air must be cooled for
                            water vapor to condense out of it in celcius and
                            fahrenheit.
                          </span>
                        </p>
                      </div>
                      <div className="data-value">
                        <div className="two-values">
                          <p>{weather.current.dewpoint_c} °C </p>
                        </div>
                        <div className="two-values">
                          <p>{weather.current.dewpoint_f} °F</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                {/*Temperature*/}
                <div className="group-data">
                  <div className="group-title">
                    <h3>Wind</h3>
                  </div>
                  <div className="data-contents">
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          Speed
                          <span className="tooltip-text">
                            Wind speed in miles per hour and kilometer per hour.
                          </span>
                        </p>
                      </div>
                      <div className="data-value">
                        <div className="two-values">
                          <p>{weather.current.wind_mph} mph </p>
                        </div>
                        <div className="two-values">
                          <p>{weather.current.wind_kph} kph </p>
                        </div>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          Max Speed
                          <span className="tooltip-text">
                            Maximum wind speed in miles per hour and kilometer
                            per hour.
                          </span>
                        </p>
                      </div>
                      <div className="data-value">
                        <div className="two-values">
                          <p>
                            {
                              weather.forecast.forecastday[dayNum].day
                                .maxwind_mph
                            }{" "}
                            mph{" "}
                          </p>
                        </div>
                        <div className="two-values">
                          <p>
                            {
                              weather.forecast.forecastday[dayNum].day
                                .maxwind_kph
                            }{" "}
                            kph{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          Direction
                          <span className="tooltip-text">
                            Wind direction in degrees and as 16 point compass.
                          </span>
                        </p>
                      </div>
                      <div className="data-value">
                        <div className="two-values">
                          <p>{weather.current.wind_degree}°</p>
                        </div>
                        <div className="two-values">
                          <p>{weather.current.wind_dir}</p>
                        </div>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          Gusts
                          <span className="tooltip-text">
                            Wind gust in miles per hour and kilometer per hour.
                          </span>
                        </p>
                      </div>
                      <div className="data-value">
                        <div className="two-values">
                          <p>{weather.current.gust_mph} mph </p>
                        </div>
                        <div className="two-values">
                          <p>{weather.current.gust_kph} kph </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                {/*Wind*/}
                <div className="group-data">
                  <div className="group-title">
                    <h3>Air Quality</h3>
                  </div>
                  <div className="data-contents">
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          CO
                          <span className="tooltip-text">Carbon Monoxide</span>
                        </p>
                      </div>
                      <div className="data-value">
                        <p>{weather.current.air_quality.co} µg/m³</p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          O₃<span className="tooltip-text">Ozone</span>
                        </p>
                      </div>
                      <div className="data-value">
                        <p>{weather.current.air_quality.o3} µg/m³</p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          NO₂
                          <span className="tooltip-text">Nitrogen Dioxide</span>
                        </p>
                      </div>
                      <div className="data-value">
                        <p>{weather.current.air_quality.no2} µg/m³</p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          SO₂
                          <span className="tooltip-text">Sulphur Dioxide</span>
                        </p>
                      </div>
                      <div className="data-value">
                        <p>{weather.current.air_quality.so2} µg/m³</p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          PM2.5
                          <span className="tooltip-text">
                            Particulate matter with a diameter of 2.5
                            micrometers or less.
                          </span>
                        </p>
                      </div>
                      <div className="data-value">
                        <p>{weather.current.air_quality.pm2_5} µg/m³</p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          PM10
                          <span className="tooltip-text">
                            Particulate matter with a diameter of 10 micrometers
                            or less.
                          </span>
                        </p>
                      </div>
                      <div className="data-value">
                        <p>{weather.current.air_quality.pm10} µg/m³</p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          US EPA Index
                          <span className="tooltip-text">
                            US - EPA standard
                            <br />
                            1 means Good
                            <br />
                            2 means Moderate
                            <br />
                            3 means Unhealthy for sensitive group
                            <br />
                            4 means Unhealthy
                            <br />
                            5 means Very Unhealthy
                            <br />6 means Hazardous
                          </span>
                        </p>
                      </div>
                      <div className="data-value">
                        <p>
                          {weather.current.air_quality["us-epa-index"]}{" "}
                          {weather.current.air_quality["us-epa-index"] === 1
                            ? "(Good)"
                            : weather.current.air_quality["us-epa-index"] === 2
                            ? "(Moderate)"
                            : weather.current.air_quality["us-epa-index"] === 3
                            ? "(Unhealthy for sensitive group)"
                            : weather.current.air_quality["us-epa-index"] === 4
                            ? "(Unhealthy)"
                            : weather.current.air_quality["us-epa-index"] === 5
                            ? "Very Unhealthy"
                            : "Hazardous"}
                        </p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          UK DEFRA Index
                          <span className="tooltip-text">
                            UK DEFRA standard
                            <br />
                            1-3 means Low (0-35 µg/m³)
                            <br />
                            4-6 means Moderate (36-53 µg/m³)
                            <br />
                            7-9 means High (54-70 µg/m³)
                            <br />
                            10 means Very High (71 or more µg/m³)
                          </span>
                        </p>
                      </div>
                      <div className="data-value">
                        <p>
                          {weather.current.air_quality["gb-defra-index"]}{" "}
                          {weather.current.air_quality["gb-defra-index"] <= 3
                            ? "(Low)"
                            : weather.current.air_quality["gb-defra-index"] <= 6
                            ? "(Moderate)"
                            : weather.current.air_quality["gb-defra-index"] <= 9
                            ? "(High)"
                            : "(Very High)"}{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                {/*Air Quality*/}
                <div className="group-data">
                  <div className="group-title">
                    <h3>Astronomy</h3>
                  </div>
                  <div className="data-contents">
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          Sunrise
                          <span className="tooltip-text">Sunrise time.</span>
                        </p>
                      </div>
                      <div className="data-value">
                        <p>
                          {weather.forecast.forecastday[dayNum].astro.sunrise}
                        </p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          Sunset
                          <span className="tooltip-text">Sunset time.</span>
                        </p>
                      </div>
                      <div className="data-value">
                        <p>
                          {weather.forecast.forecastday[dayNum].astro.sunset}
                        </p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          Moonrise
                          <span className="tooltip-text">Moonrise time.</span>
                        </p>
                      </div>
                      <div className="data-value">
                        <p>
                          {weather.forecast.forecastday[dayNum].astro.moonrise}
                        </p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          Moonset
                          <span className="tooltip-text">Moonset time.</span>
                        </p>
                      </div>
                      <div className="data-value">
                        <p>
                          {weather.forecast.forecastday[dayNum].astro.moonset}
                        </p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          Moon Phase
                          <span className="tooltip-text">
                            The apparent shape of the Moon's sunlit portion as
                            seen from Earth, changing as the Moon orbits our
                            planet.
                          </span>
                        </p>
                      </div>
                      <div className="data-value">
                        <p>
                          {
                            weather.forecast.forecastday[dayNum].astro
                              .moon_phase
                          }
                        </p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          Moon Illumination
                          <span className="tooltip-text">
                            The percentage or fraction of the Moon's surface
                            that is lit by the Sun as observed from Earth.
                          </span>
                        </p>
                      </div>
                      <div className="data-value">
                        <p>
                          {
                            weather.forecast.forecastday[dayNum].astro
                              .moon_illumination
                          }{" "}
                          %
                        </p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          Sun Status
                          <span className="tooltip-text">
                            Determine if the sun is currently up, based on
                            sunset and sunrise time at the provided location and
                            date.
                          </span>
                        </p>
                      </div>
                      <div className="data-value">
                        <p>
                          {(() => {
                            const localTime = new Date(
                              weather.location.localtime
                            );
                            const sunrise = new Date(
                              `${weather.forecast.forecastday[dayNum].date} ${weather.forecast.forecastday[dayNum].astro.sunrise}`
                            );
                            const sunset = new Date(
                              `${weather.forecast.forecastday[dayNum].date} ${weather.forecast.forecastday[dayNum].astro.sunset}`
                            );
                            return localTime >= sunrise && localTime <= sunset
                              ? "Sun is up"
                              : "Sun is down";
                          })()}
                        </p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          Moon Status
                          <span className="tooltip-text">
                            Determine if the moon is currently up, based on moon
                            set and moon rise time at the provided location and
                            date.
                          </span>
                        </p>
                      </div>
                      <div className="data-value">
                        <p>
                          {(() => {
                            const localTime = new Date(
                              weather.location.localtime
                            );
                            const moonrise = new Date(
                              `${weather.forecast.forecastday[dayNum].date} ${weather.forecast.forecastday[dayNum].astro.moonrise}`
                            );
                            const moonset = new Date(
                              `${weather.forecast.forecastday[dayNum].date} ${weather.forecast.forecastday[dayNum].astro.moonset}`
                            );
                            return localTime >= moonrise && localTime <= moonset
                              ? "Moon is up"
                              : "Moon is down";
                          })()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                {/*Astronomy*/}
                <div className="group-data">
                  <div className="group-title">
                    <h3>Atmosphere</h3>
                  </div>
                  <div className="data-contents">
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          Humidity
                          <span className="tooltip-text">
                            Amount of water vapor present in the air as
                            percentage.
                          </span>
                        </p>
                      </div>
                      <div className="data-value">
                        <p>{weather.current.humidity} %</p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          Average Humidity
                          <span className="tooltip-text">
                            Average amount of water vapor present in the air as
                            percentage.
                          </span>
                        </p>
                      </div>
                      <div className="data-value">
                        <p>
                          {weather.forecast.forecastday[dayNum].day.avghumidity}{" "}
                          %
                        </p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          Cloud
                          <span className="tooltip-text">
                            A mass of cloud covering all or most of the sky as
                            percentage.
                          </span>
                        </p>
                      </div>
                      <div className="data-value">
                        <p>{weather.current.cloud} %</p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          Pressure
                          <span className="tooltip-text">
                            The force applied to a surface for every unit of
                            area in millibars and inches
                          </span>
                        </p>
                      </div>
                      <div className="data-value">
                        <div className="two-values">
                          <p>{weather.current.pressure_mb} mb </p>
                        </div>
                        <div className="two-values">
                          <p>{weather.current.pressure_in} in </p>
                        </div>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          Precipitation
                          <span className="tooltip-text">
                            Liquid or frozen water released from Earth's
                            atmosphere that falls to the surface, such as rain,
                            snow, sleet, or hail in millimeters and inches.
                          </span>
                        </p>
                      </div>
                      <div className="data-value">
                        <div className="two-values">
                          <p>{weather.current.precip_mm} mm </p>
                        </div>
                        <div className="two-values">
                          <p>{weather.current.precip_in} in </p>
                        </div>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          Total Precipitation
                          <span className="tooltip-text">
                            Total Liquid or frozen water released from Earth's
                            atmosphere that falls to the surface, such as rain,
                            snow, sleet, or hail in millimeters and inches.
                          </span>
                        </p>
                      </div>
                      <div className="data-value">
                        <div className="two-values">
                          <p>
                            {
                              weather.forecast.forecastday[dayNum].day
                                .totalprecip_mm
                            }{" "}
                            mm{" "}
                          </p>
                        </div>
                        <div className="two-values">
                          <p>
                            {
                              weather.forecast.forecastday[dayNum].day
                                .totalprecip_in
                            }{" "}
                            in{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          Visibility
                          <span className="tooltip-text">
                            Distance at which an observer can clearly see and
                            recognize objects on the ground or in the air in
                            kilometers and miles.
                          </span>
                        </p>
                      </div>
                      <div className="data-value">
                        <div className="two-values">
                          <p>{weather.current.vis_km} km </p>
                        </div>
                        <div className="two-values">
                          <p>{weather.current.vis_miles} miles </p>
                        </div>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          Average Visibility
                          <span className="tooltip-text">
                            Average Distance at which an observer can clearly
                            see and recognize objects on the ground or in the
                            air in kilometers and miles.
                          </span>
                        </p>
                      </div>
                      <div className="data-value">
                        <div className="two-values">
                          <p>
                            {weather.forecast.forecastday[dayNum].day.avgvis_km}{" "}
                            km
                          </p>
                        </div>
                        <div className="two-values">
                          <p>
                            {
                              weather.forecast.forecastday[dayNum].day
                                .avgvis_miles
                            }{" "}
                            miles
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          Total Snow
                          <span className="tooltip-text">
                            The cumulative amount of snow that falls in
                            centimeters
                          </span>
                        </p>
                      </div>
                      <div className="data-value">
                        <div className="two-values">
                          <p>
                            {
                              weather.forecast.forecastday[dayNum].day
                                .totalsnow_cm
                            }{" "}
                            cm{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p className="tooltip">
                          UV index
                          <span className="tooltip-text">
                            Global standard measurement of the sun's ultraviolet
                            (UV) radiation, indicating the risk of damage to
                            skin and eyes
                          </span>
                        </p>
                      </div>
                      <div className="data-value">
                        <p>
                          {weather.current.uv}{" "}
                          {weather.current.uv <= 2
                            ? "(Low)"
                            : weather.current.uv <= 5
                            ? "(Moderate)"
                            : weather.current.uv <= 7
                            ? "(High)"
                            : weather.current.uv <= 10
                            ? "(Very High)"
                            : "(Extreme)"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                {/*Atmosphere*/}
              </div>
            </div>
            <div id="alert-time">
              <div id="alert-time-title">
                <h2>Active Weather Warnings</h2>
              </div>
              <div id="alert-data">
                <div className="group-data">
                  <div className="group-title">
                    <h3>Alert</h3>
                  </div>
                  {weather?.alerts?.alert?.[dayNum]?.headline ? (
                    <div className="data-contents">
                      <div className="data">
                        <div className="data-title">
                          <p className="tooltip">
                            Headline
                            <span className="tooltip-text">
                              Title of the alert.
                            </span>
                          </p>
                        </div>
                        <div className="data-value">
                          <p>{weather.alerts.alert[dayNum].headline}</p>
                        </div>
                      </div>
                      <div className="data">
                        <div className="data-title">
                          <p className="tooltip">
                            Message Type
                            <span className="tooltip-text">
                              Type of message.
                            </span>
                          </p>
                        </div>
                        <div className="data-value">
                          <p>{weather.alerts.alert[dayNum].msgtype}</p>
                        </div>
                      </div>
                      <div className="data">
                        <div className="data-title">
                          <p className="tooltip">
                            Severity
                            <span className="tooltip-text">
                              Level of seriousness.
                            </span>
                          </p>
                        </div>
                        <div className="data-value">
                          <p>{weather.alerts.alert[dayNum].severity}</p>
                        </div>
                      </div>
                      <div className="data">
                        <div className="data-title">
                          <p className="tooltip">
                            Urgency
                            <span className="tooltip-text">
                              How quickly action is needed.
                            </span>
                          </p>
                        </div>
                        <div className="data-value">
                          <p>{weather.alerts.alert[dayNum].urgency}</p>
                        </div>
                      </div>
                      <div className="data">
                        <div className="data-title">
                          <p className="tooltip">
                            Areas
                            <span className="tooltip-text">
                              Regions affected.
                            </span>
                          </p>
                        </div>
                        <div className="data-value">
                          <p>{weather.alerts.alert[dayNum].areas}</p>
                        </div>
                      </div>
                      <div className="data">
                        <div className="data-title">
                          <p className="tooltip">
                            Category
                            <span className="tooltip-text">Type of hazard</span>
                          </p>
                        </div>
                        <div className="data-value">
                          <p>{weather.alerts.alert[dayNum].category}</p>
                        </div>
                      </div>
                      <div className="data">
                        <div className="data-title">
                          <p className="tooltip">
                            Certainty
                            <span className="tooltip-text">
                              Likelihood of event
                            </span>
                          </p>
                        </div>
                        <div className="data-value">
                          <p>{weather.alerts.alert[dayNum].certainty}</p>
                        </div>
                      </div>
                      <div className="data">
                        <div className="data-title">
                          <p className="tooltip">
                            Event
                            <span className="tooltip-text">
                              Name of the event.
                            </span>
                          </p>
                        </div>
                        <div className="data-value">
                          <p>{weather.alerts.alert[dayNum].event}</p>
                        </div>
                      </div>
                      <div className="data">
                        <div className="data-title">
                          <p className="tooltip">
                            Note
                            <span className="tooltip-text">
                              Extra information.
                            </span>
                          </p>
                        </div>
                        <div className="data-value">
                          <p>{weather.alerts.alert[dayNum].note}</p>
                        </div>
                      </div>
                      <div className="data">
                        <div className="data-title">
                          <p className="tooltip">
                            Effective
                            <span className="tooltip-text">Start time.</span>
                          </p>
                        </div>
                        <div className="data-value">
                          <p>{weather.alerts.alert[dayNum].effective}</p>
                        </div>
                      </div>
                      <div className="data">
                        <div className="data-title">
                          <p className="tooltip">
                            Expires
                            <span className="tooltip-text">End time.</span>
                          </p>
                        </div>
                        <div className="data-value">
                          <p>{weather.alerts.alert[dayNum].expires}</p>
                        </div>
                      </div>
                      <div className="data">
                        <div className="data-title">
                          <p className="tooltip">
                            Description
                            <span className="tooltip-text">Detailed info.</span>
                          </p>
                        </div>
                        <div className="data-value">
                          <p>{weather.alerts.alert[dayNum].desc}</p>
                        </div>
                      </div>
                      <div className="data">
                        <div className="data-title">
                          <p className="tooltip">
                            Instruction
                            <span className="tooltip-text">Safety advice.</span>
                          </p>
                        </div>
                        <div className="data-value">
                          <p>{weather.alerts.alert[dayNum].instruction}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div id="no-data-contents">
                      <p>No alert</p>
                    </div>
                  )}
                </div>{" "}
                {/*Alert*/}
              </div>
            </div>{" "}
            {/*Alert*/}
            {(() => {
              const todayDataHours = weather.forecast.forecastday[
                dayNum
              ].hour.map((h) => ({
                Time: h.time.split(" ")[1],
                //
                Temperature: h.temp_c,
                temp_f: h.temp_f,
                FeelsLike: h.feelslike_c,
                feelslike_f: h.feelslike_f,
                WindChill: h.windchill_c,
                windchill_f: h.windchill_f,
                HeatIndex: h.heatindex_c,
                heatindex_f: h.heatindex_f,
                DewPoint: h.dewpoint_c,
                dewpoint_f: h.dewpoint_f,
                //
                WindSpeed: h.wind_kph,
                wind_mph: h.wind_mph,
                WindDegree: h.wind_degree,
                wind_dir: h.wind_dir,
                Gust: h.gust_kph,
                gust_mph: h.gust_mph,
                //
                Humidity: h.humidity,
                Cloud: h.cloud,
                Pressure: h.pressure_mb,
                pressure_in: h.pressure_in,
                Precipitation: h.precip_mm,
                precip_in: h.precip_in,
                Visibility: h.vis_km,
                vis_miles: h.vis_miles,
                UV: h.uv,
              }));
              return (
                <div id="hour-data">
                  <div id="hour-title">
                    <h2>Weather Data Visualization</h2>
                  </div>
                  <div id="real-time-hour-data">
                    <LineGraph data={todayDataHours} />
                  </div>
                </div>
              );
            })()}{" "}
            {/*Today's Hour Data*/}
          </div>
        )}
        {weather && tomorrow && (
          <div className="data-container">
            <div id="tomorrow-time">
              <div id="tomorrow-title">
                <h2>
                  Weather Overview
                  <br />
                  {weather.forecast.forecastday[dayNum].date}
                </h2>
              </div>
              <div className="forecast-data">
                <div className="group-data">
                  <div className="group-title">
                    <h3>Temperature</h3>
                  </div>
                  <div className="data-contents">
                    <div className="data">
                      <div className="data-title">
                        <p>Max Temperature</p>
                      </div>
                      <div className="data-value">
                        <div className="two-values">
                          <p>
                            {weather.forecast.forecastday[dayNum].day.maxtemp_c}{" "}
                            °C
                          </p>
                        </div>
                        <div className="two-values">
                          <p>
                            {weather.forecast.forecastday[dayNum].day.maxtemp_c}{" "}
                            °F
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p>Min Temperature</p>
                      </div>
                      <div className="data-value">
                        <div className="two-values">
                          <p>
                            {weather.forecast.forecastday[dayNum].day.mintemp_c}{" "}
                            °C
                          </p>
                        </div>
                        <div className="two-values">
                          <p>
                            {weather.forecast.forecastday[dayNum].day.mintemp_c}{" "}
                            °F
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p>Average Temperature</p>
                      </div>
                      <div className="data-value">
                        <div className="two-values">
                          <p>
                            {weather.forecast.forecastday[dayNum].day.avgtemp_c}{" "}
                            °C
                          </p>
                        </div>
                        <div className="two-values">
                          <p>
                            {weather.forecast.forecastday[dayNum].day.avgtemp_c}{" "}
                            °F
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                {/*Temperature*/}
                <div className="group-data">
                  <div className="group-title">
                    <h3>Wind</h3>
                  </div>
                  <div className="data-contents">
                    <div className="data">
                      <div className="data-title">
                        <p>Max Speed</p>
                      </div>
                      <div className="data-value">
                        <div className="two-values">
                          <p>
                            {
                              weather.forecast.forecastday[dayNum].day
                                .maxwind_mph
                            }{" "}
                            mph
                          </p>
                        </div>
                        <div className="two-values">
                          <p>
                            {
                              weather.forecast.forecastday[dayNum].day
                                .maxwind_kph
                            }{" "}
                            kph
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                {/*Wind*/}
                <div className="group-data">
                  <div className="group-title">
                    <h3>Condition</h3>
                  </div>
                  <div className="data-contents">
                    <div className="data">
                      <div className="data-title">
                        <p>Sky Status</p>
                      </div>
                      <div className="data-value">
                        <p>
                          <img
                            src={
                              weather.forecast.forecastday[dayNum].day.condition
                                .icon
                            }
                          />{" "}
                          {
                            weather.forecast.forecastday[dayNum].day.condition
                              .text
                          }
                        </p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p>Code</p>
                      </div>
                      <div className="data-value">
                        <p>
                          {
                            weather.forecast.forecastday[dayNum].day.condition
                              .code
                          }
                        </p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p>Rain Expected?</p>
                      </div>
                      <div className="data-value">
                        <p>
                          {weather.forecast.forecastday[dayNum].day
                            .daily_will_it_rain === 1
                            ? "Yes"
                            : "No"}
                        </p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p>Snow Expected?</p>
                      </div>
                      <div className="data-value">
                        <p>
                          {weather.forecast.forecastday[dayNum].day
                            .daily_will_it_snow === 1
                            ? "Yes"
                            : "No"}
                        </p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p>Rain Chance</p>
                      </div>
                      <div className="data-value">
                        <p>
                          {
                            weather.forecast.forecastday[dayNum].day
                              .daily_chance_of_rain
                          }{" "}
                          %
                        </p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p>Snow Chance</p>
                      </div>
                      <div className="data-value">
                        <p>
                          {
                            weather.forecast.forecastday[dayNum].day
                              .daily_chance_of_snow
                          }{" "}
                          %
                        </p>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                {/*Condition*/}
                <div className="group-data">
                  <div className="group-title">
                    <h3>Atmosphere</h3>
                  </div>
                  <div className="data-contents">
                    <div className="data">
                      <div className="data-title">
                        <p>Average Humidity</p>
                      </div>
                      <div className="data-value">
                        <p>
                          {weather.forecast.forecastday[dayNum].day.avghumidity}{" "}
                          %
                        </p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p>Average Visibility</p>
                      </div>
                      <div className="data-value">
                        <div className="two-values">
                          <p>
                            {weather.forecast.forecastday[dayNum].day.avgvis_km}{" "}
                            km
                          </p>
                        </div>
                        <div className="two-values">
                          <p>
                            {
                              weather.forecast.forecastday[dayNum].day
                                .avgvis_miles
                            }{" "}
                            miles
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p>Total Precipitation</p>
                      </div>
                      <div className="data-value">
                        <div className="two-values">
                          <p>
                            {
                              weather.forecast.forecastday[dayNum].day
                                .totalprecip_mm
                            }{" "}
                            mm
                          </p>
                        </div>
                        <div className="two-values">
                          <p>
                            {
                              weather.forecast.forecastday[dayNum].day
                                .totalprecip_in
                            }{" "}
                            in
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p>UV index</p>
                      </div>
                      <div className="data-value">
                        <p>
                          {weather.forecast.forecastday[dayNum].day.uv}{" "}
                          {weather.forecast.forecastday[dayNum].day.uv <= 2
                            ? "(Low)"
                            : weather.forecast.forecastday[dayNum].day.uv <= 5
                            ? "(Moderate)"
                            : weather.forecast.forecastday[dayNum].day.uv <= 7
                            ? "(High)"
                            : weather.forecast.forecastday[dayNum].day.uv <= 10
                            ? "(Very High)"
                            : "(Extreme)"}
                        </p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p>Total Snow</p>
                      </div>
                      <div className="data-value">
                        <p>
                          {
                            weather.forecast.forecastday[dayNum].day
                              .totalsnow_cm
                          }{" "}
                          cm
                        </p>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                {/*Atmosphere*/}
                <div className="group-data">
                  <div className="group-title">
                    <h3>Astronomy</h3>
                  </div>
                  <div className="data-contents">
                    <div className="data">
                      <div className="data-title">
                        <p>Sunrise</p>
                      </div>
                      <div className="data-value">
                        <p>
                          {weather.forecast.forecastday[dayNum].astro.sunrise}
                        </p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p>Sunset</p>
                      </div>
                      <div className="data-value">
                        <p>
                          {weather.forecast.forecastday[dayNum].astro.sunset}
                        </p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p>Moonrise</p>
                      </div>
                      <div className="data-value">
                        <p>
                          {weather.forecast.forecastday[dayNum].astro.moonrise}
                        </p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p>Moonset</p>
                      </div>
                      <div className="data-value">
                        <p>
                          {weather.forecast.forecastday[dayNum].astro.moonset}
                        </p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p>Moon Phase</p>
                      </div>
                      <div className="data-value">
                        <p>
                          {
                            weather.forecast.forecastday[dayNum].astro
                              .moon_phase
                          }
                        </p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p>Moon Illumination</p>
                      </div>
                      <div className="data-value">
                        <p>
                          {
                            weather.forecast.forecastday[dayNum].astro
                              .moon_illumination
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="tomorrow-hour-time">
              <div id="tomorrow-hour-title">
                <h2>
                  Weather Data Visualization
                  <br />
                  {weather.forecast.forecastday[dayNum].date}
                </h2>
              </div>
              <div className="forecast-data">
                {(() => {
                  const dataHours = weather.forecast.forecastday[
                    dayNum
                  ].hour.map((h) => ({
                    Time: h.time.split(" ")[1],
                    //
                    Temperature: h.temp_c,
                    temp_f: h.temp_f,
                    FeelsLike: h.feelslike_c,
                    feelslike_f: h.feelslike_f,
                    WindChill: h.windchill_c,
                    windchill_f: h.windchill_f,
                    HeatIndex: h.heatindex_c,
                    heatindex_f: h.heatindex_f,
                    DewPoint: h.dewpoint_c,
                    dewpoint_f: h.dewpoint_f,
                    //
                    WindSpeed: h.wind_kph,
                    wind_mph: h.wind_mph,
                    WindDegree: h.wind_degree,
                    wind_dir: h.wind_dir,
                    Gust: h.gust_kph,
                    gust_mph: h.gust_mph,
                    //
                    Humidity: h.humidity,
                    Cloud: h.cloud,
                    Pressure: h.pressure_mb,
                    pressure_in: h.pressure_in,
                    Precipitation: h.precip_mm,
                    precip_in: h.precip_in,
                    Visibility: h.vis_km,
                    vis_miles: h.vis_miles,
                    UV: h.uv,
                  }));
                  return (
                    <div>
                      <LineGraph data={dataHours} />
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        )}
        {weather && dayAfter && (
          <div className="data-container">
            <div id="tomorrow-time">
              <div id="tomorrow-title">
                <h2>
                  Weather Overview
                  <br />
                  {weather.forecast.forecastday[dayNum].date}
                </h2>
              </div>
              <div className="forecast-data">
                <div className="group-data">
                  <div className="group-title">
                    <h3>Temperature</h3>
                  </div>
                  <div className="data-contents">
                    <div className="data">
                      <div className="data-title">
                        <p>Max Temperature</p>
                      </div>
                      <div className="data-value">
                        <div className="two-values">
                          <p>
                            {weather.forecast.forecastday[dayNum].day.maxtemp_c}{" "}
                            °C
                          </p>
                        </div>
                        <div className="two-values">
                          <p>
                            {weather.forecast.forecastday[dayNum].day.maxtemp_c}{" "}
                            °F
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p>Min Temperature</p>
                      </div>
                      <div className="data-value">
                        <div className="two-values">
                          <p>
                            {weather.forecast.forecastday[dayNum].day.mintemp_c}{" "}
                            °C
                          </p>
                        </div>
                        <div className="two-values">
                          <p>
                            {weather.forecast.forecastday[dayNum].day.mintemp_c}{" "}
                            °F
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p>Average Temperature</p>
                      </div>
                      <div className="data-value">
                        <div className="two-values">
                          <p>
                            {weather.forecast.forecastday[dayNum].day.avgtemp_c}{" "}
                            °C
                          </p>
                        </div>
                        <div className="two-values">
                          <p>
                            {weather.forecast.forecastday[dayNum].day.avgtemp_c}{" "}
                            °F
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                {/*Temperature*/}
                <div className="group-data">
                  <div className="group-title">
                    <h3>Wind</h3>
                  </div>
                  <div className="data-contents">
                    <div className="data">
                      <div className="data-title">
                        <p>Max Speed</p>
                      </div>
                      <div className="data-value">
                        <div className="two-values">
                          <p>
                            {
                              weather.forecast.forecastday[dayNum].day
                                .maxwind_mph
                            }{" "}
                            mph
                          </p>
                        </div>
                        <div className="two-values">
                          <p>
                            {
                              weather.forecast.forecastday[dayNum].day
                                .maxwind_kph
                            }{" "}
                            kph
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                {/*Wind*/}
                <div className="group-data">
                  <div className="group-title">
                    <h3>Condition</h3>
                  </div>
                  <div className="data-contents">
                    <div className="data">
                      <div className="data-title">
                        <p>Sky Status</p>
                      </div>
                      <div className="data-value">
                        <p>
                          <img
                            src={
                              weather.forecast.forecastday[dayNum].day.condition
                                .icon
                            }
                          />{" "}
                          {
                            weather.forecast.forecastday[dayNum].day.condition
                              .text
                          }
                        </p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p>Code</p>
                      </div>
                      <div className="data-value">
                        <p>
                          {
                            weather.forecast.forecastday[dayNum].day.condition
                              .code
                          }
                        </p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p>Rain Expected?</p>
                      </div>
                      <div className="data-value">
                        <p>
                          {weather.forecast.forecastday[dayNum].day
                            .daily_will_it_rain === 1
                            ? "Yes"
                            : "No"}
                        </p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p>Snow Expected?</p>
                      </div>
                      <div className="data-value">
                        <p>
                          {weather.forecast.forecastday[dayNum].day
                            .daily_will_it_snow === 1
                            ? "Yes"
                            : "No"}
                        </p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p>Rain Chance</p>
                      </div>
                      <div className="data-value">
                        <p>
                          {
                            weather.forecast.forecastday[dayNum].day
                              .daily_chance_of_rain
                          }{" "}
                          %
                        </p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p>Snow Chance</p>
                      </div>
                      <div className="data-value">
                        <p>
                          {
                            weather.forecast.forecastday[dayNum].day
                              .daily_chance_of_snow
                          }{" "}
                          %
                        </p>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                {/*Condition*/}
                <div className="group-data">
                  <div className="group-title">
                    <h3>Atmosphere</h3>
                  </div>
                  <div className="data-contents">
                    <div className="data">
                      <div className="data-title">
                        <p>Average Humidity</p>
                      </div>
                      <div className="data-value">
                        <p>
                          {weather.forecast.forecastday[dayNum].day.avghumidity}{" "}
                          %
                        </p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p>Average Visibility</p>
                      </div>
                      <div className="data-value">
                        <div className="two-values">
                          <p>
                            {weather.forecast.forecastday[dayNum].day.avgvis_km}{" "}
                            km
                          </p>
                        </div>
                        <div className="two-values">
                          <p>
                            {
                              weather.forecast.forecastday[dayNum].day
                                .avgvis_miles
                            }{" "}
                            miles
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p>Total Precipitation</p>
                      </div>
                      <div className="data-value">
                        <div className="two-values">
                          <p>
                            {
                              weather.forecast.forecastday[dayNum].day
                                .totalprecip_mm
                            }{" "}
                            mm
                          </p>
                        </div>
                        <div className="two-values">
                          <p>
                            {
                              weather.forecast.forecastday[dayNum].day
                                .totalprecip_in
                            }{" "}
                            in
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p>UV index</p>
                      </div>
                      <div className="data-value">
                        <p>
                          {weather.forecast.forecastday[dayNum].day.uv}{" "}
                          {weather.forecast.forecastday[dayNum].day.uv <= 2
                            ? "(Low)"
                            : weather.forecast.forecastday[dayNum].day.uv <= 5
                            ? "(Moderate)"
                            : weather.forecast.forecastday[dayNum].day.uv <= 7
                            ? "(High)"
                            : weather.forecast.forecastday[dayNum].day.uv <= 10
                            ? "(Very High)"
                            : "(Extreme)"}
                        </p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p>Total Snow</p>
                      </div>
                      <div className="data-value">
                        <p>
                          {
                            weather.forecast.forecastday[dayNum].day
                              .totalsnow_cm
                          }{" "}
                          cm
                        </p>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                {/*Atmosphere*/}
                <div className="group-data">
                  <div className="group-title">
                    <h3>Astronomy</h3>
                  </div>
                  <div className="data-contents">
                    <div className="data">
                      <div className="data-title">
                        <p>Sunrise</p>
                      </div>
                      <div className="data-value">
                        <p>
                          {weather.forecast.forecastday[dayNum].astro.sunrise}
                        </p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p>Sunset</p>
                      </div>
                      <div className="data-value">
                        <p>
                          {weather.forecast.forecastday[dayNum].astro.sunset}
                        </p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p>Moonrise</p>
                      </div>
                      <div className="data-value">
                        <p>
                          {weather.forecast.forecastday[dayNum].astro.moonrise}
                        </p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p>Moonset</p>
                      </div>
                      <div className="data-value">
                        <p>
                          {weather.forecast.forecastday[dayNum].astro.moonset}
                        </p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p>Moon Phase</p>
                      </div>
                      <div className="data-value">
                        <p>
                          {
                            weather.forecast.forecastday[dayNum].astro
                              .moon_phase
                          }
                        </p>
                      </div>
                    </div>
                    <div className="data">
                      <div className="data-title">
                        <p>Moon Illumination</p>
                      </div>
                      <div className="data-value">
                        <p>
                          {
                            weather.forecast.forecastday[dayNum].astro
                              .moon_illumination
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="tomorrow-hour-time">
              <div id="tomorrow-hour-title">
                <h2>
                  Weather Data Visualization
                  <br />
                  {weather.forecast.forecastday[dayNum].date}
                </h2>
              </div>
              <div className="forecast-data">
                {(() => {
                  const dataHours = weather.forecast.forecastday[
                    dayNum
                  ].hour.map((h) => ({
                    Time: h.time.split(" ")[1],
                    //
                    Temperature: h.temp_c,
                    temp_f: h.temp_f,
                    FeelsLike: h.feelslike_c,
                    feelslike_f: h.feelslike_f,
                    WindChill: h.windchill_c,
                    windchill_f: h.windchill_f,
                    HeatIndex: h.heatindex_c,
                    heatindex_f: h.heatindex_f,
                    DewPoint: h.dewpoint_c,
                    dewpoint_f: h.dewpoint_f,
                    //
                    WindSpeed: h.wind_kph,
                    wind_mph: h.wind_mph,
                    WindDegree: h.wind_degree,
                    wind_dir: h.wind_dir,
                    Gust: h.gust_kph,
                    gust_mph: h.gust_mph,
                    //
                    Humidity: h.humidity,
                    Cloud: h.cloud,
                    Pressure: h.pressure_mb,
                    pressure_in: h.pressure_in,
                    Precipitation: h.precip_mm,
                    precip_in: h.precip_in,
                    Visibility: h.vis_km,
                    vis_miles: h.vis_miles,
                    UV: h.uv,
                  }));
                  return (
                    <div>
                      <LineGraph data={dataHours} />
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        )}
        {weather === null && (
          <div style={{ position: "relative", height: "100vh", width: "100%" }}>
            <MapContainer
              center={[51.505, -0.09]}
              zoom={12}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
                subdomains={["a", "b", "c", "d"]}
              />
            </MapContainer>
            <button id="up-button" onClick={GoUp}>
              Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
