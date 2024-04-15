import React, { useEffect, useState } from 'react';

 
const Xstates = () => {
    const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    fetch('https://crio-location-selector.onrender.com/countries')
      .then(response => response.json())
      .then(data => setCountries(data));
  }, []);

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    fetch(`https://crio-location-selector.onrender.com/country=${country}/states`)
      .then(response => response.json())
      .then(data => setStates(data));
  };

  const handleStateChange = (state) => {
    setSelectedState(state);
    fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${state}/cities`)
      .then(response => response.json())
      .then(data => setCities(data));
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
  };

  return (
    <div>
         <h1>Select Location</h1>   
      <select onChange={(e) => handleCountryChange(e.target.value)}>
        <option value="">Select Country</option>
        {countries.map(country => (
          <option key={country} value={country}>{country}</option>
        ))}
      </select>

      <select onChange={(e) => handleStateChange(e.target.value)} disabled={!selectedCountry}>
        <option value="">Select State</option>
        {states.map(state => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>

      <select onChange={(e) => handleCityChange(e.target.value)} disabled={!selectedState}>
        <option value="">Select City</option>
        {cities.map(city => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
      {selectedCity && <p>You selected {selectedCity}, {selectedState}, {selectedCountry}</p>}

    </div>
  );
};

export default Xstates;