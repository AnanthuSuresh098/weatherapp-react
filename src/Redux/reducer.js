import {
  LOCATION_REQ,
  LOCATION_SUCCESS,
  LOCATION_FAILURE,
  GET_WEATHER_REQ,
  GET_WEATHER_SUCCESS,
  GET_WEATHER_FAILURE
} from "./actionTypes";

const initState = {
  location: null,
  weather: null,
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

    //GET WEATHER

    case GET_WEATHER_REQ:
      return {
        ...state,
        isLoading: true,
      };
    case GET_WEATHER_SUCCESS:
      return {
        ...state,
        weather: action.payload,
        isLoading: false,
      };
    case GET_WEATHER_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    default:
      return state;
  }
};
