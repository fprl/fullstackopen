import React from 'react';
import Country from './Country';

const Countries = ({ countries, handleClick }) => {
  if (countries.length === 0 || countries.length > 10) {
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
        <Country key={countries[0].numericCode} country={countries[0]} />
      </div>
    );
  }
};

export default Countries;
