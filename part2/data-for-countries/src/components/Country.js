import React from 'react';

const Country = ({country}) => {
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
    </div>
  )
}

export default Country;
