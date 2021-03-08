import React from 'react';
import phonesService from '../services/phones';

const Person = ({ person, setNewRequest, handleNotification }) => {
  const handleClickDelete = (id) => {
    const result = window.confirm(`Delete ${person.name}?`);
    if (result) {
      phonesService
        .deletePerson(id)
      setNewRequest(new Date());
      handleNotification('remove', person.name);
    }
  }

  return (
    <li>
      {person.name} {person.number}{' '}
      <button onClick={() => handleClickDelete(person.id)}>delete {person.id}</button>
    </li>
  );
};

export default Person;
