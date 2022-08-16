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

const initState = {
  location: null,
  cityWeather:null,
  dailyWeather:null,
  isLoading: false,
  isError: false,
};

export const reducer = (state = initState, action) => {
  console.log(state, action);

  switch (action.type) {
    case LOCATION_REQ:
      return {
        ...state,
        isLoading: true,
      };
    case LOCATION_SUCCESS:
      return {
        ...state,
        location: action.payload,
        isLoading: false,
      };
    case LOCATION_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    // GET CITY WEATHER

    case GET_CITY_WEATHER_REQ:
      return {
        ...state,
        isLoading: true,
      };
    case GET_CITY_WEATHER_SUCCESS:
      return {
        ...state,
        cityWeather: action.payload,
        isLoading: false,
      };
    case GET_CITY_WEATHER_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    // GET DAILY WEATHER

    case GET_DAILY_WEATHER_REQ:
      return {
        ...state,
        isLoading: true,
      };
    case GET_DAILY_WEATHER_SUCCESS:
      return {
        ...state,
        dailyWeather: action.payload,
        isLoading: false,
      };
    case GET_DAILY_WEATHER_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };


    default:
      return state;
  }
};
