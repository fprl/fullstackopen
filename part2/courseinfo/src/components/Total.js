import React from 'react';

const Total = ({ parts }) => {
  let exerciseSum = parts.reduce(
    (acummulator, part) => acummulator + part.exercises,
    0
  );

  return (
    <p>
      <strong>Number of exercises {exerciseSum}</strong>
    </p>
  );
};

export default Total;
