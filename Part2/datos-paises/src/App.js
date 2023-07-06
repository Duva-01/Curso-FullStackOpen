import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Countries from './components/Countries'

const api_key = process.env.REACT_APP_API_KEY;

const App = () => {
  
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    
    if (search === '') {
      setCountries([]);
      return;
    }

    axios
      .get('https://restcountries.com/v3.1/name/' + search)
      .then((res) => setCountries(res.data))
      .catch((error) => {
        console.log(error);
        setCountries([]);
      });
  }, [search]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleShowCountry = (country) => {
    setSearch(country.name.common);
  };

  return (
    <div>
      <h1>Country Finder</h1>
      <form>
        <div>
          Search for a country: <input value={search} onChange={handleSearchChange} />
        </div>
      </form>
      <Countries countries={countries} handleShowCountry={handleShowCountry} />
    </div>
  );
};

export default App;
