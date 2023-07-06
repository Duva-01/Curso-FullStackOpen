import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (country.capital) {
      axios
        .get(`https://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
        .then((response) => {
          const weatherData = response.data;
          setWeather(weatherData);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [country]);

  if (!weather) {
    return null;
  }

  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.name} style={{ height: '100px' }} />
      <h3>Weather in {country.capital}</h3>
      <p>Temperature: {weather.current.temperature}°C</p>
      <p>Weather: {weather.current.weather_descriptions[0]}</p>
      <img src={weather.current.weather_icons[0]} alt={weather.current.weather_descriptions[0]} />
    </div>
  );
};

const Countries = ({ countries, handleShowCountry }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length === 1) {
    const country = countries[0];
    return <Country country={country} />;
  } else {
    return (
      <ul>
        {countries.map((country) => (
          <li key={country.cca3}>
            {country.name.common} <button onClick={() => handleShowCountry(country)}>Show</button>
          </li>
        ))}
      </ul>
    );
  }
};

export default Countries;
