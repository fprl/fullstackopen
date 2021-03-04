import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Country = ({ country }) => {
  const [weather, setWeather] = useState([]);

  const weatherHook = () => {
    const params = {
      "access_key": process.env.REACT_APP_WEATHER_API,
      "query": country.name
    }

    axios
    .get('http://api.weatherstack.com/current', {params})
    .then(response => setWeather(response.data.current))
  }
  useEffect(weatherHook, [country.name])
  console.log(weather);

  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>

      <h3>languages</h3>
      <ul>
        {country.languages.map(lang => <li key={lang.iso639_1}>{lang.name}</li>)}
      </ul>

      <img src={country.flag} alt="country flag" width="300" height="200"></img>

      <h3>Weather in {country.name}</h3>
      <p><strong>temperature:</strong> {weather.temperature} Celcius</p>
      <img src={weather.weather_icons} alt={weather.weather_descriptions}></img>
      <p><strong>wind:</strong> {weather.wind_speed} mph direction {weather.wind_dir}</p>
    </div>
  )
}

export default Country;
