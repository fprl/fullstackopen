import React from 'react';

const Total = ({ parts }) => {
  let total = parts.reduce(
    (acummulator, part) => acummulator + part.exercises,
    0
  );

  return (
    <p>
      <strong>Number of exercises {total}</strong>
    </p>
  );
};

export default Total;
