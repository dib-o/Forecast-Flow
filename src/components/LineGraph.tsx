import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type DataPoint = {
  Time: string;
  //
  Temperature: number;
  temp_f: number;
  FeelsLike: number;
  feelslike_f: number;
  WindChill: number;
  windchill_f: number;
  HeatIndex: number;
  heatindex_f: number;
  DewPoint: number;
  dewpoint_f: number;
  //
  WindSpeed: number;
  wind_mph: number;
  WindDegree: number;
  wind_dir: string;
  Gust: number;
  gust_mph: number;
  //
  Humidity: number;
  Cloud: number;
  Pressure: number;
  pressure_in: number;
  Precipitation: number;
  precip_in: number;
  Visibility: number;
  vis_miles: number;
  UV: number;
};

type LineGraphProps = {
  data: DataPoint[];
};
const lineColors: Record<string, string> = {
  Temperature: "#fad0c4", // soft pink
  WindChill: "#ffd1ff", // light lavender
  FeelsLike: "#fbc2eb", // pink-purple
  Humidity: "#d57eeb", // purple
  Pressure: "#f5576c", // red
  HeatIndex: "#fcb69f", // orange-peach
  WindDegree: "#fda085", // orange
  UV: "#fee140", // yellow
  DewPoint: "#ee9ca7", // rose
  Cloud: "#8ec5fc", // light blue
  WindSpeed: "#66a6ff", // strong blue
  Precipitation: "#00f2fe", // cyan
  Visibility: "#38f9d7", // teal
  Gust: "#8fd3f4", // aqua
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          height: "auto",
          background: "black",
          padding: "1rem",
          borderRadius: ".5rem",
        }}
      >
        <p style={{ textAlign: "center", color: "white", margin: ".5rem" }}>{`Time: ${label}`}</p>
        {payload.map((entry: any) => {
          if (entry.name === "Temperature") {
            return (
              <>
                <div className="graph-data">
                  <div className="graph-data-title">
                    <p style={{ color: lineColors[entry.name] }}>Temperature</p>
                  </div>
                  <div className="graph-data-value">
                    <div>
                      <p style={{ color: lineColors[entry.name] }}>
                        {entry.value} °C
                      </p>
                    </div>
                    <div>
                      <p style={{ color: lineColors[entry.name] }}>
                        {entry.payload.temp_f} °F
                      </p>
                    </div>
                  </div>
                </div>
              </>
            );
          } else if (entry.name === "WindChill") {
            return (
              <>
                <div className="graph-data">
                  <div className="graph-data-title">
                    <p style={{ color: lineColors[entry.name] }}>Wind Chill</p>
                  </div>
                  <div className="graph-data-value">
                    <div>
                      <p style={{ color: lineColors[entry.name] }}>
                        {entry.value} °C
                      </p>
                    </div>
                    <div>
                      <p style={{ color: lineColors[entry.name] }}>
                        {entry.payload.windchill_f} °F
                      </p>
                    </div>
                  </div>
                </div>
              </>
            );
          } else if (entry.name === "HeatIndex") {
            return (
              <>
                <div className="graph-data">
                  <div className="graph-data-title">
                    <p style={{ color: lineColors[entry.name] }}>Heat Index</p>
                  </div>
                  <div className="graph-data-value">
                    <div>
                      <p style={{ color: lineColors[entry.name] }}>
                        {entry.value} °C
                      </p>
                    </div>
                    <div>
                      <p style={{ color: lineColors[entry.name] }}>
                        {entry.payload.heatindex_f} °F
                      </p>
                    </div>
                  </div>
                </div>
              </>
            );
          } else if (entry.name === "FeelsLike") {
            return (
              <>
                <div className="graph-data">
                  <div className="graph-data-title">
                    <p style={{ color: lineColors[entry.name] }}>Feels Like</p>
                  </div>
                  <div className="graph-data-value">
                    <div>
                      <p style={{ color: lineColors[entry.name] }}>
                        {entry.value} °C
                      </p>
                    </div>
                    <div>
                      <p style={{ color: lineColors[entry.name] }}>
                        {entry.payload.feelslike_f} °F
                      </p>
                    </div>
                  </div>
                </div>
              </>
            );
          } else if (entry.name === "DewPoint") {
            return (
              <>
                <div className="graph-data">
                  <div className="graph-data-title">
                    <p style={{ color: lineColors[entry.name] }}>Dew Point</p>
                  </div>
                  <div className="graph-data-value">
                    <div>
                      <p style={{ color: lineColors[entry.name] }}>
                        {entry.value} °C
                      </p>
                    </div>
                    <div>
                      <p style={{ color: lineColors[entry.name] }}>
                        {entry.payload.dewpoint_f} °F
                      </p>
                    </div>
                  </div>
                </div>
              </>
            );
          } else if (entry.name === "WindSpeed") {
            return (
              <>
                <div className="graph-data">
                  <div className="graph-data-title">
                    <p style={{ color: lineColors[entry.name] }}>Wind Speed</p>
                  </div>
                  <div className="graph-data-value">
                    <div>
                      <p style={{ color: lineColors[entry.name] }}>
                        {entry.value} kph
                      </p>
                    </div>
                    <div>
                      <p style={{ color: lineColors[entry.name] }}>
                        {entry.payload.wind_mph} mph
                      </p>
                    </div>
                  </div>
                </div>
              </>
            );
          } else if (entry.name === "WindDegree") {
            return (
              <>
                <div className="graph-data">
                  <div className="graph-data-title">
                    <p style={{ color: lineColors[entry.name] }}>Wind Degree</p>
                  </div>
                  <div className="graph-data-value">
                    <div>
                      <p style={{ color: lineColors[entry.name] }}>
                        {entry.value} °
                      </p>
                    </div>
                    <div>
                      <p style={{ color: lineColors[entry.name] }}>
                        {entry.payload.wind_dir}{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            );
          } else if (entry.name === "Gust") {
            return (
              <>
                <div className="graph-data">
                  <div className="graph-data-title">
                    <p style={{ color: lineColors[entry.name] }}>Gust</p>
                  </div>
                  <div className="graph-data-value">
                    <div>
                      <p style={{ color: lineColors[entry.name] }}>
                        {entry.value} kph
                      </p>
                    </div>
                    <div>
                      <p style={{ color: lineColors[entry.name] }}>
                        {entry.payload.gust_mph} mph
                      </p>
                    </div>
                  </div>
                </div>
              </>
            );
          } else if (entry.name === "Humidity") {
            return (
              <>
                <div className="graph-data">
                  <div className="graph-data-title">
                    <p style={{ color: lineColors[entry.name] }}>Humidity</p>
                  </div>
                  <div className="graph-data-value">
                    <div>
                      <p style={{ color: lineColors[entry.name] }}>
                        {entry.value} %
                      </p>
                    </div>
                  </div>
                </div>
              </>
            );
          } else if (entry.name === "Cloud") {
            return (
              <>
                <div className="graph-data">
                  <div className="graph-data-title">
                    <p style={{ color: lineColors[entry.name] }}>Cloud</p>
                  </div>
                  <div className="graph-data-value">
                    <div>
                      <p style={{ color: lineColors[entry.name] }}>
                        {entry.value} %
                      </p>
                    </div>
                  </div>
                </div>
              </>
            );
          } else if (entry.name === "Pressure") {
            return (
              <>
                <div className="graph-data">
                  <div className="graph-data-title">
                    <p style={{ color: lineColors[entry.name] }}>Pressure</p>
                  </div>
                  <div className="graph-data-value">
                    <div>
                      <p style={{ color: lineColors[entry.name] }}>
                        {entry.value}mb
                      </p>
                    </div>
                    <div>
                      <p style={{ color: lineColors[entry.name] }}>
                        {entry.payload.pressure_in} in
                      </p>
                    </div>
                  </div>
                </div>
              </>
            );
          } else if (entry.name === "Precipitation") {
            return (
              <>
                <div className="graph-data">
                  <div className="graph-data-title">
                    <p style={{ color: lineColors[entry.name] }}>
                      Precipitation
                    </p>
                  </div>
                  <div className="graph-data-value">
                    <div>
                      <p style={{ color: lineColors[entry.name] }}>
                        {entry.value} mm
                      </p>
                    </div>
                    <div>
                      <p style={{ color: lineColors[entry.name] }}>
                        {entry.payload.precip_in} in
                      </p>
                    </div>
                  </div>
                </div>
              </>
            );
          } else if (entry.name === "Visibility") {
            return (
              <>
                <div className="graph-data">
                  <div className="graph-data-title">
                    <p style={{ color: lineColors[entry.name] }}>Visibility</p>
                  </div>
                  <div className="graph-data-value">
                    <div>
                      <p style={{ color: lineColors[entry.name] }}>
                        {entry.value} km
                      </p>
                    </div>
                    <div>
                      <p style={{ color: lineColors[entry.name] }}>
                        {entry.payload.vis_miles} miles
                      </p>
                    </div>
                  </div>
                </div>
              </>
            );
          } else if (entry.name === "UV") {
            return (
              <>
                <div className="graph-data">
                  <div className="graph-data-title">
                    <p style={{ color: lineColors[entry.name] }}>UV Index</p>
                  </div>
                  <div className="graph-data-value">
                    <div>
                      <p style={{ color: lineColors[entry.name] }}>
                        {entry.value}{" "}
                        {entry.value <= 2
                          ? "(Low)"
                          : entry.value <= 5
                          ? "(Moderate)"
                          : entry.value <= 7
                          ? "(High)"
                          : entry.value <= 10
                          ? "(Very High)"
                          : "(Extreme)"}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            );
          }
        })}
      </div>
    );
  }
  return null;
};

