import React from 'react';

const Search = ({ handleChange }) => {
  return (
    <div>
      find countries <input onChange={handleChange}></input>
    </div>
  );
};

export default Search;
