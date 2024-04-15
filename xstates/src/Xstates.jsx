import React, { useEffect, useState } from 'react';

 
const Xstates = () => {

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    fetch('https://crio-location-selector.onrender.com/countries')
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error('Error fetching countries:', error));
  }, []);

  const handleCountrySelection = (country) => {
    setSelectedCountry(country);
    fetch(`https://crio-location-selector.onrender.com/country=${country}/states`)
      .then((response) => response.json())
      .then((data) => setStates(data))
      .catch((error) => console.error('Error fetching states:', error));
  };

  const handleStateSelection = (state) => {
    setSelectedState(state);
    fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${state}/cities`)
      .then((response) => response.json())
      .then((data) => setCities(data))
      .catch((error) => console.error('Error fetching cities:', error));
  };

  const handleCitySelection = (city) => {
    setSelectedCity(city);
  };

  return (
    <div>
       <h1>Select Location</h1>
      <select onChange={(e) => handleCountrySelection(e.target.value)}>
        <option>Select a country</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

    
      <select  onChange={(e) => handleStateSelection(e.target.value)}>
        <option>Select a state</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      
      <select onChange={(e) => handleCitySelection(e.target.value)}>
        <option >Select a city</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      {selectedCity && (
        <p>You Selected {selectedCity}, {selectedState}, {selectedCountry}</p>
      )}
    </div>
  );
};

export default Xstates;