const LineGraph = ({ data }: LineGraphProps) => {
  const [showTemperature, setShowTemperature] = useState(true);
  const [showFeelsLike, setShowFeelsLike] = useState(true);
  const [showWindChill, setShowWindChill] = useState(true);
  const [showHeatIndex, setShowHeatIndex] = useState(true);
  const [showDewPoint, setShowDewPoint] = useState(true);
  const [showWindSpeed, setShowWindSpeed] = useState(true);
  const [showWindDegree, setShowWindDegree] = useState(true);
  const [showGust, setShowGust] = useState(true);
  const [showHumidity, setShowHumidity] = useState(true);
  const [showCloud, setShowCloud] = useState(true);
  const [showPressure, setShowPressure] = useState(true);
  const [showPrecipitation, setShowPrecipitation] = useState(true);
  const [showVisibility, setShowVisibility] = useState(true);
  const [showUV, setShowUV] = useState(true);
  const [showAll, setShowAll] = useState(true);

  const AllStatus = () => {
    setShowAll((prev) => {
      const newValue = !prev;
      if (newValue) {
        setShowTemperature(true);
        setShowFeelsLike(true);
        setShowWindChill(true);
        setShowHeatIndex(true);
        setShowDewPoint(true);
        setShowWindSpeed(true);
        setShowWindDegree(true);
        setShowGust(true);
        setShowHumidity(true);
        setShowCloud(true);
        setShowPressure(true);
        setShowPrecipitation(true);
        setShowVisibility(true);
        setShowUV(true);
      } else {
        setShowTemperature(false);
        setShowFeelsLike(false);
        setShowWindChill(false);
        setShowHeatIndex(false);
        setShowDewPoint(false);
        setShowWindSpeed(false);
        setShowWindDegree(false);
        setShowGust(false);
        setShowHumidity(false);
        setShowCloud(false);
        setShowPressure(false);
        setShowPrecipitation(false);
        setShowVisibility(false);
        setShowUV(false);
      }
      return newValue;
    });
  };
  return (
    <>
      <div id="graph-container">
        <ResponsiveContainer id="line-graph">
          <LineChart id="line-data" data={data}>
            <defs>
              <linearGradient
                id="temperatureGradient"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor="#000000" />
                <stop offset="100%" stopColor="#fad0c4" />
              </linearGradient>
              <linearGradient
                id="feelslikeGradient"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor="#000000" />
                <stop offset="100%" stopColor="#fbc2eb" />
              </linearGradient>
              <linearGradient
                id="windchillGradient"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor="#000000" />
                <stop offset="100%" stopColor="#ffd1ff" />
              </linearGradient>
              <linearGradient
                id="heatindexGradient"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor="#000000" />
                <stop offset="100%" stopColor="#fcb69f" />
              </linearGradient>
              <linearGradient id="dewpointGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#000000" />
                <stop offset="100%" stopColor="#ee9ca7" />
              </linearGradient>
              <linearGradient
                id="windspeedGradient"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor="#000000" />
                <stop offset="100%" stopColor="#66a6ff" />
              </linearGradient>
              <linearGradient
                id="winddegreeGradient"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor="#000000" />
                <stop offset="100%" stopColor="#fda085" />
              </linearGradient>
              <linearGradient id="gustGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#000000" />
                <stop offset="100%" stopColor="#8fd3f4" />
              </linearGradient>
              <linearGradient id="humidityGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#000000" />
                <stop offset="100%" stopColor="#d57eeb" />
              </linearGradient>
              <linearGradient id="cloudGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#000000" />
                <stop offset="100%" stopColor="#8ec5fc" />
              </linearGradient>
              <linearGradient id="pressureGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#000000" />
                <stop offset="100%" stopColor="#f5576c" />
              </linearGradient>
              <linearGradient
                id="precipitationGradient"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor="#000000" />
                <stop offset="100%" stopColor="#00f2fe" />
              </linearGradient>
              <linearGradient
                id="visibilityGradient"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor="#000000" />
                <stop offset="100%" stopColor="#38f9d7" />
              </linearGradient>
              <linearGradient id="uvGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#000000" />
                <stop offset="100%" stopColor="#fee140" />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="solid" />
            <XAxis dataKey="Time" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              layout="horizontal" // horizontal (default) | vertical
              align="center" // left | center | right
              verticalAlign="bottom" // top | middle | bottom
            />
            {showTemperature && (
              <Line
                type="monotone"
                dataKey="Temperature"
                stroke="url(#temperatureGradient)"
                strokeWidth={2}
                dot={{ r: 5 }}
              />
            )}
            {showWindChill && (
              <Line
                type="monotone"
                dataKey="WindChill"
                stroke="url(#windchillGradient)"
                strokeWidth={2}
                dot={{ r: 5 }}
              />
            )}
            {showFeelsLike && (
              <Line
                type="monotone"
                dataKey="FeelsLike"
                stroke="url(#feelslikeGradient)"
                strokeWidth={2}
                dot={{ r: 5 }}
              />
            )}
            {showHumidity && (
              <Line
                type="monotone"
                dataKey="Humidity"
                stroke="url(#humidityGradient)"
                strokeWidth={2}
                dot={{ r: 5 }}
              />
            )}
            {showPressure && (
              <Line
                type="monotone"
                dataKey="Pressure"
                stroke="url(#pressureGradient)"
                strokeWidth={2}
                dot={{ r: 5 }}
              />
            )}
            {showHeatIndex && (
              <Line
                type="monotone"
                dataKey="HeatIndex"
                stroke="url(#heatindexGradient)"
                strokeWidth={2}
                dot={{ r: 5 }}
              />
            )}
            {showWindDegree && (
              <Line
                type="monotone"
                dataKey="WindDegree"
                stroke="url(#winddegreeGradient)"
                strokeWidth={2}
                dot={{ r: 5 }}
              />
            )}
            {showUV && (
              <Line
                type="monotone"
                dataKey="UV"
                stroke="url(#uvGradient)"
                strokeWidth={2}
                dot={{ r: 5 }}
              />
            )}
            {showDewPoint && (
              <Line
                type="monotone"
                dataKey="DewPoint"
                stroke="url(#dewpointGradient)"
                strokeWidth={2}
                dot={{ r: 5 }}
              />
            )}
            {showCloud && (
              <Line
                type="monotone"
                dataKey="Cloud"
                stroke="url(#cloudGradient)"
                strokeWidth={2}
                dot={{ r: 5 }}
              />
            )}
            {showWindSpeed && (
              <Line
                type="monotone"
                dataKey="WindSpeed"
                stroke="url(#windspeedGradient)"
                strokeWidth={2}
                dot={{ r: 5 }}
              />
            )}
            {showPrecipitation && (
              <Line
                type="monotone"
                dataKey="Precipitation"
                stroke="url(#precipitationGradient)"
                strokeWidth={2}
                dot={{ r: 5 }}
              />
            )}
            {showVisibility && (
              <Line
                type="monotone"
                dataKey="Visibility"
                stroke="url(#visibilityGradient)"
                strokeWidth={2}
                dot={{ r: 5 }}
              />
            )}
            {showGust && (
              <Line
                type="monotone"
                dataKey="Gust"
                stroke="url(#gustGradient)"
                strokeWidth={2}
                dot={{ r: 5 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div id="button-container">
        <button onClick={AllStatus} className={showAll ? "active" : ""}>
          {showAll ? <>Unselect<br/> All</> : <>Select<br/> All</>}
        </button>
        <button
          onClick={() => setShowTemperature(!showTemperature)}
          className={showTemperature ? "active" : ""}
        >
          {showTemperature ? <>Hide<br/> Temperature</> : <>Show<br/> Temperature</>}
        </button>
        <button
          onClick={() => setShowWindChill(!showWindChill)}
          className={showWindChill ? "active" : ""}
        >
          {showWindChill ? <>Hide<br/> Wind Chill</> : <>Show<br/> Wind Chill</>}
        </button>
        <button
          onClick={() => setShowFeelsLike(!showFeelsLike)}
          className={showFeelsLike ? "active" : ""}
        >
          {showFeelsLike ? <>Hide<br/> Feels Like</> : <>Show<br/> Feels Like</>}
        </button>
        <button
          onClick={() => setShowHumidity(!showHumidity)}
          className={showHumidity ? "active" : ""}
        >
          {showHumidity ? <>Hide<br/> Humidity</> : <>Show<br/> Humidity</>}
        </button>
        <button
          onClick={() => setShowPressure(!showPressure)}
          className={showPressure ? "active" : ""}
        >
          {showPressure ? <>Hide<br/> Pressure</> : <>Show<br/> Pressure</>}
        </button>
        <button
          onClick={() => setShowHeatIndex(!showHeatIndex)}
          className={showHeatIndex ? "active" : ""}
        >
          {showHeatIndex ? <>Hide<br/> Heat Index</> : <>Show<br/> Heat Index</>}
        </button>
        <button
          onClick={() => setShowWindDegree(!showWindDegree)}
          className={showWindDegree ? "active" : ""}
        >
          {showWindDegree ? <>Hide<br/> Wind Degree</> : <>Show<br/> Wind Degree</>}
        </button>
        <button
          onClick={() => setShowUV(!showUV)}
          className={showUV ? "active" : ""}
        >
          {showUV ? <>Hide<br/> UV</> : <>Show<br/> UV</>}
        </button>
        <button
          onClick={() => setShowDewPoint(!showDewPoint)}
          className={showDewPoint ? "active" : ""}
        >
          {showDewPoint ? <>Hide<br/> Dew Point</> : <>Show<br/> Dew Point</>}
        </button>
        <button
          onClick={() => setShowCloud(!showCloud)}
          className={showCloud ? "active" : ""}
        >
          {showCloud ? <>Hide<br/> Cloud</> : <>Show<br/> Cloud</>}
        </button>
        <button
          onClick={() => setShowWindSpeed(!showWindSpeed)}
          className={showWindSpeed ? "active" : ""}
        >
          {showWindSpeed ? <>Hide<br/> Wind Speed</> :  <>Show<br/>Wind Speed</>}
        </button>
        <button
          onClick={() => setShowPrecipitation(!showPrecipitation)}
          className={showPrecipitation ? "active" : ""}
        >
          {showPrecipitation ? <>Hide<br/> Precipitation</> : <>Show<br/> Precipitation</>}
        </button>
        <button
          onClick={() => setShowVisibility(!showVisibility)}
          className={showVisibility ? "active" : ""}
        >
          {showVisibility ? <>Hide<br/> Visibility</> : <>Show<br/> Visibility</>}
        </button>
        <button
          onClick={() => setShowGust(!showGust)}
          className={showGust ? "active" : ""}
        >
          {showGust ? <>Hide<br/> Gust</> : <>Show<br/> Gust</>}
        </button>
      </div>
    </>
  );
};

export default LineGraph;
