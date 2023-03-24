import React, { useState } from 'react';
import { FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';

const SearchForm = ({ onSearch }) => {
  const [country, setCountry] = useState('');
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState('');

  const handleCountryChange = async (event) => {
    const { value } = event.target;
    setCountry(value);
    if (value) {
      try {
        const response = await axios.get(`https://countriesnow.space/api/v0.1/countries/cities`, {
          params: {
            country: value,
            page: 1,
            limit: 50
          }
        });
        setCities(response.data.data);
      } catch (error) {
        console.error(error);
      }
    } else {
      setCities([]);
      setCity('');
    }
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(city);
  };

  return (
    <div className="search-form">
      <FormGroup>
        <Label for="country">Country</Label>
        <Input type="text" name="country" id="country" value={country} onChange={handleCountryChange} />
      </FormGroup>
      <FormGroup>
        <Label for="city">City</Label>
        <Input type="select" name="city" id="city" value={city} onChange={handleCityChange}>
          <option value="">Select a city</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </Input>
      </FormGroup>
      <Button color="primary" onClick={handleSubmit}>
        Search
      </Button>
    </div>
  );
};

export default SearchForm;
