import React, { useState } from 'react';
import Country from './Country';

const Countries = ({ countries, handleClick }) => {

  if (!countries || countries.length > 10) {
    return <p>To many matches, be more specific.</p>;
  } else if (countries.length > 1) {
    return (
      <div>
        {countries.map((country) => (
          <p key={country.numericCode}>{country.name} <button onClick={() => handleClick(country.name)}>show</button></p>
        ))}
      </div>
    );
  } else {
    return (
      <div>
        {countries.map((country) => (
          <Country key={country.numericCode} country={country} />
        ))}
      </div>
    );
  }
};

export default Countries;
