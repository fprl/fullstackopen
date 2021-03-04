import React from 'react';

const Search = ({ handleSearchChange }) => {
  return (
    <div>
      find countries <input onChange={handleSearchChange}></input>
    </div>
  );
};

export default Search;
