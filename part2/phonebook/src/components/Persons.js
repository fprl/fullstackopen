import React from 'react';
import Person from './Person';

const Persons = ({ persons, setNewRequest }) => {
  
  return(
    <ul>
    {persons.map((person) => <Person key={person.id} person={person} setNewRequest={setNewRequest}/>)}
  </ul>
  )
};

export default Persons;
