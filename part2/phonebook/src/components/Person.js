import React from 'react';
import phonesService from '../services/phones';

const Person = ({ person, setDelRequest }) => {
  const handleClickDelete = (id) => {
    phonesService
      .deletePerson(id)
    setDelRequest(new Date());
  }

  return (
    <li>
      {person.name} {person.number}{' '}
      <button onClick={() => handleClickDelete(person.id)}>delete {person.id}</button>
    </li>
  );
};

export default Person;
