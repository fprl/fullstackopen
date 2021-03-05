import React from 'react';

const Filter = ({ setShowAll }) => {
  const handleSearchChange = e => setShowAll(e.target.value);

  return (
    <div>
      filter shown with <input onChange={handleSearchChange}></input>
    </div>
  );
};

export default Filter;
