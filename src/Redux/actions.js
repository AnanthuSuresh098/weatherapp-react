import {
  LOCATION_REQ,
  LOCATION_SUCCESS,
  LOCATION_FAILURE,
  GET_CITY_WEATHER_REQ,
  GET_CITY_WEATHER_SUCCESS,
  GET_CITY_WEATHER_FAILURE,
  GET_DAILY_WEATHER_REQ,
  GET_DAILY_WEATHER_SUCCESS,
  GET_DAILY_WEATHER_FAILURE,
} from "./actionTypes";

import axios from "axios";

// action for Location request

const locationReq = () => ({
  type: LOCATION_REQ,
});

// action for Location success

const locationSuccess = (payload) => ({
  type: LOCATION_SUCCESS,
  payload,
});

// action for Location failure

const locationFailure = () => ({
  type: LOCATION_FAILURE,
});

// thunk call to fetch Location

export const locationData = () => (dispatch) => {
  dispatch(locationReq());
  axios
    .get("https://cors-everywhere.herokuapp.com/http://ip-api.com/json/")
    .then((res) => dispatch(locationSuccess(res.data)))
    .catch(() => dispatch(locationFailure()));
};




// action for weather request

export const cityWeatherReq = () => ({
  type: GET_CITY_WEATHER_REQ,
});

// action for weather success

export const cityWeatherSuccess = (payload) => ({
  type: GET_CITY_WEATHER_SUCCESS,
  payload,
});

// action for weather failure

export const cityWeatherFailure = () => ({
  type: GET_CITY_WEATHER_FAILURE,
});

// // thunk call to fetch weather data

export const cityWeatherData = (city) => (dispatch) => {
  
dispatch(cityWeatherReq());
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=67e5a32ee2315013b8ee6d8883489691`
      )
      .then(
        (res) =>
          dispatch(cityWeatherSuccess(res.data)) &&
          dispatch(dailyWeatherData(res.data.coord.lat, res.data.coord.lon))
      )
      .catch(() => dispatch(cityWeatherFailure()));
};


// action for daily weather request

export const dailyWeatherReq = () => ({
  type: GET_DAILY_WEATHER_REQ,
});

// action for daily weather success

export const dailyWeatherSuccess = (payload) => ({
  type: GET_DAILY_WEATHER_SUCCESS,
  payload,
});

// action for daily weather failure

export const dailyWeatherFailure = () => ({
  type: GET_DAILY_WEATHER_FAILURE,
});

// // thunk call to fetch daily weather data

export const dailyWeatherData = (lat,lon) => (dispatch) => {
  
dispatch(dailyWeatherReq());
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,hourly,minutely,alerts&units=metric&appid=67e5a32ee2315013b8ee6d8883489691`
      )
      .then((res) => dispatch(dailyWeatherSuccess(res.data)))
      .catch(() => dispatch(dailyWeatherFailure()));
};