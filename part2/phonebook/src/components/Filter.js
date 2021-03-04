import React from 'react';

const Filter = ({ handleSearchChange }) => {
  return (
    <div>
      filter shown with <input onChange={handleSearchChange}></input>
    </div>
  );
};

export default Filter;
