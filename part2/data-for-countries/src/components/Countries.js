import React from 'react';
import Country from './Country';

const Countries = ({countries}) => {
  if (!countries || countries.length > 10) {
    return <p>To many matches, be more specific.</p>
  } else if (countries.length > 1) {
    return (
      <div>
        {countries.map(country => <p key={country.numericCode}>{country.name}</p>)}
      </div>
    )
  } else {
    return (
      <div>
      {countries.map(country => <Country key={country.numericCode} country={country}/>)}
      </div>
    )
  }
}

export default Countries;
