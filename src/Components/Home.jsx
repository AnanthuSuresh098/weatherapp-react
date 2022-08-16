import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { locationData, cityWeatherData , dailyWeatherData} from "../Redux/actions";
import axios from "axios";
import { Weather } from "./Weather";
import "./Weather.css";
import ReactApexChart from "react-apexcharts";
import { ImLocation } from "react-icons/im";
import { AiOutlineSearch } from "react-icons/ai";

export const Home = () => {
  const dispatch = useDispatch();

  const { location, cityWeather,dailyWeather, isError, isLoading } = useSelector(
    (state) => ({
      location: state.location,
      cityWeather: state.cityWeather,
      dailyWeather: state.dailyWeather,
      isError: state.isError,
      isLoading: state.isLoading,
    })
  );

  const [city, setCity] = useState(null);

  useEffect(() => {
    dispatch(locationData());
    dispatch(cityWeatherData(city));
  }, [dispatch,city]);

  const handleInput = (e) => {
    setCity(e.target.value)
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
    <>
      {isLoading && (
        <img
          src="https://miro.medium.com/max/1400/1*CsJ05WEGfunYMLGfsT2sXA.gif"
          id="loading_gif"
        />
      )}
      <div id="search_box">
        <ImLocation id="search_box_location_icon" />
        <input type="text" id="search_input" onChange={handleInput} placeholder="Search Location here"/>
        <AiOutlineSearch id="search_box_search_icon" />
      </div>
      {cityWeather != null &&(
          <>
            {dailyWeather != null && (
              <div id="daily_weather_main_wrap">
                {dailyWeather.daily.map((e) => {
                  return (
                    <div id="daily_weather_sections">
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
            )}
            <div id="weather_second_wrap">
              <div id="current_weather_wrap">
                <div>{Math.round(cityWeather.main.temp - 273.15)}°C</div>
                <img
                  className="weather_logo_current"
                  src="./cloudy.png"
                  alt=""
                />
              </div>
              <ReactApexChart
                options={options}
                series={options.series}
                type="area"
              />
              <div id="pressure_humidity_wrap">
                <div id="pressure_wrap">
                  <div>Pressure</div>
                  <div>{cityWeather.main.pressure} hpa</div>
                </div>
                <div id="humidity_wrap">
                  <div>Humidity</div>
                  <div>{cityWeather.main.humidity} %</div>
                </div>
              </div>

              <div id="sunrise_sunset_wrap">
                <div id="sunrise_wrap">
                  <div>Sunrise</div>
                  <div>
                    {new Date(cityWeather.sys.sunrise).toLocaleTimeString()}
                  </div>
                </div>
                <div id="sunset_wrap">
                  <div>Sunset</div>
                  <div>
                    {new Date(cityWeather.sys.sunset).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      {cityWeather == null && <Weather />}
    </>
  );
};
