import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { locationData, weatherData } from "../Redux/actions";
import axios from "axios";



export const Home = () => {
    const dispatch = useDispatch();

    const { location, weather, isError, isLoading } = useSelector((state) => ({
      location: state.location,
      weather: state.weather,
      isError: state.isError,
      isLoading: state.isLoading,
    }));

    useEffect(() => {

      dispatch(locationData());

      
      dispatch(weatherData(location));
      

    }, [dispatch]);




  return (
    <>
      <input type="text" id="search_input" />
      {weather && <h1>{weather.timezone}</h1>}
    </>
  );
};
