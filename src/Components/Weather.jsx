import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./Weather.css"
import ReactApexChart from "react-apexcharts";


export const Weather = () => {
  const dispatch = useDispatch();

  const { location, isError, isLoading } = useSelector((state) => ({
    location: state.location,
    isError: state.isError,
    isLoading: state.isLoading,
  }));

  const [weather, setWeather] = useState(null);

  console.log(location);

  useEffect(() => {
    location &&
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&units=metric&exclude=minutely&appid=f44a5606d80565dffdb744ec132df9ed`
        )
        .then((res) => setWeather(res.data))
        .catch((err) => console.log(err));
  }, [location]);

  console.log(weather);

  const handleFocus= (e) =>{
     e.target.style.border= "1px solid green";
    // alert(e)
  }

const handleBlur = (e) => {
    e.target.style.border = "none";
};

var options = {
  chart: {
    height: 280,
    type: "area",
  },
  dataLabels: {
    enabled: false,
  },
  series: [
    {
      name: "Temperature",
      data: [45, 52, 38, 45, 19, 23, 2],
    },
  ],
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 0.8,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      stops: [0, 90, 100],
    },
  },
  xaxis: {
    categories: [1, 2, 3, 4, 5, 6, 7, 8],
  },

};




  return (
    weather && (
      <>
        <div id="daily_weather_main_wrap">
          {weather.daily.map((e) => {
            return (
              <div
                id="daily_weather_sections"
                onFocus={(e) => handleFocus(e)}
                onBlur={(e) => handleBlur(e)}
              >
                <div>
                  {new Date(e.dt * 1000).toLocaleDateString("en", {
                    weekday: "short",
                  })}
                </div>
                <div id="daily_weather_temp_wrap">
                  <div>{Math.round(e.temp.min)} °</div>
                  <div>{Math.round(e.temp.max)} °</div>
                </div>
                <div>
                  <img
                    className="weather_logo"
                    src={`http://openweathermap.org/img/wn/${e.weather[0].icon}.png`}
                    alt=""
                  />
                </div>
                <div>{e.weather[0].main}</div>
              </div>
            );
          })}
        </div>
        <div id="weather_second_wrap">
          <div id="current_weather_wrap">
            <div>{Math.round(weather.current.temp)}°C</div>
            <img className="weather_logo_current" src="./cloudy.png" alt="" />
          </div>
          <ReactApexChart
            options={options}
            series={options.series}
            type="area"
          />
          <div id="pressure_humidity_wrap">
            <div id="pressure_wrap">
              <div>Pressure</div>
              <div>{weather.current.pressure} hpa</div>
            </div>
            <div id="humidity_wrap">
              <div>Humidity</div>
              <div>{weather.current.humidity} %</div>
            </div>
          </div>

          <div id="sunrise_sunset_wrap">
            <div id="sunrise_wrap">
              <div>Sunrise</div>
              <div>
                {new Date(weather.current.sunrise).toLocaleTimeString()}
              </div>
            </div>
            <div id="sunset_wrap">
              <div>Sunset</div>
              <div>{new Date(weather.current.sunset).toLocaleTimeString()}</div>
            </div>
          </div>
        </div>
      </>
    )
  );
};
