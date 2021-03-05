import React from 'react';
import Person from './Person';

const Persons = ({ persons, setDelRequest }) => {
  
  return(
    <ul>
    {persons.map((person) => <Person key={person.id} person={person} setDelRequest={setDelRequest}/>)}
  </ul>
  )
};

export default Persons;
