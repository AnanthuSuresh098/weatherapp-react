import {
  LOCATION_REQ,
  LOCATION_SUCCESS,
  LOCATION_FAILURE,
  GET_WEATHER_REQ,
  GET_WEATHER_SUCCESS,
  GET_WEATHER_FAILURE
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
    .get("http://ip-api.com/json/")
    .then((res) => dispatch(locationSuccess(res.data)))
    .catch(() => dispatch(locationFailure()));
};




// action for weather request

const weatherReq = () => ({
  type: GET_WEATHER_REQ,
});

// action for weather success

const weatherSuccess = (payload) => ({
  type: GET_WEATHER_SUCCESS,
  payload,
});

// action for weather failure

const weatherFailure = () => ({
  type: GET_WEATHER_FAILURE,
});

// thunk call to fetch weather data

let api = `https://api.openweathermap.org/data/2.5/onecall?`;
let key = "e50e3c298517b27b88cd7406ffce185c";

export const weatherData = (location) => (dispatch) => {

  // let weather_api = `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&units=metric&exclude=minutely&appid=e50e3c298517b27b88cd7406ffce185c`;

  dispatch(weatherReq());
   location && axios
    .get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&units=metric&exclude=minutely&appid=f44a5606d80565dffdb744ec132df9ed`
    )
    .then((res) => dispatch(weatherSuccess(res.data)))
    .catch(() => dispatch(weatherFailure()));
};