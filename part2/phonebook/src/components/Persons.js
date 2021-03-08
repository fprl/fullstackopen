import React from 'react';
import Person from './Person';

const Persons = ({ persons, setNewRequest, handleNotification }) => {
  
  return(
    <ul>
    {persons.map((person) => <Person key={person.id} person={person} setNewRequest={setNewRequest} handleNotification={handleNotification} />)}
  </ul>
  )
};

export default Persons;
