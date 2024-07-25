import React from 'react';
import Select from 'react-select';

const CitySelector = ({ onChange }) => {
  const cities = [
    { value: 'London', label: 'London' },
    { value: 'New York', label: 'New York' },
    // Add more cities here
  ];

  return (
    <Select
      options={cities}
      onChange={onChange}
      placeholder="Select a city"
    />
  );
};

export default CitySelector;